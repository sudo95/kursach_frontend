import Component from '../../utils/Component.js';

export default class CourseCard extends Component {
  static create(course, progress) {
    const base = import.meta.env.BASE_URL;
    const html = `
      <article class="course-card" style="--course-color: ${course.color}">
        <div class="course-card__top">
          <span class="course-card__category">${course.category}</span>
          <span class="course-card__difficulty">${course.difficulty}</span>
        </div>
        <h3 class="course-card__title">${course.title}</h3>
        <p class="course-card__description">${course.description}</p>
        <ul class="course-card__meta">
          <li class="course-card__meta-item">${course.lessonsCount} уроков</li>
          <li class="course-card__meta-item">${course.duration}</li>
        </ul>
        <div class="course-card__progress">
          <div class="course-card__progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="course-card__footer">
          <span class="course-card__progress-text">Пройдено ${progress}%</span>
          <a class="course-card__button" href="${base}pages/course.html?slug=${course.slug}">
            Начать
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </article>
    `;

    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }
}
