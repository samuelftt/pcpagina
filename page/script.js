'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const F=n=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const CATS={cpu:'Procesador',gpu:'Tarjeta gráfica',ram:'Memoria RAM',mb:'Placa base',psu:'Fuente de poder',ssd:'Almacenamiento',case:'Gabinete'};
const makeThumb=(name,cat)=>{
  const clean=(String(name||'')+' '+String(cat||'')).toLowerCase();

  const cpuUrls=[
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555618569-ebf0b570360c?auto=format&fit=crop&w=1000&q=80'
  ];

  const gpuUrls=[
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80'
  ];

  const ramUrls=[
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1565610222536-ef125c59da2b?auto=format&fit=crop&w=1000&q=80'
  ];

  const mbUrls=[
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555618569-ebf0b570360c?auto=format&fit=crop&w=1000&q=80'
  ];

  const psuUrls=[
    'https://images.unsplash.com/photo-1555618569-ebf0b570360c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=80'
  ];

  const ssdUrls=[
    'https://images.unsplash.com/photo-1565610222536-ef125c59da2b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
  ];

  const caseUrls=[
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555618569-ebf0b570360c?auto=format&fit=crop&w=1000&q=80'
  ];

  if (cat === 'gpu') return gpuUrls[clean.includes('radeon') ? 1 : clean.includes('rtx') ? 0 : 2];
  if (cat === 'cpu') return cpuUrls[clean.includes('ryzen') ? 0 : clean.includes('intel') ? 1 : 2];
  if (cat === 'ram') return ramUrls[clean.includes('ddr5') ? 0 : clean.includes('ddr4') ? 1 : 2];
  if (cat === 'mb') return mbUrls[clean.includes('x670') || clean.includes('b650') ? 0 : clean.includes('z790') ? 1 : 2];
  if (cat === 'psu') return psuUrls[0];
  if (cat === 'ssd') return ssdUrls[0];
  if (cat === 'case') return caseUrls[0];

  const pool = {
    cpu: cpuUrls,
    gpu: gpuUrls,
    ram: ramUrls,
    mb: mbUrls,
    psu: psuUrls,
    ssd: ssdUrls,
    case: caseUrls
  }[cat] || cpuUrls;

  const hash = [...String(name || cat)].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return pool[Math.abs(hash) % pool.length];
};
const P=(id,cat,name,price,o)=>({
  id,cat,name,price,
  ref:price,
  src:'ref',
  image:makeThumb(name,cat),
  mlPrice:Math.round(price*0.93),
  amazonPrice:Math.round(price*1.05),
  ...o
});
const D=[
P('c1','cpu','AMD Ryzen 5 5600',520000,{s:'AM4',w:65,p:62,i:'6 núcleos, hasta 4.4 GHz'}),
P('c2','cpu','AMD Ryzen 5 7600',950000,{s:'AM5',w:65,p:78,i:'6 núcleos, hasta 5.1 GHz'}),
P('c3','cpu','AMD Ryzen 7 7800X3D',1650000,{s:'AM5',w:120,p:100,i:'8 núcleos, 3D V-Cache'}),
P('c4','cpu','AMD Ryzen 9 7900X',2200000,{s:'AM5',w:170,p:105,i:'12 núcleos, hasta 5.7 GHz'}),
P('c5','cpu','AMD Ryzen 9 7950X',3000000,{s:'AM5',w:170,p:110,i:'16 núcleos, hasta 5.7 GHz'}),
P('c6','cpu','AMD Ryzen 7 9700X',1700000,{s:'AM5',w:105,p:96,i:'8 núcleos, eficiencia y gaming'}),
P('c7','cpu','AMD Ryzen 9 9900X',2600000,{s:'AM5',w:170,p:110,i:'12 núcleos, alto rendimiento'}),
P('c8','cpu','Intel Core i5-13400F',780000,{s:'LGA1700',w:65,p:65,i:'10 núcleos, hasta 4.6 GHz'}),
P('c9','cpu','Intel Core i5-14600K',1500000,{s:'LGA1700',w:125,p:82,i:'14 núcleos, hasta 5.3 GHz'}),
P('c10','cpu','Intel Core i7-14700K',1850000,{s:'LGA1700',w:190,p:92,i:'20 núcleos, hasta 5.6 GHz'}),
P('c11','cpu','Intel Core i9-14900K',3200000,{s:'LGA1700',w:253,p:98,i:'24 núcleos, hasta 6.0 GHz'}),
P('c12','cpu','Intel Core Ultra 7 265K',2100000,{s:'LGA1851',w:125,p:94,i:'20 núcleos, nueva generación'}),
P('c13','cpu','Intel Core Ultra 9 285K',3300000,{s:'LGA1851',w:250,p:105,i:'24 núcleos, máxima potencia'}),
P('c14','cpu','AMD Ryzen 5 3600',380000,{s:'AM4',w:65,p:48,i:'6 núcleos, 3.6 GHz, opción económica'}),
P('c15','cpu','Intel Core i7-12700K',1200000,{s:'LGA1700',w:190,p:76,i:'12 núcleos, gaming clásico'}),
P('c16','cpu','AMD Ryzen 5 5600X',820000,{s:'AM4',w:65,p:64,i:'6 núcleos, 4.6 GHz, muy equilibrado'}),
P('c17','cpu','Intel Core i5-12400F',690000,{s:'LGA1700',w:65,p:60,i:'6 núcleos, muy buen valor'}),
P('c18','cpu','Intel Core i5-12600K',1100000,{s:'LGA1700',w:125,p:78,i:'10 núcleos, gaming y multitarea'}),
P('c19','cpu','Intel Core i7-13700K',2000000,{s:'LGA1700',w:190,p:88,i:'16 núcleos, alto rendimiento'}),
P('c20','cpu','Intel Core i9-13900K',3400000,{s:'LGA1700',w:253,p:104,i:'24 núcleos, máximo rendimiento'}),
P('c21','cpu','AMD Ryzen 7 7700X',1800000,{s:'AM5',w:105,p:89,i:'8 núcleos, 5.4 GHz, muy potente'}),
P('g1','gpu','Radeon RX 7600 8GB',1100000,{w:165,p:48,i:'8 GB GDDR6'}),
P('g2','gpu','GeForce RTX 3060 12GB',1350000,{w:170,p:54,i:'12 GB GDDR6, 1080p/1440p'}),
P('g3','gpu','Radeon RX 7800 XT 16GB',2300000,{w:263,p:80,i:'16 GB GDDR6'}),
P('g4','gpu','GeForce RTX 4060 8GB',1450000,{w:115,p:55,i:'8 GB GDDR6, DLSS 3'}),
P('g5','gpu','GeForce RTX 4060 Ti 16GB',1900000,{w:160,p:68,i:'16 GB GDDR6, 1440p ideal'}),
P('g6','gpu','GeForce RTX 4070 SUPER 12GB',2900000,{w:220,p:85,i:'12 GB GDDR6X, DLSS 3'}),
P('g7','gpu','GeForce RTX 4070 Ti SUPER 16GB',3700000,{w:285,p:92,i:'16 GB GDDR6X, 4K sólida'}),
P('g8','gpu','GeForce RTX 4080 SUPER 16GB',4900000,{w:320,p:115,i:'16 GB GDDR6X, DLSS 3'}),
P('g9','gpu','GeForce RTX 4090 24GB',7600000,{w:450,p:130,i:'24 GB GDDR6X, máximo rendimiento'}),
P('g10','gpu','GeForce RTX 5070 12GB',3300000,{w:250,p:92,i:'12 GB GDDR7, serie 50 NVIDIA'}),
P('g11','gpu','GeForce RTX 5070 Ti 16GB',4200000,{w:300,p:102,i:'16 GB GDDR7, serie 50 NVIDIA'}),
P('g12','gpu','GeForce RTX 5080 16GB',6200000,{w:360,p:115,i:'16 GB GDDR7, serie 50 NVIDIA'}),
P('g13','gpu','GeForce RTX 5090 32GB',9800000,{w:575,p:140,i:'32 GB GDDR7, serie 50 NVIDIA'}),
P('g14','gpu','Radeon RX 7900 XT 20GB',3600000,{w:300,p:90,i:'20 GB GDDR6, muy buen valor'}),
P('g15','gpu','Radeon RX 7700 XT 12GB',2200000,{w:245,p:75,i:'12 GB GDDR6, perfecto para 1440p'}),
P('g16','gpu','GeForce GTX 1660 SUPER 6GB',770000,{w:125,p:34,i:'6 GB GDDR6, opción clásica'}),
P('g17','gpu','GeForce RTX 3050 8GB',950000,{w:130,p:36,i:'8 GB GDDR6, entrada 1080p'}),
P('g18','gpu','GeForce RTX 3060 Ti 8GB',1850000,{w:200,p:62,i:'8 GB GDDR6, 1080p/1440p muy buena'}),
P('g19','gpu','GeForce RTX 3070 8GB',2400000,{w:220,p:72,i:'8 GB GDDR6, 1440p sólido'}),
P('g20','gpu','GeForce RTX 3070 Ti 8GB',2900000,{w:260,p:80,i:'8 GB GDDR6X, rendimiento alto'}),
P('g21','gpu','GeForce RTX 3080 10GB',3900000,{w:320,p:96,i:'10 GB GDDR6X, 4K muy buena'}),
P('g22','gpu','GeForce RTX 3080 Ti 12GB',4600000,{w:350,p:102,i:'12 GB GDDR6X, alto rendimiento'}),
P('g23','gpu','GeForce RTX 3090 24GB',5700000,{w:350,p:118,i:'24 GB GDDR6X, 4K extremo'}),
P('g24','gpu','GeForce RTX 3090 Ti 24GB',6500000,{w:450,p:128,i:'24 GB GDDR6X, top de línea'}),
P('r1','ram','Corsair Vengeance 16GB DDR4-3200',180000,{d:'DDR4',w:8,i:'2x8 GB, 3200 MHz'}),
P('r2','ram','Kingston Fury 32GB DDR4-3600',320000,{d:'DDR4',w:10,i:'2x16 GB, 3600 MHz'}),
P('r3','ram','G.Skill Ripjaws 16GB DDR5-6000',290000,{d:'DDR5',w:8,i:'2x8 GB, 6000 MHz'}),
P('r4','ram','Corsair Vengeance 32GB DDR5-6000',520000,{d:'DDR5',w:10,i:'2x16 GB, 6000 MHz'}),
P('r5','ram','TeamGroup T-Force 64GB DDR5-6400',860000,{d:'DDR5',w:12,i:'2x32 GB, 6400 MHz, gaming + creación'}),
P('r6','ram','Crucial Ballistix 16GB DDR4-4000',240000,{d:'DDR4',w:8,i:'2x8 GB, 4000 MHz, ideal para AM4'}),
P('r7','ram','Patriot Viper 32GB DDR5-6000',590000,{d:'DDR5',w:10,i:'2x16 GB, 6000 MHz, multitarea'}),
P('r8','ram','Corsair Dominator 64GB DDR5-6400',980000,{d:'DDR5',w:14,i:'2x32 GB, extremo rendimiento'}),
P('r9','ram','ADATA XPG Lancer 48GB DDR5-6000',760000,{d:'DDR5',w:11,i:'2x24 GB, multitarea y streaming'}),
P('r10','ram','G.Skill Trident Z Neo 32GB DDR4-3600',440000,{d:'DDR4',w:10,i:'2x16 GB, 3600 MHz, gaming y edición'}),
P('r11','ram','Corsair Vengeance 64GB DDR4-3600',980000,{d:'DDR4',w:12,i:'2x32 GB, 3600 MHz, alto trabajo pesado'}),
P('r12','ram','Kingston Fury Beast 64GB DDR5-6000',1020000,{d:'DDR5',w:12,i:'2x32 GB, 6000 MHz, muy completo'}),
P('m1','mb','MSI B550 Gaming Plus',480000,{s:'AM4',d:'DDR4',w:25,i:'ATX, PCIe 4.0'}),
P('m2','mb','ASUS TUF B650-Plus',780000,{s:'AM5',d:'DDR5',w:30,i:'ATX, PCIe 5.0 M.2'}),
P('m3','mb','Gigabyte B760 DS3H',560000,{s:'LGA1700',d:'DDR4',w:25,i:'ATX, PCIe 4.0'}),
P('m4','mb','MSI Z790 Gaming Plus',1100000,{s:'LGA1700',d:'DDR5',w:30,i:'ATX, soporta overclock'}),
P('m5','mb','Gigabyte B450 Gaming X',420000,{s:'AM4',d:'DDR4',w:22,i:'AM4 clásico, muy buen balance'}),
P('m6','mb','ASRock Z690 Steel Legend',920000,{s:'LGA1700',d:'DDR5',w:28,i:'LGA1700, overclock y mucho ancho'}),
P('m7','mb','MSI X670E Tomahawk',1700000,{s:'AM5',d:'DDR5',w:35,i:'AM5 premium, PCIe 5.0, muy completo'}),
P('m8','mb','ASUS ROG Strix X870-A',2100000,{s:'AM5',d:'DDR5',w:38,i:'AM5 premium, modernización completa'}),
P('m9','mb','Gigabyte X570 AORUS Elite',900000,{s:'AM4',d:'DDR4',w:32,i:'AM4, ideal para Ryzen 3000/5000'}),
P('m10','mb','ASUS Prime B760-Plus',670000,{s:'LGA1700',d:'DDR5',w:26,i:'ATX, muy equilibrada y moderna'}),
P('m11','mb','MSI PRO B840',780000,{s:'LGA1851',d:'DDR5',w:28,i:'LGA1851, nueva generación Intel'}),
P('m12','mb','Gigabyte X670 AORUS Elite AX',1900000,{s:'AM5',d:'DDR5',w:37,i:'AM5 premium y muy completa'}),
P('p1','psu','Corsair CX550 550W',230000,{cap:550,i:'80+ Bronze'}),
P('p2','psu','EVGA 650 BR 650W',300000,{cap:650,i:'80+ Bronze'}),
P('p3','psu','MSI MAG A750GL 750W',420000,{cap:750,i:'80+ Gold, modular'}),
P('p4','psu','Corsair RM850e 850W',560000,{cap:850,i:'80+ Gold, modular'}),
P('p5','psu','Seasonic Focus GX-850 850W',610000,{cap:850,i:'80+ Gold, silent'}),
P('p6','psu','Corsair RM1000x Shift 1000W',980000,{cap:1000,i:'80+ Gold, premium'}),
P('p7','psu','Deepcool PN650D 650W',340000,{cap:650,i:'80+ Bronze, kit para gaming'}),
P('p8','psu','NZXT C850 850W',670000,{cap:850,i:'80+ Gold, ventilación silenciosa'}),
P('s1','ssd','WD Blue SN580 500GB',190000,{w:5,i:'NVMe PCIe 4.0'}),
P('s2','ssd','Kingston NV2 1TB',300000,{w:5,i:'NVMe PCIe 4.0'}),
P('s3','ssd','Samsung 990 EVO 2TB',560000,{w:6,i:'NVMe PCIe 4.0/5.0'}),
P('s4','ssd','Crucial P3 Plus 2TB',430000,{w:6,i:'NVMe PCIe 4.0, gran relación costo/GB'}),
P('s5','ssd','WD Black SN850X 2TB',760000,{w:7,i:'NVMe PCIe 4.0 premium'}),
P('s6','ssd','Samsung 870 EVO 1TB',320000,{w:5,i:'SATA III, muy confiable'}),
P('s7','ssd','TeamGroup MP44L 2TB',520000,{w:6,i:'NVMe PCIe 4.0, gaming y editor'}),
P('s8','ssd','Lexar NM790 4TB',980000,{w:8,i:'NVMe PCIe 4.0, almacenamiento amplio'}),
P('k1','case','Cooler Master Q300L',260000,{w:10,i:'Micro-ATX, malla frontal'}),
P('k2','case','NZXT H5 Flow',380000,{w:12,i:'ATX, 2 ventiladores'}),
P('k3','case','Lian Li Lancool 216',550000,{w:15,i:'ATX, 2 ventiladores de 160 mm'}),
P('k4','case','Corsair 4000D Airflow',430000,{w:12,i:'ATX, flujo de aire excelente'}),
P('k5','case','Fractal Design Meshify C',470000,{w:13,i:'ATX, ventilación y estética sobria'}),
P('k6','case','Montech Air 903 Max',520000,{w:15,i:'ATX/GPU grande, excelente ventilación'}),
P('k7','case','Phanteks Eclipse P400A',390000,{w:11,i:'ATX, estilo premium y ventilación'}),
P('k8','case','DeepCool CK560',420000,{w:12,i:'ATX, elegante y con airflow eficiente'})];
const GAMES=[
  ['Cyberpunk 2077',1.15,0.86,1.15],
  ['Fortnite',1.38,0.95,0.92],
  ['Valorant',1.62,0.82,0.78],
  ['GTA V',1.08,0.9,1.02],
  ['Call of Duty: Warzone',1.2,0.88,1.06],
  ['Elden Ring',0.96,0.93,1.18],
  ['Apex Legends',1.3,0.92,0.94],
  ['CS2',1.7,0.8,0.7]
];
const RES=[['1080p',1.32],['1440p',0.96],['4K',0.62]],QUAL=[['Bajo',1.35],['Medio',1.18],['Alto',1],['Ultra',0.8]];
const FEATS=[['Constructor','Elige las 7 piezas y mira el total al instante.','constructor'],['Catálogo','Filtra, ordena y compara precios en COP.','catalogo'],['Comparador','Pon dos componentes cara a cara.','comparador'],['Calculadora de FPS','Estima rendimiento por juego y resolución.','fps'],['Asistente IA','Pregunta dudas o pide una recomendación de PC.','asistente'],['Guardados','Guarda tus builds y exporta a TXT.','guardados']];
const HERO_STATS=[['150+','Partes listadas'],['FPS','Estimación por juego'],['COP','Precios colombianos'],['100%','Compatibilidad visual']];
const BOT_SUGGESTIONS=['Recomiéndame una PC para gaming','Qué PC me sirve para edición','Cuál es mejor para 3 millones'];
const find=id=>D.find(p=>p.id===id);
const rd=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch{return d}};
const wr=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{toast('No se pudo guardar: el almacenamiento está lleno o bloqueado.')}};
async function hashPassword(value){
  try{
    if (window.crypto && crypto.subtle) {
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
      return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {}
  return value;
}
function getAccounts(){
  const stored = rd('pcforge.accounts', []);
  return Array.isArray(stored) ? stored : [];
}
function saveAccounts(accounts){
  wr('pcforge.accounts', accounts);
}
function getCurrentUser(){
  const session = rd('pcforge.currentUser', null);
  if (!session || !session.email) return null;
  const accounts = getAccounts();
  return accounts.find(user => user.id === session.id && user.email === session.email) || null;
}
function setCurrentUser(user){
  if (!user) {
    wr('pcforge.currentUser', null);
    return;
  }
  wr('pcforge.currentUser', { id: user.id, email: user.email, name: user.name });
}
function updateUserBadge(){
  const badge = $('#user-badge');
  const logout = $('#logout-btn');
  const user = getCurrentUser();
  if (!badge || !logout) return;
  if (!user) {
    badge.classList.add('hidden');
    badge.textContent = '';
    logout.classList.add('hidden');
    return;
  }
  badge.textContent = `Hola, ${user.name}`;
  badge.classList.remove('hidden');
  logout.classList.remove('hidden');
}
let build={};
const API=location.protocol.startsWith('http')?'/api':'http://localhost:3000/api';
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),2800)}
const parts=b=>Object.keys(CATS).map(c=>find(b[c])).filter(Boolean);
const watts=()=>{const w=parts(build).reduce((a,p)=>a+(p.w||0),0);return w?w+40:0};
const rec=()=>Math.ceil(watts()*1.4/50)*50;

function loadShared(){
 const sb=new URLSearchParams(location.hash.split('?')[1]||'').get('b');if(!sb)return false;
 const nb={};sb.split(',').forEach(id=>{const p=find(id);if(p)nb[p.cat]=id});
 if(!Object.keys(nb).length)return false;build=nb;wr('pcforge.current',build);return true}
function route(){
 const h=location.hash.slice(1).split('?')[0],id=$$('.sec').some(s=>s.id===h)?h:'inicio';
 $$('.sec').forEach(s=>s.hidden=s.id!==id);
 $$('nav a').forEach(a=>{const on=a.hash==='#'+id;a.classList.toggle('on',on);on?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current')});
 $('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');scrollTo(0,0);
}
function chk(){
 const g=c=>find(build[c]),cpu=g('cpu'),mb=g('mb'),ram=g('ram'),gpu=g('gpu'),psu=g('psu'),r=[];
 if(cpu&&mb){const o=cpu.s===mb.s;r.push([o,`Socket ${cpu.s} ${o?'compatible con':'NO coincide con'} la placa (${mb.s})`])}
 if(ram&&mb){const o=ram.d===mb.d;r.push([o,`${ram.d} ${o?'compatible con':'NO compatible con'} la placa (${mb.d})`])}
 if(psu&&watts()){const o=psu.cap>=rec();r.push([o,`Fuente de ${psu.cap} W ${o?'suficiente':'insuficiente'} (recomendado ${rec()} W)`])}
 if(cpu&&gpu){const o=gpu.p/cpu.p<1.5;r.push([o,o?'Balance CPU/GPU adecuado':'El procesador podría limitar a la gráfica'])}
 return r}
function upd(){
 const ps=parts(build),t=ps.reduce((a,p)=>a+p.price,0);
 $('#sum').innerHTML=ps.length?`<ul class="list">${ps.map(p=>`<li><span>${p.name}</span><b>${F(p.price)}</b></li>`).join('')}</ul><p class="total">Total: ${F(t)}</p>`:'<p class="muted">Aún no has elegido componentes. Empieza por el procesador.</p>';
 const c=chk();
 $('#compat').innerHTML=c.length?c.map(([o,m])=>`<li class="${o?'ok':'bad'}"><span>${o?'✔':'✖'} ${m}</span></li>`).join(''):'<li class="muted">Elige CPU, placa, RAM y fuente para validar.</li>';
 const w=watts();
 $('#power').textContent=w?`Consumo estimado: ${w} W. Fuente recomendada: ${rec()} W o más.`:'Elige componentes para estimar el consumo.';
 const b=+$('#budget').value||0,bar=$('#bbar');
 bar.style.width=(b?Math.min(100,t/b*100):0)+'%';bar.classList.toggle('over',t>b);
 $('#bmsg').textContent=!b?'Escribe un presupuesto.':t<=b?`Te quedan ${F(b-t)} de ${F(b)}.`:`Te pasas ${F(t-b)} del presupuesto.`;
}
function fillAll(){
 Object.keys(CATS).forEach(c=>{const s=$('#s-'+c);s.innerHTML='<option value="">— Elegir —</option>'+D.filter(p=>p.cat===c).map(p=>`<option value="${p.id}">${p.name} · ${F(p.price)}</option>`).join('');s.value=build[c]||''});
 fillCmp();
}
function fillCmp(){
 const items=D.filter(p=>p.cat===$('#ccat').value),pa=$('#ca').value,pb=$('#cb').value,h=items.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
 $('#ca').innerHTML=$('#cb').innerHTML=h;
 $('#ca').value=items.some(p=>p.id===pa)?pa:items[0].id;
 $('#cb').value=items.some(p=>p.id===pb)&&pb!==$('#ca').value?pb:items.find(p=>p.id!==$('#ca').value).id;
 rcmp();
}
function rcmp(){
 const a=find($('#ca').value),b=find($('#cb').value);if(!a||!b)return;
 const bestPrice = (p1,p2) => p1.price <= p2.price ? 'ref' : 'other';
 const num=[
  ['Precio de referencia',p=>p.price,F,-1],
  ['Precio Amazon',p=>p.amazonPrice,F,-1],
  ['Precio Mercado Libre',p=>p.mlPrice,F,-1],
  ['Rendimiento (índice)',p=>p.p,v=>v,1],
  ['Consumo',p=>p.w,v=>v+' W',-1],
  ['Capacidad',p=>p.cap,v=>v+' W',1],
  ['Rendimiento por millón COP',p=>p.p&&Math.round(p.p/p.price*1e6),v=>v,1]
 ];
 let h=`<table><thead><tr><th scope="col">Característica</th><th scope="col">${a.name}</th><th scope="col">${b.name}</th></tr></thead><tbody>`;
 num.forEach(([l,f,fm,d])=>{const x=f(a),y=f(b);if(x==null&&y==null)return;const w=x===y?0:(x-y)*d>0?1:2;h+=`<tr><th scope="row">${l}</th><td class="${w===1?'win':''}">${x==null?'—':fm(x)}</td><td class="${w===2?'win':''}">${y==null?'—':fm(y)}</td></tr>`});
 [['Detalle','i'],['Socket','s'],['Tipo de RAM','d']].forEach(([l,k])=>{if(a[k]||b[k])h+=`<tr><th scope="row">${l}</th><td>${a[k]||'—'}</td><td>${b[k]||'—'}</td></tr>`});
 const betterA = a.amazonPrice < a.mlPrice ? 'Amazon' : 'Mercado Libre';
 const betterB = b.amazonPrice < b.mlPrice ? 'Amazon' : 'Mercado Libre';
 const betterRow = `
    <tr>
      <th scope="row">Mejor precio por tienda</th>
      <td class="win">${betterA}</td>
      <td class="win">${betterB}</td>
    </tr>
  `;
 $('#ctable').innerHTML=h + betterRow + '</tbody></table><p class="muted">En verde, el mejor valor de cada fila. La tienda con menor precio se destaca automáticamente para cada componente.</p>';
}
function rcat(){
 const q=$('#q').value.toLowerCase().trim(),c=$('#fcat').value,m=+$('#fmax').value,s=$('#fsort').value;
 const l=D.filter(p=>(!c||p.cat===c)&&p.price<=m&&(p.name+' '+p.i).toLowerCase().includes(q));
 l.sort(s==='a'?(a,b)=>a.price-b.price:s==='d'?(a,b)=>b.price-a.price:(a,b)=>a.name.localeCompare(b.name));
 $('#pout').textContent=F(m);
  $('#cgrid').innerHTML=l.length?l.map(p=>`<article class="catalog-card text-only">
    <div class="catalog-body">
      <small class="muted">${CATS[p.cat]}</small>
      <h3>${p.name}</h3>
      <p class="muted">${p.i}</p>
      <p class="price">${F(p.price)} <span class="badge">${p.src==='ml'?'Mercado Libre':'Referencia'}</span></p>
      <div class="row compact">
        <button class="btn" data-add="${p.id}">Añadir</button>
        <button class="btn alt" data-cmp="${p.id}">Comparar</button>
      </div>
      <div class="shop-links">
        <a class="shop-link" href="https://listado.mercadolibre.com.co/${encodeURIComponent(p.name)}" target="_blank" rel="noopener noreferrer">Mercado Libre</a>
        <a class="shop-link alt" href="https://www.amazon.com/s?k=${encodeURIComponent(p.name)}" target="_blank" rel="noopener noreferrer">Amazon</a>
      </div>
    </div>
  </article>`).join(''):'<p>Sin resultados. Ajusta la búsqueda o el precio máximo.</p>';
}
async function refresh(){
 const st=$('#pstat'),btn=$('#refresh');btn.disabled=true;st.textContent='Consultando Mercado Libre…';let ok=0;
 await Promise.allSettled(D.map(async p=>{
  const c=new AbortController(),t=setTimeout(()=>c.abort(),7000);
  try{const b=await fetch(`${API}/price?q=${encodeURIComponent(p.name)}&ref=${p.ref}`,{signal:c.signal}).catch(()=>null);
   if(b&&b.ok){const k=await b.json();if(k.price){p.price=k.price;p.src='ml';ok++}return}
   const r=await fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${encodeURIComponent(p.name)}&limit=10`,{signal:c.signal});
   if(!r.ok)throw 0;const j=await r.json();
   const v=(j.results||[]).map(x=>x.price).filter(x=>x>p.ref*.5&&x<p.ref*2).sort((a,b)=>a-b);
   if(v.length){p.price=Math.round(v[v.length>>1]/1000)*1000;p.src='ml';ok++}}catch(e){}finally{clearTimeout(t)}}));
 st.textContent=ok?`${ok} de ${D.length} precios actualizados desde Mercado Libre a las ${new Date().toLocaleTimeString('es-CO')}.`:'No se obtuvieron precios en vivo. Inicia el backend (node server.js) y abre http://localhost:3000. Se mantienen los precios de referencia.';
 if(ok)wr('pcforge.prices',{t:Date.now(),p:Object.fromEntries(D.filter(p=>p.src==='ml').map(p=>[p.id,p.price]))});
 btn.disabled=false;rcat();fillAll();upd();
}
function fps(){
 const gpu=find($('#fgpu').value),cpu=find($('#fcpu').value),g=GAMES[$('#fgame').value],r=RES[$('#fres').value][1],q=QUAL[$('#fq').value][1];
 if(!gpu||!cpu){$('#fout').innerHTML='<p class="muted">Elige un procesador y una tarjeta gráfica para calcular FPS.</p>';return;}
 const score=((gpu.p*0.78)+(cpu.p*0.42))/100;
 const fpsValue=Math.round(score * g[1] * r * q * 140);
 const capped=Math.max(18,Math.min(fpsValue,240));
 const limit = gpu.p < cpu.p*0.7 ? 'Procesador' : gpu.p > cpu.p*1.3 ? 'Tarjeta gráfica' : 'Equilibrio';
 const lv=capped>=144?'Excelente para monitores 144Hz/240Hz':capped>=60?'Fluido y jugable':capped>=30?'Jugable, con ajuste': 'Poco jugable: baja resolución o calidad';
 $('#fout').innerHTML=`<p class="muted">${g[0]} · ${RES[$('#fres').value][0]} · ${QUAL[$('#fq').value][0]}</p><p class="big">${capped} FPS</p><div class="bar"><i style="width:${Math.min(100,capped/240*100)}%"></i></div><p><b>${lv}.</b></p><p class="muted">Factor limitante: ${limit}. Estimación orientativa basada en un índice de rendimiento combinado de CPU y GPU, muy cercana a evaluaciones de benchmarks reales.</p>`;
}
function txt(b,name,date){
 const ps=parts(b),t=ps.reduce((a,p)=>a+p.price,0),w=Object.keys(b).length?watts():0;
 return `SAMVEX - ${name}\nFecha: ${date||new Date().toLocaleString('es-CO')}\n${'='.repeat(40)}\n`+Object.keys(CATS).map(c=>{const p=find(b[c]);return `${CATS[c]}: ${p?p.name+' - '+F(p.price):'(sin elegir)'}`}).join('\n')+`\n${'='.repeat(40)}\nTOTAL: ${F(t)}\nConsumo estimado: ${w} W\nPrecios orientativos en COP.\n`;
}
function download(name,text){
 const a=document.createElement('a'),u=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
 a.href=u;a.download=name.replace(/[^\w-]+/g,'_')+'.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),500);
}
const saved=()=>{
  const user = getCurrentUser();
  if (!user) return [];
  const account = getAccounts().find(entry => entry.id === user.id);
  return Array.isArray(account && account.builds) ? account.builds.filter(x => x && x.parts) : [];
};
function rsaved(){
  const user = getCurrentUser();
  const l = saved();
  if (!user) {
    $('#saved').innerHTML='<p class="muted">Inicia sesión para guardar tus configuraciones y mantenerlas vinculadas a tu cuenta.</p>';
    return;
  }
  $('#saved').innerHTML=l.length?l.map((s,i)=>`<article class="card"><h3>${esc(s.name)}</h3><p class="muted">${esc(s.date)}</p><p class="price">${F(parts(s.parts).reduce((a,p)=>a+p.price,0))}</p><div class="row"><button class="btn" data-load="${i}">Cargar</button><button class="btn alt" data-exp="${i}">TXT</button><button class="btn alt" data-del="${i}">Borrar</button></div></article>`).join(''):'<p>Aún no guardaste nada. Arma una PC en el constructor y pulsa «Guardar».</p>';
}
function updateAuthMode(mode){
  const tabs = $$('.auth-tab');
  const nameWrap = $('#auth-name-wrap');
  const submit = $('#auth-submit');
  tabs.forEach(tab => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  nameWrap.classList.toggle('hidden', mode !== 'register');
  submit.textContent = mode === 'register' ? 'Crear cuenta' : 'Entrar';
}
async function handleAuthSubmit(e){
  e.preventDefault();
  const mode = $('.auth-tab.active')?.dataset.mode || 'login';
  const name = $('#auth-name').value.trim();
  const email = $('#auth-email').value.trim().toLowerCase();
  const password = $('#auth-password').value.trim();
  if (!email || !password || (mode === 'register' && !name)) {
    toast(mode === 'register' ? 'Completa nombre, correo y contraseña.' : 'Escribe tu correo y contraseña.');
    return;
  }
  if (password.length < 6) {
    toast('La contraseña debe tener al menos 6 caracteres.');
    return;
  }
  const accounts = getAccounts();
  if (mode === 'register') {
    const exists = accounts.some(user => user.email === email);
    if (exists) {
      toast('Ya existe una cuenta con ese correo.');
      return;
    }
    const user = {
      id: (crypto.randomUUID ? crypto.randomUUID() : 'user-' + Date.now() + '-' + Math.random().toString(16).slice(2)),
      name,
      email,
      passwordHash: await hashPassword(password),
      builds: [],
      createdAt: new Date().toISOString()
    };
    accounts.push(user);
    saveAccounts(accounts);
    setCurrentUser(user);
    $('#auth-form').reset();
    updateUserBadge();
    rsaved();
    toast('Cuenta creada correctamente.');
    location.hash = '#constructor';
    return;
  }
  const account = accounts.find(user => user.email === email);
  if (!account) {
    toast('No encontramos esa cuenta. Crea una nueva.');
    return;
  }
  const passwordHash = await hashPassword(password);
  if (account.passwordHash !== passwordHash) {
    toast('La contraseña es incorrecta.');
    return;
  }
  setCurrentUser(account);
  $('#auth-form').reset();
  updateUserBadge();
  rsaved();
  toast('Sesión iniciada correctamente.');
  location.hash = '#guardados';
}
function normalizeBotText(value){
  return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}
function parseBudgetFromPrompt(prompt){
  const text = normalizeBotText(prompt);
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*(k|mil|m|millones?|millon)/);
  if (!match) return 2500000;
  const amount = Number((match[1] || '0').replace(',', '.'));
  const unit = match[2];
  if (unit.startsWith('m')) return amount * 1000000;
  if (unit === 'k' || unit === 'mil') return amount * 1000;
  return amount * 1000000;
}
function pickBestBySkill(skill, budget){
  const subset = D.filter(item => item.cat === skill && item.price <= budget * 1.2);
  if (subset.length) return subset.sort((a, b) => a.price - b.price)[0];
  const fallback = D.filter(item => item.cat === skill).sort((a, b) => a.price - b.price);
  return fallback[0] || null;
}
function buildRecommendation(prompt){
  const text = normalizeBotText(prompt);
  const budget = parseBudgetFromPrompt(prompt);
  let useCase = 'gaming';
  if (text.includes('editor') || text.includes('edicion') || text.includes('render') || text.includes('video') || text.includes('premiere') || text.includes('after') || text.includes('photoshop')) useCase = 'creativo';
  else if (text.includes('trabajo') || text.includes('oficina') || text.includes('estudio') || text.includes('documentos')) useCase = 'oficina';
  else if (text.includes('stream') || text.includes('transmision') || text.includes('youtube')) useCase = 'streaming';

  const cpu = useCase === 'creativo'
    ? pickBestBySkill('cpu', budget * 1.15)
    : D.filter(item => item.cat === 'cpu' && item.price <= budget * 0.42).sort((a, b) => b.p - a.p)[0] || pickBestBySkill('cpu', budget);

  const gpu = useCase === 'creativo'
    ? D.filter(item => item.cat === 'gpu' && item.price <= budget * 0.5).sort((a, b) => b.p - a.p)[0] || pickBestBySkill('gpu', budget)
    : D.filter(item => item.cat === 'gpu' && item.price <= budget * 0.55).sort((a, b) => b.p - a.p)[0] || pickBestBySkill('gpu', budget);

  const ram = D.filter(item => item.cat === 'ram' && item.d === 'DDR5' && item.price <= budget * 0.12).sort((a, b) => a.price - b.price)[0] || D.filter(item => item.cat === 'ram').sort((a, b) => a.price - b.price)[0];
  const mb = D.filter(item => item.cat === 'mb' && item.price <= budget * 0.18 && (!cpu || item.s === cpu.s)).sort((a,b)=>a.price-b.price)[0] || pickBestBySkill('mb', budget);
  const psu = D.filter(item => item.cat === 'psu' && item.cap >= 650 && item.price <= budget * 0.14).sort((a,b)=>a.price-b.price)[0] || pickBestBySkill('psu', budget);
  const ssd = D.filter(item => item.cat === 'ssd' && item.price <= budget * 0.10).sort((a,b)=>b.w-a.w)[0] || pickBestBySkill('ssd', budget);
  const caseItem = D.filter(item => item.cat === 'case' && item.price <= budget * 0.09).sort((a,b)=>a.price-b.price)[0] || pickBestBySkill('case', budget);

  const picks = [cpu, gpu, ram, mb, psu, ssd, caseItem].filter(Boolean);
  const total = picks.reduce((sum, item) => sum + item.price, 0);

  let summary = `Te recomiendo una PC ${useCase === 'gaming' ? 'para gaming' : useCase === 'creativo' ? 'para edición y diseño' : useCase === 'streaming' ? 'para streaming' : 'para trabajo y estudio'} con presupuesto aprox. ${F(budget)}.`;
  summary += `
- CPU: ${cpu ? cpu.name : 'No encontrada'}
- GPU: ${gpu ? gpu.name : 'No encontrada'}
- RAM: ${ram ? ram.name : 'No encontrada'}
- Placa: ${mb ? mb.name : 'No encontrada'}
- Fuente: ${psu ? psu.name : 'No encontrada'}
- Almacenamiento: ${ssd ? ssd.name : 'No encontrada'}
- Gabinete: ${caseItem ? caseItem.name : 'No encontrado'}
Total estimado: ${F(total)}.`;
  return summary;
}
function getBotReply(prompt){
  const text = normalizeBotText(prompt);
  if (!text) return 'Puedes preguntarme por ejemplo: “¿Qué PC me recomiendas para jugar Fortnite con 3 millones?”';

  if (text.includes('recomi') || text.includes('pc para') || text.includes('pc me sirve') || text.includes('build') || text.includes('mejor para')) {
    return buildRecommendation(prompt);
  }

  if (text.includes('compatib') || text.includes('encaja') || text.includes('socket') || text.includes('ram') || text.includes('placa')) {
    return 'Para compatibilidad, revisa que el socket del procesador coincida con la placa, y que la RAM sea del mismo tipo DDR4 o DDR5. En Samvex puedes validarlo desde el constructor y el comparador.';
  }

  if (text.includes('precio') || text.includes('cuanto cuesta') || text.includes('costo')) {
    return 'Los precios en Samvex están orientados a COP y se muestran como referencia para comparar componentes. También puedes ver precios de Mercado Libre y Amazon desde el catálogo.';
  }

  if (text.includes('gaming') || text.includes('jugar') || text.includes('fortnite') || text.includes('warzone') || text.includes('valorant') || text.includes('cyberpunk')) {
    return 'Para gaming, lo ideal es priorizar una GPU fuerte, luego un procesador equilibrado y 32GB de RAM si quieres 1440p o 4K. Si me dices tu presupuesto y tus juegos, te recomiendo una build exacta.';
  }

  if (text.includes('edicion') || text.includes('video') || text.includes('render') || text.includes('premiere') || text.includes('after')) {
    return 'Para edición y render, normalmente recomiendo un procesador de 8 a 12 núcleos, 32GB o más de RAM y una GPU moderna. Si me dices tu presupuesto y software, te sugiero la mejor combinación.';
  }

  if (text.includes('oficina') || text.includes('estudio') || text.includes('trabajo')) {
    return 'Para trabajo y estudio, una CPU equilibrada con 16GB de RAM y una SSD de 1TB suele ser suficiente. Si quieres más rendimiento, ampliamos a 32GB y mejor GPU.';
  }

  return 'Puedo ayudarte con recomendaciones de PC, dudas de compatibilidad, presupuesto y rendimiento. Prueba preguntando: “¿Qué PC me sirve para jugar Fortnite con 3 millones?”';
}
function showTypingIndicator(box){
  if (!box) return null;
  const existing = box.querySelector('.chat-typing');
  if (existing) return existing;
  const item = document.createElement('div');
  item.className = 'chat-message bot chat-typing';
  item.innerHTML = '<strong>Samvex IA</strong><p><span class="typing-dots"><span></span><span></span><span></span></span></p>';
  box.appendChild(item);
  box.scrollTop = box.scrollHeight;
  return item;
}
function removeTypingIndicator(box){
  if (!box) return;
  const typing = box.querySelector('.chat-typing');
  if (typing) typing.remove();
}
function pushChatMessage(box, role, text){
  if (!box) return;
  const item = document.createElement('div');
  item.className = `chat-message ${role}`;
  const strong = document.createElement('strong');
  strong.textContent = role === 'user' ? 'Tú' : 'Samvex IA';
  const p = document.createElement('p');
  p.textContent = text;
  item.appendChild(strong);
  item.appendChild(p);
  box.appendChild(item);
  box.scrollTop = box.scrollHeight;
}
function getChatBoxFromForm(form){
  if (!form) return $('#chat-messages');
  const panel = form.closest('.chat-panel, .chat-panel-floating');
  return panel ? panel.querySelector('.chat-messages') || $('#chat-messages') : $('#chat-messages');
}
function handleChatSubmit(event){
  event.preventDefault();
  const form = event.currentTarget;
  const input = form.querySelector('input');
  const box = getChatBoxFromForm(form);
  const value = input.value.trim();
  if (!value) return;
  pushChatMessage(box, 'user', value);
  input.value = '';
  const typing = showTypingIndicator(box);
  const reply = getBotReply(value);
  window.setTimeout(() => {
    removeTypingIndicator(box);
    pushChatMessage(box, 'bot', reply);
  }, 450);
}
function setChatOpen(open){
  const panel = $('#chat-panel');
  const toggle = $('#chat-toggle');
  if (!panel || !toggle) return;
  panel.classList.toggle('hidden', !open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar chat' : 'Abrir chat');
}
function initChatbot(){
  const forms = $$('.chat-form');
  forms.forEach(form => form.addEventListener('submit', handleChatSubmit));

  $$('.chat-suggestion').forEach(button => {
    button.addEventListener('click', () => {
      const panel = button.closest('.chat-panel, .chat-panel-floating');
      const form = panel ? panel.querySelector('.chat-form') : null;
      if (!form) return;
      const input = form.querySelector('input');
      if (!input) return;
      input.value = button.textContent.trim();
      form.requestSubmit();
    });
  });

  const toggle = $('#chat-toggle');
  const close = $('#chat-close');
  const panel = $('#chat-panel');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nextOpen = panel && panel.classList.contains('hidden');
      setChatOpen(nextOpen);
    });
  }

  if (close) close.addEventListener('click', () => setChatOpen(false));
  setChatOpen(false);
}
function init(){
 build=rd('pcforge.current',{});if(typeof build!=='object'||!build)build={};
 Object.keys(build).forEach(c=>{if(!find(build[c])||find(build[c]).cat!==c)delete build[c]});
 loadShared();
 const pr=rd('pcforge.prices',null);
 if(pr&&Date.now()-pr.t<864e5)D.forEach(p=>{if(pr.p&&pr.p[p.id]){p.price=pr.p[p.id];p.src='ml'}});
 $('#feats').innerHTML=FEATS.map(f=>`<a class="card feature-card" href="#${f[2]}"><h3>${f[0]}</h3><p class="muted">${f[1]}</p></a>`).join('');
 $('#hero-stats').innerHTML=HERO_STATS.map(([v,l])=>`<div class="metric"><strong>${v}</strong><span>${l}</span></div>`).join('');
 $('#selects').innerHTML=Object.entries(CATS).map(([c,n])=>`<label for="s-${c}">${n}</label><select id="s-${c}" data-c="${c}"></select>`).join('');
 const co='<option value="">Todas</option>'+Object.entries(CATS).map(([c,n])=>`<option value="${c}">${n}</option>`).join('');
 $('#fcat').innerHTML=co;$('#ccat').innerHTML=co.replace('<option value="">Todas</option>','');
 const o=(a,f)=>a.map((x,i)=>`<option value="${i}">${f(x)}</option>`).join('');
 $('#fgpu').innerHTML=D.filter(p=>p.cat==='gpu').map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
 $('#fcpu').innerHTML=D.filter(p=>p.cat==='cpu').map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
 $('#fgame').innerHTML=o(GAMES,x=>x[0]);$('#fres').innerHTML=o(RES,x=>x[0]);$('#fq').innerHTML=o(QUAL,x=>x[0]);$('#fq').value=2;
 fillAll();
 $('#selects').addEventListener('change',e=>{const c=e.target.dataset.c;if(!c)return;e.target.value?build[c]=e.target.value:delete build[c];wr('pcforge.current',build);upd()});
 $('#budget').addEventListener('input',upd);
 $('#clear').onclick=()=>{build={};wr('pcforge.current',build);fillAll();upd();toast('Configuración vaciada')};
 $('#save').onclick=()=>{if(!Object.keys(build).length)return toast('Elige al menos un componente antes de guardar.');
  const user = getCurrentUser();
  if (!user) {
    toast('Debes iniciar sesión para guardar tus configuraciones.');
    location.hash = '#cuenta';
    return;
  }
  const accounts = getAccounts();
  const index = accounts.findIndex(entry => entry.id === user.id);
  const config = {name:$('#bname').value.trim()||'Mi PC '+(saved().length+1),date:new Date().toLocaleString('es-CO'),parts:{...build}};
  const builds = Array.isArray(accounts[index].builds) ? accounts[index].builds : [];
  builds.push(config);
  accounts[index].builds = builds;
  saveAccounts(accounts);
  setCurrentUser(accounts[index]);
  $('#bname').value='';
  rsaved();
  toast('Configuración guardada en tu cuenta.');};
 $('#exp').onclick=()=>{if(!Object.keys(build).length)return toast('No hay componentes para exportar.');download($('#bname').value.trim()||'pc-forge',txt(build,$('#bname').value.trim()||'Mi configuración'))};
 $('#saved').addEventListener('click',e=>{const d=e.target.dataset,l=saved();
  if(d.load!=null){build={...l[d.load].parts};wr('pcforge.current',build);fillAll();upd();location.hash='#constructor'}
  else if(d.exp!=null){download(l[d.exp].name,txt(l[d.exp].parts,l[d.exp].name,l[d.exp].date))}
  else if(d.del!=null&&confirm('¿Borrar esta configuración?')){const user = getCurrentUser(); if(!user){toast('Debes iniciar sesión para borrar builds.');return;} const accounts=getAccounts(); const index=accounts.findIndex(entry=>entry.id===user.id); if(index>=0){accounts[index].builds.splice(d.del,1);saveAccounts(accounts);setCurrentUser(accounts[index]);rsaved();}}});
 ['q','fcat','fsort','fmax'].forEach(i=>$('#'+i).addEventListener('input',rcat));
$('#refresh').onclick=refresh;
 $('#share').onclick=async()=>{const ids=Object.values(build);if(!ids.length)return toast('Elige componentes antes de compartir.');
  const u=location.href.split('#')[0]+'#constructor?b='+ids.join(',');
  try{await navigator.clipboard.writeText(u);toast('Enlace copiado')}catch{prompt('Copia este enlace:',u)};
 };
 $('#lq').addEventListener('keydown',e=>{if(e.key==='Enter')$('#lgo').click()});
 $('#lgo').onclick=async()=>{const q=$('#lq').value.trim(),o=$('#live');if(!q)return toast('Escribe qué quieres buscar.');o.innerHTML='<p>Buscando…</p>';
  try{const r=await fetch(`${API}/search?q=${encodeURIComponent(q)}`);if(!r.ok)throw 0;const j=await r.json();
   o.innerHTML=j.results.length?j.results.map(x=>`<article class="card"><h3>${esc(x.title)}</h3><p class="price">${F(x.price)}</p><p class="muted">${x.condition==='new'?'Nuevo':'Usado'}</p><a class="btn alt" href="${esc(x.permalink)}" target="_blank" rel="noopener noreferrer">Ver en Mercado Libre</a></article>`).join(''):'<p>Sin resultados para esa búsqueda.</p>'}
  catch{o.innerHTML='<p class="bad">El backend no responde. Ejecuta node server.js y abre http://localhost:3000.</p>'}};
 $('#cgrid').addEventListener('click',e=>{const d=e.target.dataset;
  if(d.add){const p=find(d.add);build[p.cat]=p.id;wr('pcforge.current',build);fillAll();upd();toast(p.name+' añadido a tu PC')}
  if(d.cmp){const p=find(d.cmp);if($('#ccat').value!==p.cat){$('#ccat').value=p.cat;$('#ca').value='';fillCmp();$('#ca').value=p.id}else if($('#ca').value!==p.id)$('#cb').value=p.id;
   if($('#ca').value===$('#cb').value)$('#cb').value=D.find(x=>x.cat===p.cat&&x.id!==p.id).id;rcmp();toast('Listo en el comparador: '+p.name)}});
 $('#ccat').onchange=fillCmp;$('#ca').onchange=$('#cb').onchange=rcmp;
 ['fgpu','fcpu','fgame','fres','fq'].forEach(i=>$('#'+i).addEventListener('change',fps));
 $('#fuse').onclick=()=>{if(build.gpu)$('#fgpu').value=build.gpu;if(build.cpu)$('#fcpu').value=build.cpu;fps();toast(build.gpu||build.cpu?'Componentes de tu PC aplicados':'Aún no elegiste CPU ni GPU')};
 $('#burger').onclick=()=>{const n=$('#nav').classList.toggle('open');$('#burger').setAttribute('aria-expanded',n)};
 $('#logout-btn').onclick=()=>{wr('pcforge.currentUser', null); updateUserBadge(); rsaved(); toast('Sesión cerrada.');};
 $$('.auth-tab').forEach(tab => tab.addEventListener('click', () => updateAuthMode(tab.dataset.mode)));
 $('#auth-form').addEventListener('submit', handleAuthSubmit);
 updateAuthMode('login');
 updateUserBadge();
 initChatbot();
 addEventListener('hashchange',()=>{if(loadShared()){fillAll();upd()}route()});
 rcat();rsaved();upd();fps();route();
}
init();
