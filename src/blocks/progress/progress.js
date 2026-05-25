import Storage, { STORAGE_KEY } from '../../utils/storage.js';

export default class Progress {
  static XP_PER_LEVEL = 200;

  constructor() {
    this._state = this._load();
    this._listeners = [];
  }

  _defaultState() {
    return {
      userId: 1,
      name: 'Студент',
      experience: 0,
      completedLessons: [],
      completedCourses: [],
      passedQuizzes: [],
      unlockedAchievements: [],
    };
  }

  _load() {
    return Storage.load(STORAGE_KEY, this._defaultState());
  }

  _persist() {
    Storage.save(STORAGE_KEY, this._state);
    this._notify();
  }

  subscribe(callback) {
    this._listeners.push(callback);
  }

  _notify() {
    this._listeners.forEach((callback) => callback(this.getStats()));
  }

  get level() {
    return Math.floor(this._state.experience / Progress.XP_PER_LEVEL) + 1;
  }

  get levelProgress() {
    const inLevel = this._state.experience % Progress.XP_PER_LEVEL;
    return Math.round((inLevel / Progress.XP_PER_LEVEL) * 100);
  }

  isLessonCompleted(lessonId) {
    return this._state.completedLessons.includes(lessonId);
  }

  isAchievementUnlocked(code) {
    return this._state.unlockedAchievements.includes(code);
  }

  completeLesson(lessonId, xp) {
    if (this.isLessonCompleted(lessonId)) {
      return;
    }
    this._state.completedLessons.push(lessonId);
    this._state.experience += xp;
    this._persist();
  }

  passQuiz(lessonId, xp) {
    if (!this._state.passedQuizzes.includes(lessonId)) {
      this._state.passedQuizzes.push(lessonId);
    }
    this.completeLesson(lessonId, xp);
  }

  checkCourseCompletion(courseId, lessonIds) {
    const done = lessonIds.every((id) => this.isLessonCompleted(id));
    if (done && !this._state.completedCourses.includes(courseId)) {
      this._state.completedCourses.push(courseId);
      this._persist();
    }
  }

  courseProgress(lessonIds) {
    if (!lessonIds.length) {
      return 0;
    }
    const done = lessonIds.filter((id) => this.isLessonCompleted(id)).length;
    return Math.round((done / lessonIds.length) * 100);
  }

  evaluateAchievements(achievements) {
    const context = {
      completedLessons: this._state.completedLessons.length,
      completedCourses: this._state.completedCourses.length,
      passedQuizzes: this._state.passedQuizzes.length,
      experience: this._state.experience,
      level: this.level,
    };

    const newlyUnlocked = [];
    achievements.forEach((achievement) => {
      if (this.isAchievementUnlocked(achievement.code)) {
        return;
      }
      if (this._isConditionMet(achievement.condition, context)) {
        this._state.unlockedAchievements.push(achievement.code);
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length) {
      this._persist();
    }
    return newlyUnlocked;
  }

  _isConditionMet(condition, context) {
    const match = condition.match(/(\w+)\s*>=\s*(\d+)/);
    if (!match) {
      return false;
    }
    const [, metric, value] = match;
    return (context[metric] ?? 0) >= Number(value);
  }

  getStats() {
    return {
      name: this._state.name,
      level: this.level,
      experience: this._state.experience,
      levelProgress: this.levelProgress,
      completedLessons: this._state.completedLessons.length,
      completedCourses: this._state.completedCourses.length,
      passedQuizzes: this._state.passedQuizzes.length,
      unlockedAchievements: [...this._state.unlockedAchievements],
    };
  }

  reset() {
    this._state = this._defaultState();
    Storage.remove(STORAGE_KEY);
    this._notify();
  }
}
