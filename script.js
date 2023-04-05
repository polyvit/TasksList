const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  // Data
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});
  const themes = {
    default: {
      "--base-text-color": "#212529",
      "--header-bg": "#007bff",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#007bff",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#0069d9",
      "--default-btn-border-color": "#0069d9",
      "--danger-btn-bg": "#dc3545",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#bd2130",
      "--danger-btn-border-color": "#dc3545",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#80bdff",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
    },
    dark: {
      "--base-text-color": "#212529",
      "--header-bg": "#343a40",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#58616b",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#292d31",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#b52d3a",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#88222c",
      "--danger-btn-border-color": "#88222c",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    },
    light: {
      "--base-text-color": "#212529",
      "--header-bg": "#fff",
      "--header-text-color": "#212529",
      "--default-btn-bg": "#fff",
      "--default-btn-text-color": "#212529",
      "--default-btn-hover-bg": "#e8e7e7",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#f1b5bb",
      "--danger-btn-text-color": "#212529",
      "--danger-btn-hover-bg": "#ef808a",
      "--danger-btn-border-color": "#e2818a",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    },
  };

  // Elements
  const listContainer = document.querySelector(".list-group");
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  const themeSelect = document.querySelector("#themeSelect");
  const noTasksSection = document.querySelector(".notion");

  // Events
  form.addEventListener("submit", onSubmitHandler);
  listContainer.addEventListener("click", deleteTask);
  listContainer.addEventListener("click", completeTask);
  themeSelect.addEventListener("change", changeTheme);

  // Handlers
  function onSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert("Форма пустая");
      return;
    }

    const task = createNewObjTask(titleValue, bodyValue);
    const li = renderOneLi(task);
    listContainer.insertAdjacentElement("afterbegin", li);
    form.reset();
  }
  function deleteTask({ target }) {
    if (target.classList.contains("delete-btn")) {
      const task = target.closest("[data-task-id]");
      const id = task.dataset.taskId;
      const confirmed = deleteObjTask(id);
      if (confirmed) task.remove();
      if (Object.keys(objOfTasks).length == 0) {
        noTasksSection.classList.remove("d-none");
      }
    }
  }
  function completeTask({ target }) {
    if (target.classList.contains("complete-btn")) {
      const task = target.closest("[data-task-id]");
      const id = task.dataset.taskId;
      objOfTasks[id].completed = false;
      task.classList.add("completed-task");
    }
  }

  // Functions
  listContainer.innerHTML = "";
  renderAllTasks(objOfTasks);
  setTheme(localStorage.getItem("app_theme"));
  themeSelect.value = localStorage.getItem("app_theme");
  function renderAllTasks(tasksList) {
    if (!tasksList) return;

    if (Object.keys(tasksList).length >= 1) {
      noTasksSection.classList.add("d-none");
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = renderOneLi(task);
      fragment.append(li);
    });
    listContainer.append(fragment);
  }

  function renderOneLi({ _id, title, body }) {
    let li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap"
    );
    li.setAttribute("data-task-id", _id);
    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.classList.add("btn", "btn-danger", "delete-btn", "ms-auto");
    const completeButton = document.createElement("button");
    completeButton.textContent = "Выполнено";
    completeButton.classList.add("btn", "btn-primary", "complete-btn", "ms-2");
    const p = document.createElement("p");
    p.classList.add("mt-2", "w-100");
    p.textContent = body;

    li.append(span);
    li.append(deleteButton);
    li.append(completeButton);
    li.append(p);
    return li;
  }

  function createNewObjTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `${Date.now()}`,
    };
    objOfTasks[newTask._id] = newTask;
    return { ...newTask };
  }

  function deleteObjTask(id) {
    const isConfirm = confirm("Вы точно хотите удалить эту задачу?");
    if (!isConfirm) return;
    delete objOfTasks[id];
    return isConfirm;
  }

  function changeTheme(e) {
    const selectedTheme = themeSelect.value;
    setTheme(selectedTheme);
    localStorage.setItem("app_theme", selectedTheme);
  }
  function setTheme(theme) {
    const settings = themes[theme];
    Object.entries(settings).forEach(([prop, value]) => {
      document.documentElement.style.setProperty(prop, value);
    });
  }
})(tasks);
