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