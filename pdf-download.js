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
        margin-bottom: 0 !important;
      }
      .notes-col {
        border-right: none !important;
        border-bottom: 2px solid #e5e7eb;
        padding-bottom: 20px;
        margin-bottom: 16px;
        /* deliberately NOT break-inside:avoid-page here — a whole
           column is too big to protect as one block; doing so
           left large blank gaps when it couldn't fit on the
           current page and got pushed entirely to the next one */
      }
      .notes-col:last-child { border-bottom: none; margin-bottom: 0; }

      /* only protect the SMALL individual boxes from splitting
         mid-way — safe since each one is short */
      .key-box, .example-box, .warn-box, .highlight,
      .graph-box, table.limit-table {
        break-inside: avoid-page;
      }
      .notes-header, .notes-title-bar {
        break-inside: avoid-page;
        break-after: avoid-page;
      }

      /* graphs were sized for a narrow column — cap them so they
         don't stretch to fill the full print width */
      .notes-col svg {
        max-width: 320px !important;
        width: 100% !important;
        height: auto !important;
        display: block;
        margin: 6px auto 14px !important;
      }

      /* remove trailing space that was causing an extra blank
         page at the end of the document */
      .content > *:last-child {
        margin-bottom: 0 !important;
        padding-bottom: 0 !important;
      }
    }
  `;
  document.head.appendChild(style);

  // --- 2. add a button after EVERY notes section on the page ---
  // (some pages, like continuity.html, have more than one
  // .notes-title-bar + .notes-grid pair on a single page)
  function init() {
    const titleBars = document.querySelectorAll('.notes-title-bar');
    if (!titleBars.length) return; // not a notes page — do nothing

    titleBars.forEach((titleBar) => {
      const btn = document.createElement('button');
      btn.className = 'pdf-download-btn';
      btn.innerHTML = '⬇️ Download PDF';
      btn.onclick = () => window.print();

      titleBar.insertAdjacentElement('afterend', btn);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();