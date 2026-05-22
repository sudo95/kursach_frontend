import Component from '../../utils/Component.js';

export default class Quiz extends Component {
  constructor(selector, progress) {
    super(selector);
    this._progress = progress;
  }

  escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  start(lesson, onFinish) {
    this._lesson = lesson;
    this._questions = lesson.quiz || [];
    this._current = 0;
    this._score = 0;
    this._onFinish = onFinish;
    this._renderQuestion();
  }

  _renderQuestion() {
    const q = this._questions[this._current];
    const total = this._questions.length;
    const options = q.options
      .map((opt, i) => `<li class="quiz__option" data-index="${i}">${this.escapeHTML(opt)}</li>`)
      .join('');

    this.root.innerHTML = `
      <div class="quiz">
        <div class="quiz__progress">Вопрос ${this._current + 1} из ${total}</div>
        <h3 class="quiz__question">${this.escapeHTML(q.question)}</h3>
        <ul class="quiz__options">${options}</ul>
      </div>
    `;

    this.root
      .querySelectorAll('.quiz__option')
      .forEach((el) =>
        el.addEventListener('click', () =>
          this._answer(Number(el.dataset.index), el),
        ),
      );
  }

  _answer(index, el) {
    const q = this._questions[this._current];
    const correct = index === q.correct;

    if (correct) {
      this._score += 1;
      el.classList.add('quiz__option_correct');
    } else {
      el.classList.add('quiz__option_wrong');
      const correctEl = this.root.querySelector(
        `.quiz__option[data-index="${q.correct}"]`,
      );
      correctEl.classList.add('quiz__option_correct');
    }

    this.root
      .querySelectorAll('.quiz__option')
      .forEach((opt) => opt.classList.add('quiz__option_disabled'));

    setTimeout(() => {
      this._current += 1;
      if (this._current < this._questions.length) {
        this._renderQuestion();
      } else {
        this._finish();
      }
    }, 1500);
  }

  _finish() {
    const total = this._questions.length;
    const passed = this._score >= Math.ceil(total / 2);

    if (passed) {
      this._progress.passQuiz(this._lesson.id, this._lesson.xp);
    }

    this.root.innerHTML = `
      <div class="quiz quiz_result">
        <h3 class="quiz__question">Тест завершён</h3>
        <p class="quiz__result-score">Правильных ответов: ${this._score} из ${total}</p>
        <p class="quiz__result-status">${
          passed
            ? `Тест пройден. Начислено ${this._lesson.xp} XP.`
            : 'Тест не пройден. Попробуйте ещё раз.'
        }</p>
      </div>
    `;

    if (typeof this._onFinish === 'function') {
      this._onFinish(passed);
    }
  }
}
