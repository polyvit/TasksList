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
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elements
  const listContainer = document.querySelector(".list-group");
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];

  // Events
  form.addEventListener("submit", onSubmitHandler);

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

  // Functions
  listContainer.innerHTML = "";
  renderAllTasks(objOfTasks);
  function renderAllTasks(tasksList) {
    if (!tasksList) return;

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = renderOneLi(task);
      fragment.append(li);
    });
    listContainer.append(fragment);
  }

  function renderOneLi({ title, body }) {
    let li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap"
    );
    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";
    const button = document.createElement("button");
    button.textContent = "Удалить";
    button.classList.add("btn", "btn-danger", "delete-btn");
    button.setAttribute("style", "margin-left: auto !important");
    const p = document.createElement("p");
    p.classList.add("mt-2", "w-100");
    p.textContent = body;

    li.append(span);
    li.append(button);
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
})(tasks);
