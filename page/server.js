// Samvex backend: sin dependencias, Node 18+. Uso: ML_CLIENT_ID=... ML_CLIENT_SECRET=... node server.js
const http=require('http'),fs=require('fs'),path=require('path');
const {ML_CLIENT_ID:ID,ML_CLIENT_SECRET:SEC,PORT=3000,ALLOWED_ORIGIN='*',GEMINI_API_KEY=process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || ''}=process.env;
const TTL=6*3600e3,cache=new Map(),hits=new Map();let tok=null;

async function callGemini(prompt){
  if(!GEMINI_API_KEY) throw new Error('Falta GEMINI_API_KEY en el servidor.');
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: `Eres un experto en hardware, gaming y PC Builder. Responde en español, breve, claro y útil. Debes ser preciso y realista con presupuestos colombianos. Pregunta del usuario: ${prompt}` }]
      }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 400 }
    })
  });
  if(!response.ok){
    const err = await response.json().catch(()=>({}));
    throw new Error(err.error?.message || `Error Gemini ${response.status}`);
  }
  const json = await response.json();
  const text = json.candidates?.[0]?.content?.parts?.map(part => part.text).join('\n')?.trim();
  return text || 'No pude generar la respuesta con Gemini en este momento.';
}
async function token(){
 if(tok&&tok.exp>Date.now())return tok.v;
 if(!ID||!SEC)return null;
 const r=await fetch('https://api.mercadolibre.com/oauth/token',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded',accept:'application/json'},body:new URLSearchParams({grant_type:'client_credentials',client_id:ID,client_secret:SEC})});
 if(!r.ok)throw new Error('Autenticación ML '+r.status);
 const j=await r.json();tok={v:j.access_token,exp:Date.now()+(j.expires_in-60)*1e3};return tok.v;
}
async function ml(q,limit){
 const key=q+'|'+limit,c=cache.get(key);if(c&&c.t>Date.now())return c.v;
 const t=await token(),r=await fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${encodeURIComponent(q)}&limit=${limit}`,{headers:t?{authorization:'Bearer '+t}:{}});
 if(!r.ok)throw new Error('Mercado Libre respondió '+r.status);
 const v=((await r.json()).results||[]).filter(x=>x.currency_id==='COP'&&/^https:\/\//.test(x.permalink)).map(x=>({id:x.id,title:x.title,price:x.price,condition:x.condition,permalink:x.permalink}));
 if(cache.size>500)cache.clear();cache.set(key,{t:Date.now()+TTL,v});return v;
}
const med=a=>a.slice().sort((x,y)=>x-y)[a.length>>1];
const send=(res,code,o)=>{res.writeHead(code,{'content-type':'application/json','access-control-allow-origin':ALLOWED_ORIGIN});res.end(JSON.stringify(o))};
const MIME={'.html':'text/html;charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
 const u=new URL(req.url,'http://x');
 if(u.pathname.startsWith('/api/')){
  const k=req.socket.remoteAddress+Math.floor(Date.now()/6e4);hits.set(k,(hits.get(k)||0)+1);if(hits.size>5e3)hits.clear();
  if(hits.get(k)>120)return send(res,429,{error:'Demasiadas solicitudes'});

  if(u.pathname==='/api/chat'){
   let body='';
   req.on('data',chunk=>body+=chunk);
   req.on('end',async()=>{
    try{
     const data = body ? JSON.parse(body) : {};
     const prompt = String((u.searchParams.get('prompt') || data.prompt || '')).trim();
     if(!prompt) return send(res,400,{error:'Falta el parámetro prompt'});
     const answer = await callGemini(prompt).catch(()=> 'No pude conectar con Gemini. Verifica la clave GEMINI_API_KEY o usa el modo local del chat.');
     return send(res,200,{answer});
    }catch(error){
     return send(res,400,{error:error.message || 'Petición inválida'});
    }
   });
   return;
  }

  const q=(u.searchParams.get('q')||'').slice(0,80).trim();if(!q)return send(res,400,{error:'Falta el parámetro q'});
  try{
   if(u.pathname==='/api/search')return send(res,200,{results:await ml(q,Math.min(+u.searchParams.get('limit')||20,50)),updated:new Date()});
   if(u.pathname==='/api/price'){const ref=+u.searchParams.get('ref')||0,l=(await ml(q,20)).filter(x=>x.condition==='new'&&(!ref||x.price>ref*.5&&x.price<ref*2));
    return send(res,200,{price:l.length?Math.round(med(l.map(x=>x.price))/1000)*1000:null,count:l.length});}
   return send(res,404,{error:'Ruta no encontrada'});
  }catch(e){return send(res,502,{error:e.message})}
 }
 if(!/^\/(index\.html|style\.css|script\.js|assets\/[\w.-]+)?$/.test(u.pathname)){res.writeHead(404);return res.end('No encontrado')}
 fs.readFile(path.join(__dirname,u.pathname==='/'?'index.html':u.pathname),(e,d)=>{if(e){res.writeHead(404);return res.end('No encontrado')}res.writeHead(200,{'content-type':MIME[path.extname(u.pathname)]||'text/html;charset=utf-8'});res.end(d)});
}).listen(PORT,()=>console.log('Samvex en http://localhost:'+PORT+(ID?'':'  (sin ML_CLIENT_ID: modo público, puede ser limitado)')));
