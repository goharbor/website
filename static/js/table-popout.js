document.addEventListener("DOMContentLoaded", function () {
  var tables = document.querySelectorAll(".content table");
  if (!tables.length) return;

  tables.forEach(function (table) {
    if (table.closest(".table-wrapper")) return;

    var wrapper = document.createElement("div");
    wrapper.className = "table-wrapper";

    var scroll = document.createElement("div");
    scroll.className = "table-scroll";

    var btn = document.createElement("button");
    btn.className = "table-enlarge-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Enlarge table");
    btn.innerText = "\u2922";

    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(scroll);
    scroll.appendChild(table);
    wrapper.appendChild(btn);

    btn.addEventListener("click", function () {
      if (document.querySelector(".table-expanded")) return;
      openTableModal(table, btn);
    });
  });

  function openTableModal(table, triggerBtn) {
    var overlay = document.createElement("div");
    overlay.className = "table-modal-overlay";

    var modal = document.createElement("div");
    modal.className = "table-expanded";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Table enlarged view");

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "table-close-btn";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.innerText = "\u2715";

    var cloned = table.cloneNode(true);

    modal.appendChild(closeBtn);
    modal.appendChild(cloned);
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    closeBtn.focus();

    function close() {
      if (modal.parentNode) modal.parentNode.removeChild(modal);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      triggerBtn.focus();
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);

    function onKey(e) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", onKey);
  }
});
