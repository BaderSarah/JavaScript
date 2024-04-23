import CoursesRepository from "./CoursesRepository.js";

export default class CoursesComponent {
  #storage;
  #coursesRepository;

  constructor() {
    this.#coursesRepository = new CoursesRepository();
  }

  #initializeHTML() {}

  #courseNamesToHtml() {}

  #courseDetailsToHtml() {}

  #addCourseToHtml() {
    const addBtn = document.getElementById("add");
    addBtn.onclick = () => {
      const name = document.getElementById("name").value;
      this.#coursesRepository.addCourse(name);
    };
  }

  #addToDosToHtml() {}
}
