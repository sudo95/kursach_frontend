import Component from '../../utils/Component.js';

export default class Profile extends Component {
  render(stats, totalAchievements) {
    if (!this.root) {
      return;
    }

    this.root.innerHTML = `
      <div class="profile">
        <div class="profile__header">
          <div class="profile__avatar">${stats.name.charAt(0)}</div>
          <div class="profile__info">
            <h2 class="profile__name">${stats.name}</h2>
            <span class="profile__level">Уровень ${stats.level}</span>
          </div>
        </div>
        <div class="profile__xp">
          <div class="profile__xp-head">
            <span>Опыт: ${stats.experience} XP</span>
            <span>${stats.levelProgress}% до уровня ${stats.level + 1}</span>
          </div>
          <div class="profile__xp-bar">
            <div class="profile__xp-fill" style="width: ${stats.levelProgress}%"></div>
          </div>
        </div>
        <ul class="profile__stats">
          <li class="profile__stat">
            <span class="profile__stat-value">${stats.completedLessons}</span>
            <span class="profile__stat-label">Уроков пройдено</span>
          </li>
          <li class="profile__stat">
            <span class="profile__stat-value">${stats.passedQuizzes}</span>
            <span class="profile__stat-label">Тестов сдано</span>
          </li>
          <li class="profile__stat">
            <span class="profile__stat-value">${stats.completedCourses}</span>
            <span class="profile__stat-label">Курсов завершено</span>
          </li>
          <li class="profile__stat">
            <span class="profile__stat-value">${stats.unlockedAchievements.length}/${totalAchievements}</span>
            <span class="profile__stat-label">Достижений</span>
          </li>
        </ul>
        <button class="profile__reset" type="button">Сбросить прогресс</button>
      </div>
    `;
  }

  onReset(handler) {
    const button = this.root.querySelector('.profile__reset');
    if (button) {
      button.addEventListener('click', handler);
    }
  }
}
