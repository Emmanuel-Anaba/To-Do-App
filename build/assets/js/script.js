const ul = document.querySelector("ul");
const input = document.getElementById("taskInput");
const itemsArray = JSON.parse(localStorage.getItem("items")) || [];

itemsArray.forEach(addTask);

function addTask(text) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const deleteBtn = document.createElement("button");
  const checkBox = document.createElement("input");

  checkBox.type = "checkbox";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", toggleTask);

  p.appendChild(document.createTextNode(text));
  div.append(deleteBtn, checkBox);
  li.append(p, div);
  ul.appendChild(li);
}

function deleteTask() {
  const taskText =
    this.parentElement.parentElement.querySelector("p").textContent;
  const index = itemsArray.indexOf(taskText);
  if (index !== -1) {
    itemsArray.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    this.parentElement.parentElement.remove();
  }
}

function toggleTask() {
  const p = this.parentElement.parentElement.querySelector("p");
  p.style.textDecoration = this.checked ? "line-through" : "none";
  p.classList.toggle("text-emerald-500");
}

function add() {
  const taskText = input.value.trim();
  if (taskText !== "") {
    itemsArray.push(taskText);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    addTask(taskText);
    input.value = "";
  } else {
    alert("Write something!");
  }
}
