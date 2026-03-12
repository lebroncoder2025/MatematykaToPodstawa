/* ===== Font Size Accessibility Toggle ===== */
(function() {
  var KEY = 'mtp-fontsize';
  var sizes = { sm: '14px', md: '16px', lg: '19px' };
  var current = localStorage.getItem(KEY) || 'md';

  function apply(s) {
    document.documentElement.style.fontSize = sizes[s] || sizes.md;
    current = s;
  }

  // Apply immediately (before DOMContentLoaded)
  apply(current);

  function inject() {
    var wrap = document.createElement('div');
    wrap.id = 'fontsizeWrap';
    wrap.className = 'print-hide';
    wrap.setAttribute('aria-label', 'Rozmiar tekstu');
    wrap.style.cssText = 'position:fixed;bottom:12.5rem;right:2rem;z-index:51;display:flex;gap:.3rem;flex-direction:column;';

    var label = document.createElement('span');
    label.style.cssText = 'font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#94a3b8;text-align:center;';
    label.textContent = 'Tekst';
    wrap.appendChild(label);

    var btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;flex-direction:column;gap:.2rem;';

    [['lg','A+','Duży'],['md','A','Normalny'],['sm','A−','Mały']].forEach(function(item) {
      var size = item[0], text = item[1], title = item[2];
      var btn = document.createElement('button');
      btn.setAttribute('data-fs', size);
      btn.title = title;
      btn.textContent = text;
      btn.style.cssText = 'width:2.4rem;height:2rem;border-radius:.65rem;font-weight:900;border:1.5px solid #e2e8f0;background:#fff;color:#64748b;cursor:pointer;transition:all .2s;font-size:' + (size === 'lg' ? '.9rem' : size === 'md' ? '.75rem' : '.65rem') + ';line-height:1;';
      btn.addEventListener('click', function() {
        apply(size);
        localStorage.setItem(KEY, size);
        document.querySelectorAll('[data-fs]').forEach(function(b) {
          b.style.background = b.getAttribute('data-fs') === size ? '#3b82f6' : '#fff';
          b.style.color = b.getAttribute('data-fs') === size ? '#fff' : '#64748b';
          b.style.borderColor = b.getAttribute('data-fs') === size ? '#3b82f6' : '#e2e8f0';
        });
      });
      if (size === current) {
        btn.style.background = '#3b82f6';
        btn.style.color = '#fff';
        btn.style.borderColor = '#3b82f6';
      }
      btnRow.appendChild(btn);
    });

    wrap.appendChild(btnRow);
    document.body.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
