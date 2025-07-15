let tasks = [];

function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  const taskTime = document.getElementById("taskTime").value;
  if (taskText === "") return;

  tasks.push({ text: taskText, time: taskTime, completed: false });
  document.getElementById("taskInput").value = "";
  document.getElementById("taskTime").value = "";
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const text = document.createElement("div");
    text.textContent = task.text;

    const time = document.createElement("div");
    time.className = "task-time";
    time.textContent = task.time ? `Due: ${new Date(task.time).toLocaleString()}` : "";

    taskInfo.appendChild(text);
    taskInfo.appendChild(time);

    const controls = document.createElement("div");
    controls.className = "task-controls";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "✔";
    completeBtn.onclick = () => toggleComplete(index);

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏";
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.onclick = () => deleteTask(index);

    controls.appendChild(completeBtn);
    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(controls);
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}
