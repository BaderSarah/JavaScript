import CoursesRepository from "./CoursesRepository.js";

export default class CoursesComponent {
  #names = [];
  #storage;
  #coursesRepository;
  #courses = [];

  constructor() {
    this.#coursesRepository = new CoursesRepository();
    this.#storage = window.localStorage;
    this.#printCoursesConsole();
    this.#toHtml();

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
        this.#coursesRepository.addCourse(name);
        this.#printCoursesConsole();
      }
      this.#setCoursesInStorage();
      this.#addStorageCoursesToRepo();
      document.getElementById("inputName").value = "";
      this.#toHtml();
    };
  }

  #addNameCourse(name) {
    this.#names.push(name);
    this.#setNamesInStorage();
    this.#setCoursesInStorage();
  }

  #toHtml() {
    // remove the previous
    const divAddCourse = document.getElementById("courseId");
    divAddCourse.innerHTML = "";

    this.#coursesToHtml();
  }

  #setNamesInStorage() {
    this.#storage.setItem("namesCourses", this.#names);
  }

  #setCoursesInStorage() {
    const coursesJSON = this.#coursesRepository.giveCoursesJSON();
    if (coursesJSON != null) {
      this.#storage.setItem("courses", JSON.stringify(coursesJSON));
    }
  }

  #getCoursesInStorage() {
    this.#courses = [];
    if (this.#storage.getItem("courses")) {
      this.#courses = JSON.parse(this.#storage.getItem("courses"));
    }
  }

  #addStorageCoursesToRepo() {
    this.#getCoursesInStorage();
    this.#courses.forEach((c) => {
      this.#coursesRepository.addExistingCourse(c);
    });
  }

  #getNamesInStorage() {
    this.#names = [];
    if (this.#storage.getItem("namesCourses")) {
      this.#names = this.#storage.getItem("namesCourses");
    }
  }

  #coursesToHtml() {
    this.#coursesRepository.courses.forEach((course) => {
      const h2Element = document.createElement("h2");
      h2Element.innerText = `Course : ${course.name}`;

      const h3Element = document.createElement("h3");
      h3Element.innerText = "toDo's : ";
      h3Element.className = "toDo";

      const spanElement = document.createElement("span");
      spanElement.className = "toDos";

      // list of toDos:
      const ulElement = document.createElement("ul");
      if (course.toDOs != undefined) {
        course.toDOs.forEach((t) => {
          const liElement = document.createElement("li");
          liElement.innerText = `${t[0]} - ${t[1]}`;
          ulElement.appendChild(liElement);
        });
      }

      spanElement.appendChild(ulElement);

      // time indicator
      const pElement = document.createElement("p");
      pElement.innerText = "Total remaining time on toDos:"; // function needed to count all time
      pElement.id = "timeIndicator";

      // add toDO
      const h3ElementSecond = document.createElement("h3");
      h3ElementSecond.className = "addToDoTitle";
      h3ElementSecond.innerText = "Add ToDo :";

      const spanElementSecond = document.createElement("span");
      spanElementSecond.className = "addToDo";
      // inside the addToDO
      //  title
      const spanTitleEl = document.createElement("span");
      spanTitleEl.className = "title";

      const lblTitleEl = document.createElement("label");
      lblTitleEl.innerText = "Title: ";
      const inputTitleEl = document.createElement("input");
      inputTitleEl.type = "text";
      inputTitleEl.id = "inputTitle";
      inputTitleEl.placeholder = "title";

      spanTitleEl.appendChild(lblTitleEl);
      spanTitleEl.appendChild(inputTitleEl);

      // time
      const spanTimeEl = document.createElement("span");
      spanTimeEl.className = "time";

      const lblTimeEl = document.createElement("label");
      lblTimeEl.innerText = "Time estimation: ";
      const inputTimeEl = document.createElement("input");
      inputTimeEl.type = "time";
      inputTimeEl.id = "inputTime";

      spanTimeEl.appendChild(lblTimeEl);
      spanTimeEl.appendChild(inputTimeEl);

      // urgency
      const spanUrgEl = document.createElement("span");
      spanUrgEl.className = "urgency";

      const lblUrgEl = document.createElement("label");
      lblUrgEl.innerText = "Urgency: ";
      const breakLine = document.createElement("br");

      const inputUrgElOne = document.createElement("input");
      inputUrgElOne.type = "radio";
      inputUrgElOne.name = "option";
      inputUrgElOne.id = "urgencyH";
      inputUrgElOne.value = "high";
      inputUrgElOne.className = "radioB";
      const inputUrgElOneLbl = document.createElement("label");
      inputUrgElOneLbl.innerText = "high";

      const inputUrgElTwo = document.createElement("input");
      inputUrgElTwo.type = "radio";
      inputUrgElTwo.name = "option";
      inputUrgElTwo.id = "urgencyM";
      inputUrgElTwo.value = "medium";
      inputUrgElTwo.className = "radioB";
      const inputUrgElTwoLbl = document.createElement("label");
      inputUrgElTwoLbl.innerText = "medium";

      const inputUrgElThree = document.createElement("input");
      inputUrgElThree.type = "radio";
      inputUrgElThree.name = "option";
      inputUrgElThree.id = "urgencyL";
      inputUrgElThree.value = "low";
      inputUrgElThree.className = "radioB";
      const inputUrgElThreeLbl = document.createElement("label");
      inputUrgElThreeLbl.innerText = "low";

      spanUrgEl.appendChild(lblUrgEl);
      spanUrgEl.appendChild(breakLine);
      spanUrgEl.appendChild(inputUrgElOne);
      spanUrgEl.appendChild(inputUrgElOneLbl);
      spanUrgEl.appendChild(inputUrgElTwo);
      spanUrgEl.appendChild(inputUrgElTwoLbl);
      spanUrgEl.appendChild(inputUrgElThree);
      spanUrgEl.appendChild(inputUrgElThreeLbl);

      // all spans to span
      spanElementSecond.appendChild(spanTitleEl);
      spanElementSecond.appendChild(spanTimeEl);
      spanElementSecond.appendChild(spanUrgEl);

      // button add toDo
      const btnElement = document.createElement("button");
      btnElement.innerText = "Add ToDO";
      btnElement.id = "addToDo";

      // add all to div
      const divCourse = document.createElement("div");
      if (this.#coursesRepository.courses.indexOf(course) % 2 === 0) {
        divCourse.id = "courseEven";
      } else {
        divCourse.id = "courseOdd";
      }

      divCourse.appendChild(h2Element);
      divCourse.appendChild(h3Element);
      divCourse.appendChild(spanElement);
      divCourse.appendChild(pElement);
      divCourse.appendChild(h3ElementSecond);
      divCourse.appendChild(spanElementSecond);
      divCourse.appendChild(btnElement);

      // parent div
      const divParentEl = document.getElementById("courseId");
      divParentEl.appendChild(divCourse);
    });
  }

  // help method
  #printCoursesConsole() {
    console.log(this.#coursesRepository.courses);
  }
}
