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
      /* real page margins — this was missing entirely, which is
         why text was running to the edge of the paper */
      @page {
        margin: 1.6cm 1.4cm;
      }

      nav, .pdf-download-btn, footer { display: none !important; }
      body { background: #fff !important; margin: 0 !important; }
      .content { max-width: 100% !important; margin: 0 !important; }

      /* shrink the hero right down for print instead of leaving
         it full-size — a full-height coloured banner was eating
         most of page 1 before any notes content started */
      .page-hero {
        border: none !important;
        background: none !important;
        padding: 0 0 8px 0 !important;
        margin: 0 0 12px 0 !important;
      }
      .page-hero h1 { font-size: 18px !important; margin: 0 !important; }
      .page-hero p { font-size: 12px !important; margin: 2px 0 0 0 !important; }

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

      /* header/title-bar: keep each one from splitting internally,
         but don't chain them together as one forced unit — that
         was what pushed both to page 2 and left page 1 blank
         underneath the hero */
      .notes-header { break-inside: avoid-page; break-after: avoid-page; }
      .notes-title-bar { break-inside: avoid-page; break-before: avoid-page; }

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