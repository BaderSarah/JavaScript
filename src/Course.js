export default class Course {
  #name;
  #toDOs = [];

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  addToDo(subject, time, importance) {
    this.#toDOs.push([subject, time, importance]);
  }
}
