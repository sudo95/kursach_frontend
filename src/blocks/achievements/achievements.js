import Component from '../../utils/Component.js';

const ICONS = {
  first_lesson:
    '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M7 9v5c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5V9"/>',
  three_lessons:
    '<path d="M4 6h13"/><path d="M4 12h13"/><path d="M4 18h13"/><path d="M20 5l1 1"/><path d="M20 11l1 1"/><path d="M20 17l1 1"/>',
  first_quiz:
    '<path d="M9 11l2 2 4-4"/><rect x="4" y="4" width="16" height="16" rx="1"/>',
  hundred_xp:
    '<path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"/>',
  first_course:
    '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M5 4h14v6a7 7 0 0 1-14 0V4z"/><path d="M5 6H3v2a3 3 0 0 0 2 2.8"/><path d="M19 6h2v2a3 3 0 0 1-2 2.8"/>',
  level_three:
    '<path d="M12 3l7 4v6c0 4-3 6.5-7 8-4-1.5-7-4-7-8V7l7-4z"/><path d="M9 12l2 2 4-4"/>',
  locked:
    '<rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
};

function iconSvg(key) {
  const body = ICONS[key] || ICONS.locked;
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
}

export default class Achievements extends Component {
  constructor(selector, progress) {
    super(selector);
    this._progress = progress;
  }

  render(achievements) {
    if (!this.root) {
      return;
    }
    this.clear();

    achievements.forEach((item) => {
      const unlocked = this._progress.isAchievementUnlocked(item.code);
      const card = this._createCard(item, unlocked);
      this.root.append(card);
    });
  }

  _createCard(item, unlocked) {
    const stateClass = unlocked
      ? 'achievement-card_unlocked'
      : 'achievement-card_locked';
    const status = unlocked ? 'Получено' : 'Заблокировано';

    const html = `
      <article class="achievement-card ${stateClass}">
        <div class="achievement-card__icon">${
          unlocked ? iconSvg(item.code) : iconSvg('locked')
        }</div>
        <div class="achievement-card__body">
          <h3 class="achievement-card__title">${item.title}</h3>
          <p class="achievement-card__description">${item.description}</p>
          <span class="achievement-card__points">+${item.points} XP</span>
        </div>
        <span class="achievement-card__status">${status}</span>
      </article>
    `;
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }
}
