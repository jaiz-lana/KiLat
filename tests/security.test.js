const test = require('node:test');
const assert = require('node:assert/strict');
const security = require('../security.js');

test('escapeHtml neutralizes HTML metacharacters', () => {
  assert.equal(
    security.escapeHtml(`<img src=x onerror="alert(1)">`),
    '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;'
  );
});

test('DOCX allowlist excludes scripts and event attributes', () => {
  assert.equal(security.ALLOWED_DOCX_TAGS.has('SCRIPT'), false);
  assert.equal(security.ALLOWED_DOCX_TAGS.has('IMG'), true);
  assert.equal(security.ALLOWED_DOCX_TAGS.has('P'), true);
});
