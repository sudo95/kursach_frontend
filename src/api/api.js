export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Ошибка загрузки данных: ${response.status}`),
    );
  }

  _request(path) {
    return fetch(`${this._baseUrl}/${path}`).then((res) =>
      this._checkResponse(res),
    );
  }

  getCourses() {
    return this._request('courses.json');
  }

  getCourseBySlug(slug) {
    return this.getCourses().then((courses) =>
      courses.find((course) => course.slug === slug),
    );
  }

  getAllLessons() {
    return this._request('lessons.json');
  }

  getLessons(slug) {
    return this.getAllLessons().then((lessons) => lessons[slug] || []);
  }

  getAchievements() {
    return this._request('achievements.json');
  }
}
