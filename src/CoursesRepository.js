// import Course from "./Course.js";

export default class CoursesRepository {
  #courses = [];

  #addCourse(name) {
    this.#courses.push(new Course(name));
  }
}
