/* ============================================================
   Maths Study Hub — shared PDF download feature
   Include on any notes page with:
     <script src="../pdf-download.js" defer></script>
   Only activates itself on pages that actually have the
   notes template (.notes-title-bar + .notes-grid) — safe to
   include site-wide without affecting hub/index pages.
   ============================================================ */

(function () {

  // --- 1. inject the print stylesheet ---
  const style = document.createElement('style');
  style.textContent = `
    .pdf-download-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--calc, #0e7490);
      color: #fff;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      margin: 16px 0;
      transition: opacity 0.2s;
    }
    .pdf-download-btn:hover { opacity: 0.85; }

    @media print {
      nav, .pdf-download-btn, footer { display: none !important; }
      .page-hero { border: none !important; }
      body { background: #fff !important; }
      .content { max-width: 100% !important; margin: 0 !important; }

      .notes-grid {
        display: block !important;
        border-radius: 0 0 12px 12px;
      }
      .notes-col {
        border-right: none !important;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 20px;
        margin-bottom: 16px;
        break-inside: avoid-page;
      }
      .notes-col:last-child { border-bottom: none; margin-bottom: 0; }

      .key-box, .example-box, .warn-box, .highlight,
      .graph-box, table.limit-table, .notes-header, .notes-title-bar {
        break-inside: avoid-page;
      }
    }
  `;
  document.head.appendChild(style);

  // --- 2. add the button, only on actual notes pages ---
  function init() {
    const titleBar = document.querySelector('.notes-title-bar');
    const grid = document.querySelector('.notes-grid');
    if (!titleBar || !grid) return; // not a notes page — do nothing

    const btn = document.createElement('button');
    btn.className = 'pdf-download-btn';
    btn.innerHTML = '⬇️ Download PDF';
    btn.onclick = () => window.print();

    titleBar.insertAdjacentElement('afterend', btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();