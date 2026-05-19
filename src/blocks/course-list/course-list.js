import Component from '../../utils/Component.js';
import CourseCard from '../course-card/course-card.js';

export default class CourseList extends Component {
  constructor(selector, progress) {
    super(selector);
    this._progress = progress;
    this._courses = [];
    this._lessonsMap = {};
    this._filters = { category: 'all', difficulty: 'all' };
  }

  render(courses, lessonsMap = {}) {
    this._courses = courses;
    this._lessonsMap = lessonsMap;
    this._draw();
  }

  setFilter(type, value) {
    this._filters[type] = value;
    this._draw();
  }

  _applyFilters() {
    return this._courses.filter((course) => {
      const byCategory =
        this._filters.category === 'all' ||
        course.category === this._filters.category;
      const byDifficulty =
        this._filters.difficulty === 'all' ||
        course.difficulty === this._filters.difficulty;
      return byCategory && byDifficulty;
    });
  }

  _draw() {
    this.clear();
    const filtered = this._applyFilters();

    if (!filtered.length) {
      this.root.innerHTML =
        '<p class="course-list__empty">По выбранным фильтрам курсы не найдены.</p>';
      return;
    }

    filtered.forEach((course) => {
      const lessonIds = (this._lessonsMap[course.slug] || []).map((l) => l.id);
      const progress = this._progress.courseProgress(lessonIds);
      this.root.append(CourseCard.create(course, progress));
    });
  }
}
