const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('service worker manifest contains only existing first-party assets', () => {
  const context = {
    globalThis: {},
    caches: {},
    self: {
      addEventListener() {},
      skipWaiting() {}
    }
  };
  vm.runInNewContext(fs.readFileSync('sw.js', 'utf8'), context);
  const assets = context.globalThis.KILAT_PWA_ASSETS;
  assert.ok(assets);
  for (const asset of assets.SHELL) {
    if (asset === './') continue;
    assert.equal(fs.existsSync(asset), true, `missing shell asset: ${asset}`);
  }
});

test('optional service worker assets are listed separately', () => {
  const context = { globalThis: {}, caches: {}, self: { addEventListener() {}, skipWaiting() {} } };
  vm.runInNewContext(fs.readFileSync('sw.js', 'utf8'), context);
  const assets = context.globalThis.KILAT_PWA_ASSETS;
  assert.deepEqual(Array.from(assets.OPTIONAL_ASSETS), ['static/sound/gledek.mp3']);
  assert.equal(assets.SHELL.includes('static/sound/gledek.mp3'), false);
});
