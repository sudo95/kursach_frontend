import '../styles/global.css';
import '../blocks/header/header.css';
import '../blocks/footer/footer.css';
import '../blocks/course-card/course-card.css';
import '../blocks/course-list/course-list.css';
import '../blocks/course-list/course.css';
import '../styles/toast.css';

import {
  api,
  progress,
  initLayout,
  checkAchievements,
} from '../utils/bootstrap.js';
import CourseList from '../blocks/course-list/course-list.js';

async function main() {
  initLayout('courses');
  await checkAchievements();

  const list = new CourseList('.js-course-list', progress);

  try {
    const courses = await api.getCourses();
    const lessons = await api.getAllLessons();
    list.render(courses, lessons);
    buildFilters(courses, list);
  } catch (error) {
    console.error(error);
    document.querySelector('.js-course-list').innerHTML =
      '<p class="error-message">Не удалось загрузить курсы.</p>';
  }
}

function buildFilters(courses, list) {
  const categories = [...new Set(courses.map((c) => c.category))];
  const difficulties = [...new Set(courses.map((c) => c.difficulty))];

  fillSelect('.js-filter-category', categories);
  fillSelect('.js-filter-difficulty', difficulties);

  document
    .querySelector('.js-filter-category')
    .addEventListener('change', (e) =>
      list.setFilter('category', e.target.value),
    );
  document
    .querySelector('.js-filter-difficulty')
    .addEventListener('change', (e) =>
      list.setFilter('difficulty', e.target.value),
    );
}

function fillSelect(selector, values) {
  const select = document.querySelector(selector);
  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

main();
