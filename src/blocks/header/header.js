import Component from '../../utils/Component.js';

export default class Header extends Component {
  constructor(selector, activePage) {
    super(selector);
    this._activePage = activePage;
  }

  render(stats) {
    if (!this.root) {
      return;
    }

    const base = import.meta.env.BASE_URL;
    const links = [
      { page: 'home', label: 'Главная', href: `${base}index.html` },
      { page: 'courses', label: 'Курсы', href: `${base}pages/courses.html` },
      {
        page: 'achievements',
        label: 'Достижения',
        href: `${base}pages/achievements.html`,
      },
      { page: 'profile', label: 'Профиль', href: `${base}pages/profile.html` },
    ];

    const navItems = links
      .map((link) => {
        const active =
          link.page === this._activePage ? ' header__link_active' : '';
        return `<li class="header__item">
          <a class="header__link${active}" href="${link.href}" data-page="${link.page}">${link.label}</a>
        </li>`;
      })
      .join('');

    this.root.innerHTML = `
      <div class="header__inner">
        <a class="header__logo" href="${base}index.html"><svg class="header__logo-mark icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M7 9v5c0 1 2.5 2.5 5 2.5s5-1.5 5-2.5V9"/></svg>Edu<span class="header__logo-accent">Quest</span></a>
        <button class="header__burger" type="button" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <nav class="header__nav">
          <ul class="header__list">${navItems}</ul>
        </nav>
        <div class="header__level" title="Уровень и опыт">
          <span class="header__level-num">Ур. ${stats.level}</span>
          <span class="header__xp">${stats.experience} XP</span>
        </div>
      </div>
    `;

    this._bindBurger();
  }

  _bindBurger() {
    const burger = this.root.querySelector('.header__burger');
    const nav = this.root.querySelector('.header__nav');
    burger.addEventListener('click', () => {
      burger.classList.toggle('header__burger_open');
      nav.classList.toggle('header__nav_open');
    });
  }
}
