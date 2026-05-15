import './styles/global.css';
import './blocks/header/header.css';
import './blocks/footer/footer.css';
import './blocks/hero/hero.css';
import './blocks/course-card/course-card.css';
import './blocks/course-list/course-list.css';
import './styles/toast.css';

import {
  api,
  progress,
  initLayout,
  checkAchievements,
} from './utils/bootstrap.js';
import CourseList from './blocks/course-list/course-list.js';

async function main() {
  initLayout('home');
  await checkAchievements();

  const list = new CourseList('.js-popular-courses', progress);

  try {
    const courses = await api.getCourses();
    const lessons = await api.getAllLessons();
    list.render(courses.slice(0, 3), lessons);
  } catch (error) {
    console.error(error);
    document.querySelector('.js-popular-courses').innerHTML =
      '<p class="error-message">Не удалось загрузить курсы.</p>';
  }
}

main();
