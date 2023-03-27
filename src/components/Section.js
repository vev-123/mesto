class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }

  // отрисовка всех итемов
  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

}

export {Section};