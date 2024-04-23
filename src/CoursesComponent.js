import CoursesRepository from "./CoursesRepository.js";

export default class CoursesComponent {
  #coursesRepository;

  constructor() {
    this.#coursesRepository = new CoursesRepository();
  }

  #initializeHTML() {}

  #courseNamesToHtml() {}

  #courseDetailsToHtml() {}
}
