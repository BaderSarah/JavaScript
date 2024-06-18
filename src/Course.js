export default class Course {
  #name;
  #toDos = [];

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  static ToDo = class {
    #title;
    #time; 
    #urgency; 

    constructor(title, time, urgency){
      this.#title = title; 
      this.#time = time; 
      this.#urgency = urgency; 
    }

    get title(){
      return this.#title; 
    }

    get time(){
      return this.#time;
    }

    get urgency(){
      return this.#urgency; 
    }
  }

  addToDo(title, time, urgency) {
    if (this.checkMaxToDos()) this.#toDos.push(new ToDo(title, time, urgency));
    else throw new error("Max toDos reached!");
  }

/* 
  addToDo(title, time, urgency) {
    if (this.checkMaxToDos()) this.#toDos.push([title, time, urgency]);
    else throw new error("Max toDos reached!");
  }
    */

  get toDOs() {
    return this.#toDos;
  } 

  checkMaxToDos() {
    if (this.#toDos.length() <= 5) {
      return true;
    } else return false;
  }

  toJSON() {
    return {
      name: this.#name,
      toDos: this.#toDos,
    };
  }
}
