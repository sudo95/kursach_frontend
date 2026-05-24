const Toast = {
  achievement(achievement) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast__icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M5 4h14v6a7 7 0 0 1-14 0V4z"/><path d="M5 6H3v2a3 3 0 0 0 2 2.8"/><path d="M19 6h2v2a3 3 0 0 1-2 2.8"/></svg></span>
      <div class="toast__body">
        <strong class="toast__title">Достижение открыто</strong>
        <span class="toast__text">${achievement.title} (+${achievement.points} XP)</span>
      </div>
    `;

    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.append(container);
    }

    container.append(toast);
    requestAnimationFrame(() => toast.classList.add('toast_visible'));

    setTimeout(() => {
      toast.classList.remove('toast_visible');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },
};

export default Toast;
