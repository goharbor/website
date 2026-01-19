document.addEventListener("DOMContentLoaded", function () {
  const tables = document.querySelectorAll(".content table");
  if (!tables.length) return;

  tables.forEach(function (table) {
    if (table.closest(".table-wrapper")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";

    const scroll = document.createElement("div");
    scroll.className = "table-scroll";

    const btn = document.createElement("button");
    btn.className = "table-enlarge-btn";
    btn.type = "button";
    btn.title = "Enlarge table";
    btn.innerText = "⤢";

    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(scroll);
    scroll.appendChild(table);
    wrapper.appendChild(btn);

    btn.addEventListener("click", function () {
      openTableModal(table);
    });
  });

  function openTableModal(table) {
    const modal = document.createElement("div");
    modal.className = "table-expanded";

    // overlay to blur background and intercept clicks
    const overlay = document.createElement("div");
    overlay.className = "table-modal-overlay";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.title = "Close";
    closeBtn.innerText = "✕";
    closeBtn.className = "table-close-btn";

    const cloned = table.cloneNode(true);
    cloned.style.width = "100%";
    cloned.style.display = "table";
    cloned.style.tableLayout = "auto";
    cloned.style.whiteSpace = "normal";
    cloned.style.borderCollapse = "collapse";

    try {
      const comp = window.getComputedStyle(table);
      if (comp) {
        if (comp.fontSize) cloned.style.fontSize = comp.fontSize;
        if (comp.fontWeight) cloned.style.fontWeight = comp.fontWeight;
        if (comp.fontFamily) cloned.style.fontFamily = comp.fontFamily;
        if (comp.color) cloned.style.color = comp.color;
      }

      const srcCell = table.querySelector("th, td");
      const tgtCells = cloned.querySelectorAll("th, td");
      if (srcCell && tgtCells.length) {
        const cellStyle = window.getComputedStyle(srcCell);
        tgtCells.forEach(function (c) {
          if (cellStyle.borderTopWidth)
            c.style.borderTop =
              cellStyle.borderTopWidth +
              " " +
              cellStyle.borderTopStyle +
              " " +
              cellStyle.borderTopColor;
          if (cellStyle.borderRightWidth)
            c.style.borderRight =
              cellStyle.borderRightWidth +
              " " +
              cellStyle.borderRightStyle +
              " " +
              cellStyle.borderRightColor;
          if (cellStyle.borderBottomWidth)
            c.style.borderBottom =
              cellStyle.borderBottomWidth +
              " " +
              cellStyle.borderBottomStyle +
              " " +
              cellStyle.borderBottomColor;
          if (cellStyle.borderLeftWidth)
            c.style.borderLeft =
              cellStyle.borderLeftWidth +
              " " +
              cellStyle.borderLeftStyle +
              " " +
              cellStyle.borderLeftColor;
          if (cellStyle.padding) c.style.padding = cellStyle.padding;
        });
      }
    } catch (e) {
      // ignore
    }

    modal.appendChild(closeBtn);
    modal.appendChild(cloned);
    // append overlay then modal so overlay is below modal
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    function close() {
      if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
      if (overlay && overlay.parentNode)
        overlay.parentNode.removeChild(overlay);
      document.removeEventListener("keydown", onKey);
    }

    closeBtn.addEventListener("click", close);
    // clicking overlay also closes modal
    overlay.addEventListener("click", close);

    function onKey(e) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", onKey);
  }
});
