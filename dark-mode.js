(function(){
  const storageKey = 'theme';
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(theme) {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  const saved = localStorage.getItem(storageKey);
  let theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        theme = root.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(theme);
        localStorage.setItem(storageKey, theme);
      });
    }

    // If user has no saved preference, respond to system changes
    if (!saved && window.matchMedia) {
      try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          const newPref = e.matches ? 'dark' : 'light';
          applyTheme(newPref);
        });
      } catch (e) {
        // some browsers use removeListener/addListener fallback
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        if (mq.addListener) {
          mq.addListener((e) => {
            const newPref = e.matches ? 'dark' : 'light';
            applyTheme(newPref);
          });
        }
      }
    }
  });
})();
