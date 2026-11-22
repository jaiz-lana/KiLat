(function (root) {
    'use strict';

    const ALLOWED_DOCX_TAGS = new Set([
        'P', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'S',
        'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
        'UL', 'OL', 'LI', 'TABLE', 'THEAD', 'TBODY', 'TR', 'TH', 'TD',
        'BLOCKQUOTE', 'SPAN', 'DIV', 'IMG'
    ]);

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function sanitizeDocxHtml(html) {
        if (!root.DOMParser) throw new Error('DOMParser is required');
        const doc = new root.DOMParser().parseFromString(String(html || ''), 'text/html');
        const elements = Array.from(doc.body.querySelectorAll('*'));

        elements.forEach(element => {
            if (!ALLOWED_DOCX_TAGS.has(element.tagName)) {
                element.replaceWith(...Array.from(element.childNodes));
                return;
            }
            Array.from(element.attributes).forEach(attribute => {
                const name = attribute.name.toLowerCase();
                const allowed =
                    (element.tagName === 'IMG' && name === 'src' && /^data:image\/(?:png|jpeg|gif|webp);base64,/i.test(attribute.value)) ||
                    (element.tagName === 'IMG' && name === 'alt') ||
                    ((element.tagName === 'TD' || element.tagName === 'TH') && (name === 'colspan' || name === 'rowspan'));
                if (!allowed) element.removeAttribute(attribute.name);
            });
        });

        return doc.body.innerHTML;
    }

    const api = { escapeHtml, sanitizeDocxHtml, ALLOWED_DOCX_TAGS };
    root.KiLatSecurity = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
