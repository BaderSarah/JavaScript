import Course from "./Course.js";

export default class CoursesRepository {
  #courses = [];

  addCourse(name) {
    this.#courses.push(new Course(name));
  }

  giveCourse(name) {
    console.log(this.#courses.find((c) => c.name === name)); 
    return this.#courses.find((c) => c.name === name);
  }

  giveAllCoursesNames() {
    return [...new Set(this.#courses.map((c) => c.name))].sort();
  }

  get courses() {
    return [...new Set(this.#courses)];
  }

  set courses(courses) {
    this.#courses = courses;
  }

  addExistingCourse(course) {
    this.#courses.push(course);
  }

  addToDoToCourse(name, title, time, urgency) {
    let course = this.giveCourse(name);
    course = () => {
      addToDo(title, time, urgency); 
    };
  }

  // non
  giveToDosOfCourse(name) {
    return this.#courses.find((c) => c.name == name).toDos;
  }

  giveCoursesJSON() {
    const coursesJSON = this.#courses.map((c) => c.toJSON()); // ()
    return coursesJSON;
  }
}
