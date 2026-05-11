export default class Component {
  constructor(selector) {
    this._selector = selector;
    this._root = document.querySelector(selector);

    if (!this._root) {
      console.warn(`Component: элемент "${selector}" не найден в разметке`);
    }
  }

  get root() {
    return this._root;
  }

  render(data) {
    void data;
    throw new Error('Метод render() должен быть переопределён в потомке');
  }

  show() {
    if (this._root) {
      this._root.hidden = false;
    }
    return this;
  }

  hide() {
    if (this._root) {
      this._root.hidden = true;
    }
    return this;
  }

  clear() {
    if (this._root) {
      this._root.innerHTML = '';
    }
    return this;
  }

  _createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }
}
