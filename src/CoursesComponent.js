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
        this.#coursesRepository.addCourse(name);
      }
      document.getElementById("inputName").value = "";
      console.log(this.#names);
      this.#toHtml();
    };
    this.#toHtml();
  }

  #addNameCourse(name) {
    this.#names.push(name);
    this.#setNamesInStorage();
  }

  #toHtml() {
    this.#coursesToHtml();
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

  #coursesToHtml() {
    // parent div
    const divAddCourse = document.getElementById("addCourseId");

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
      course.toDOs.forEach((t) => {
        const liElement = document.createElement("li");
        liElement.innerText = `${t[0]} - ${t[1]}`;
        ulElement.appendChild(liElement);
      });

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
