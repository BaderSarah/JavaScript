import CoursesRepository from "./CoursesRepository.js";

export default class CoursesComponent {
  #names = [];
  #storage;
  #coursesRepository;

  constructor() {
    this.#coursesRepository = new CoursesRepository();
    this.#storage = window.localStorage;
    this.#printCoursesConsole();

    document.getElementById("add").onclick = () => {
      document.getElementById("error").innerText = "";
      const name = document.getElementById("inputName").value;
      if (
        name == "" ||
        this.#names.find((n) => n.toUpperCase() === name.toUpperCase())
      ) {
        document.getElementById("error").innerText =
          "Course name is already in use or empty";
      } else {
        this.#addNameCourse(name);
      }
      document.getElementById("inputName").value = "";
      console.log(this.#names);
    };

    this.#toHtml();
  }

  #addNameCourse(name) {
    this.#names.push(name);
    this.#setNamesInStorage();
  }

  #toHtml() {
    this.#courseNamesToHtml();
    this.#coursesToHtml();
    this.#addToDosToHtml;
  }

  #setNamesInStorage() {
    this.#storage.setItem("namesCourses", JSON.stringify(this.#names));
  }

  #getNamesInStorage() {
    this.#names = [];
    if (this.#storage.getItem("namesCourses")) {
      this.#names = JSON.parse(this.#storage.getItem("namesCourses"));
    }
  }

  #courseNamesToHtml() {}

  #coursesToHtml() {}

  #addToDosToHtml(name) {
    const toDos = this.#coursesRepository.giveToDosOfCourse(name);
  }

  // help method
  #printCoursesConsole() {
    console.log(this.#coursesRepository.courses);
  }
}
