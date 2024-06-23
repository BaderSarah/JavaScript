import CoursesRepository from "./CoursesRepository.js";

export default class CoursesComponent {
  #names = [];
  #storage;
  #coursesRepository;
  #courses = [];

  constructor() {
    this.#coursesRepository = new CoursesRepository();
    this.#storage = window.localStorage;
    this.#loadNamesFromStorage();
    this.#loadCoursesFromStorage();

    this.#printCoursesConsole();
    this.#toHtml();

    document.getElementById("add").onclick = () => {
      document.getElementById("error").innerText = "";
      const name = document.getElementById("inputName").value.trim();
      if (
        name === "" ||
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
      this.#toHtml();
      document.getElementById("inputName").value = "";
    };
  }

  #addNameCourse(name) {
    this.#names.push(name);
    this.#setNamesInStorage();
  }

  #toHtml() {
    const divAddCourse = document.getElementById("courseId");
    divAddCourse.innerHTML = "";

    this.#coursesToHtml();
  }

  #setNamesInStorage() {
    this.#storage.setItem("namesCourses", JSON.stringify(this.#names));
  }

  #setCoursesInStorage() {
    // const coursesJSON = this.#coursesRepository.giveCoursesJSON();
    // if (coursesJSON != null) {
    //   this.#storage.setItem("courses", JSON.stringify(coursesJSON));
    // }

    const coursesJSON = this.#coursesRepository.giveCoursesJSON();
    if (coursesJSON != null) {
      this.#storage.setItem("courses", JSON.stringify(coursesJSON));
    }
  }

  #loadCoursesFromStorage() {
    if (this.#storage.getItem("courses")) {
      this.#courses = JSON.parse(this.#storage.getItem("courses"));
      this.#courses.forEach((c) => {
        this.#coursesRepository.addExistingCourse(c);
      });
    }
  }

  #loadNamesFromStorage() {
    if (this.#storage.getItem("namesCourses")) {
      this.#names = JSON.parse(this.#storage.getItem("namesCourses"));
    }
  }

  #coursesToHtml() {
    this.#coursesRepository.courses.forEach((course) => {
      const h2Element = document.createElement("h2");
      h2Element.innerText = `Course: ${course.name}`;

      const h3Element = document.createElement("h3");
      h3Element.innerText = "toDo's:";
      h3Element.className = "toDo";

      const spanElement = document.createElement("span");
      spanElement.className = "toDos";

      const ulElement = document.createElement("ul");
      if (course.toDOs) {
        course.toDOs.forEach((t) => {
          const liElement = document.createElement("li");
          liElement.innerText = `${t.title} - ${t.time}`;
          ulElement.appendChild(liElement);
        });
      }

      spanElement.appendChild(ulElement);

      const pElement = document.createElement("p");
      pElement.innerText = "Total remaining time on toDos:"; // function needed to count all time
      pElement.id = "timeIndicator";

      const h3ElementSecond = document.createElement("h3");
      h3ElementSecond.className = "addToDoTitle";
      h3ElementSecond.innerText = "Add ToDo:";

      const spanElementSecond = document.createElement("span");
      spanElementSecond.className = "addToDo";

      const spanTitleEl = document.createElement("span");
      spanTitleEl.className = "title";

      const lblTitleEl = document.createElement("label");
      lblTitleEl.innerText = "Title: ";
      const inputTitleEl = document.createElement("input");
      inputTitleEl.type = "text";
      // inputTitleEl.id = `inputTitle_${course.name}`;
      inputTitleEl.id = `inputTitle`;
      inputTitleEl.placeholder = "title";

      spanTitleEl.appendChild(lblTitleEl);
      spanTitleEl.appendChild(inputTitleEl);

      const spanTimeEl = document.createElement("span");
      spanTimeEl.className = "time";

      const lblTimeEl = document.createElement("label");
      lblTimeEl.innerText = "Time estimation: ";
      const inputTimeEl = document.createElement("input");
      inputTimeEl.type = "time";
      // inputTimeEl.id = `inputTime_${course.name}`;
      inputTimeEl.id = `inputTime`;

      spanTimeEl.appendChild(lblTimeEl);
      spanTimeEl.appendChild(inputTimeEl);

      const spanUrgEl = document.createElement("span");
      spanUrgEl.className = "urgency";

      const lblUrgEl = document.createElement("label");
      lblUrgEl.innerText = "Urgency: ";
      const breakLine = document.createElement("br");

      const inputUrgElOne = document.createElement("input");
      inputUrgElOne.type = "radio";
      inputUrgElOne.name = `option`;
      inputUrgElOne.id = `urgency`;
      inputUrgElOne.value = "high";
      inputUrgElOne.className = "radioB";
      const inputUrgElOneLbl = document.createElement("label");
      inputUrgElOneLbl.innerText = "high";

      const inputUrgElTwo = document.createElement("input");
      inputUrgElTwo.type = "radio";
      inputUrgElTwo.name = `option`;
      inputUrgElTwo.id = `urgency`;
      inputUrgElTwo.value = "medium";
      inputUrgElTwo.className = "radioB";
      const inputUrgElTwoLbl = document.createElement("label");
      inputUrgElTwoLbl.innerText = "medium";

      const inputUrgElThree = document.createElement("input");
      inputUrgElThree.type = "radio";
      // inputUrgElThree.name = `option_${course.name}`;
      // inputUrgElThree.id = `urgencyL_${course.name}`;
      inputUrgElThree.name = `option`;
      inputUrgElThree.id = `urgency`;
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

      spanElementSecond.appendChild(spanTitleEl);
      spanElementSecond.appendChild(spanTimeEl);
      spanElementSecond.appendChild(spanUrgEl);

      const btnElement = document.createElement("button");
      btnElement.innerText = "Add ToDO";
      btnElement.id = "addToDo"; 
     // btnElement.id = `addToDo_${course.name}`;

     btnElement.onclick = () => {
      // const title = document.getElementById(`inputTitle_${course.name}`).value; // .trim()
      // const time = document.getElementById(`inputTime_${course.name}`).value;
      // const urgency = document.querySelector(`input[name="option_${course.name}"]:checked`).value;
      const title = document.getElementById(`inputTitle`).value; 
      const time = document.getElementById(`inputTime`).value;
      const urgency = document.getElementById(`urgency`).value;

      if (true) { //  title && time && urgency
        this.#coursesRepository.addToDoToCourse(course.name, title, time, "medium"); 
        this.#setCoursesInStorage();
        this.#toHtml();
      }
      };

      const divCourse = document.createElement("div");
      divCourse.className = this.#coursesRepository.courses.indexOf(course) % 2 === 0 ? "courseEven" : "courseOdd";

      divCourse.appendChild(h2Element);
      divCourse.appendChild(h3Element);
      divCourse.appendChild(spanElement);
      divCourse.appendChild(pElement);
      divCourse.appendChild(h3ElementSecond);
      divCourse.appendChild(spanElementSecond);
      divCourse.appendChild(btnElement);

      const divParentEl = document.getElementById("courseId");
      divParentEl.appendChild(divCourse);
    });
  }

  #printCoursesConsole() {
    console.log(this.#coursesRepository.courses);
  }
}
