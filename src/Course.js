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
    if (this.checkMaxToDos()) this.#toDOs.push([subject, time, importance]);
    else throw new error("Max toDos reached!");
  }

  get toDos() {
    return this.#toDOs;
  }

  checkMaxToDos() {
    if (this.#toDOs.length() <= 5) {
      return true;
    } else return false;
  }
}
