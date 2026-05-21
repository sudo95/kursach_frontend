import '../styles/global.css';
import '../blocks/header/header.css';
import '../blocks/footer/footer.css';
import '../blocks/course-list/course.css';
import '../blocks/quiz/quiz.css';
import '../styles/toast.css';

import {
  api,
  progress,
  initLayout,
  checkAchievements,
} from '../utils/bootstrap.js';
import Quiz from '../blocks/quiz/quiz.js';

let course;
let lessons;
let quiz;

async function main() {
  initLayout('courses');

  const slug = new URLSearchParams(location.search).get('slug');
  const root = document.querySelector('.js-course');

  if (!slug) {
    root.innerHTML = '<p class="error-message">Курс не выбран.</p>';
    return;
  }

  try {
    course = await api.getCourseBySlug(slug);
    lessons = await api.getLessons(slug);
    if (!course) {
      root.innerHTML = '<p class="error-message">Курс не найден.</p>';
      return;
    }
    quiz = new Quiz('.js-quiz', progress);
    renderCourse();
    await checkAchievements();
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p class="error-message">Не удалось загрузить курс.</p>';
  }
}

function renderCourse() {
  const lessonIds = lessons.map((l) => l.id);
  const percent = progress.courseProgress(lessonIds);
  document.title = `${course.title} — EduQuest`;

  const header = document.querySelector('.js-course');
  header.style.setProperty('--course-color', course.color);
  header.innerHTML = `
    <div class="course__header">
      <span class="course__category">${course.category} · ${course.difficulty}</span>
      <h1 class="course__title">${course.title}</h1>
      <p class="course__description">${course.description}</p>
      <div class="course__progress">
        <div class="course__progress-bar js-course-bar" style="width: ${percent}%"></div>
      </div>
    </div>
  `;

  renderLessons();
}

function renderLessons() {
  const container = document.querySelector('.js-lessons');
  container.innerHTML = '';

  lessons.forEach((lesson, index) => {
    const done = progress.isLessonCompleted(lesson.id);
    const isQuiz = Array.isArray(lesson.quiz);
    const el = document.createElement('div');
    el.className = `lesson${done ? ' lesson_done' : ''}`;
    el.innerHTML = `
      <span class="lesson__status">${done ? '✓' : index + 1}</span>
      <div class="lesson__body">
        <h3 class="lesson__title">${lesson.title}</h3>
        <p class="lesson__summary">${lesson.summary}</p>
      </div>
      <span class="lesson__xp">+${lesson.xp} XP</span>
      <button class="lesson__button" type="button" ${done && !isQuiz ? 'disabled' : ''}>
        ${done ? (isQuiz ? 'Пересдать' : 'Пройдено') : isQuiz ? 'Тест' : 'Завершить'}
      </button>
    `;

    const button = el.querySelector('.lesson__button');
    button.addEventListener('click', () => handleLesson(lesson));
    container.append(el);
  });
}

async function handleLesson(lesson) {
  if (Array.isArray(lesson.quiz)) {
    document.querySelector('.js-quiz').scrollIntoView({ behavior: 'smooth' });
    quiz.start(lesson, () => finalize());
  } else {
    progress.completeLesson(lesson.id, lesson.xp);
    finalize();
  }
}

async function finalize() {
  const lessonIds = lessons.map((l) => l.id);
  progress.checkCourseCompletion(course.id, lessonIds);

  const percent = progress.courseProgress(lessonIds);
  const bar = document.querySelector('.js-course-bar');
  if (bar) {
    bar.style.width = `${percent}%`;
  }
  renderLessons();
  await checkAchievements();
}

main();
