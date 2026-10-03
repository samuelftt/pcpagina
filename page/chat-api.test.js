const test = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test('api chat responde en puerto 3000', async () => {
  const proc = spawn(process.execPath, ['files/server.js'], {
    env: { ...process.env, PORT: '3000' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  let output = '';
  proc.stdout.on('data', chunk => { output += chunk.toString(); });
  proc.stderr.on('data', chunk => { output += chunk.toString(); });

  try {
    await wait(2000);
    const response = await fetch('http://localhost:3000/api/chat?prompt=Quiero%20una%20PC%20para%20gaming%20con%203%20millones');
    const text = await response.text();
    assert.equal(response.status, 200, `Esperaba 200 pero fue ${response.status}: ${text}`);
    const body = JSON.parse(text);
    assert.ok(body.answer && String(body.answer).length > 20, 'Falta respuesta útil del chat');
  } finally {
    proc.kill('SIGTERM');
    await wait(300);
  }
});
