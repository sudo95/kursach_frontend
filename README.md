# EduQuest

Клиентская часть образовательной платформы с элементами геймификации и
системой интерактивных достижений пользователя. Учебный проект по дисциплине
«Фронтенд-разработка», РТУ МИРЭА.

## Возможности

- каталог образовательных курсов с фильтрами по категории и сложности;
- страница курса со списком уроков и интерактивным тестом;
- начисление очков опыта (XP) и расчёт уровня пользователя;
- система интерактивных достижений: открытые и заблокированные бейджи;
- сохранение прогресса в `localStorage` под ключом `eduquest-progress`;
- адаптивная вёрстка для мобильных, планшетов и десктопа;
- загрузка данных через mock-API (статические JSON-файлы в `src/data`).

## Технологии

HTML5, CSS3 (Flexbox, Grid, Custom Properties), JavaScript ES6+ (модули,
классы), Vite, ESLint, Prettier, методология БЭМ. Фронтенд-фреймворки не
используются.

## Структура проекта

```text
src/
  api/            класс Api — клиент mock-API
  blocks/         БЭМ-блоки (header, course-card, course-list, achievements,
                  progress, profile, quiz, hero, footer)
  data/           JSON-данные: courses, lessons, achievements
  pages/          HTML-страницы и их точки входа
  styles/         глобальные стили и toast
  utils/          Component, storage, toast, bootstrap
  index.html      главная страница
  index.js        точка входа главной страницы
vite.config.js
eslint.config.js
.prettierrc
```

## Запуск

```bash
npm install      # установка зависимостей
npm run dev      # запуск дев-сервера Vite (http://localhost:5173)
npm run build    # продакшен-сборка в каталог dist
npm run preview  # предпросмотр собранной версии
npm run lint     # проверка кода ESLint
npm run format   # форматирование Prettier
```

## Публикация на GitHub Pages

В `vite.config.js` параметр `base` задан как `/eduquest/`. После
`npm run build` содержимое каталога `dist` публикуется на GitHub Pages
(например, через ветку `gh-pages` или GitHub Actions).

- Ссылка на опубликованное приложение: [ЗАПОЛНИТЬ]
- Ссылка на репозиторий: [ЗАПОЛНИТЬ]
# kursach_frontend
