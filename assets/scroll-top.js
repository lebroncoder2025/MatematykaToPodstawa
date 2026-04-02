/* ===== Scroll-to-top button ===== */
(function () {
  "use strict";

  var btn;
  var THRESHOLD = 400;

  function create() {
    btn = document.createElement("button");
    btn.id = "scroll-top-btn";
    btn.setAttribute("aria-label", "Przewiń do góry");
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    var s = document.createElement("style");
    s.textContent =
      '#scroll-top-btn{position:fixed;bottom:20px;left:20px;z-index:9997;width:44px;height:44px;border-radius:50%;border:none;background:#6366f1;color:#fff;font-size:16px;cursor:pointer;box-shadow:0 4px 14px rgba(99,102,241,.4);display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(20px);pointer-events:none;transition:all .3s ease}' +
      '#scroll-top-btn.visible{opacity:1;transform:translateY(0);pointer-events:auto}' +
      '#scroll-top-btn:hover{background:#4f46e5;transform:translateY(-2px);box-shadow:0 6px 20px rgba(99,102,241,.5)}';
    document.head.appendChild(s);
  }

  function onScroll() {
    if (!btn) return;
    btn.classList.toggle("visible", window.scrollY > THRESHOLD);
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", create); }
  else { create(); }
})();
