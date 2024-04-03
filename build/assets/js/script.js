const ul = document.querySelector("ul");
const input = document.getElementById("taskInput");
let itemsArray = JSON.parse(localStorage.getItem("items")) || [];

itemsArray.forEach(addTask);

function addTask(text) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const p = document.createElement("p");
  const textNode = document.createTextNode(text);
  const deleteBtn = document.createElement("button");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", function () {
    const taskText =
      this.parentElement.parentElement.querySelector("p").textContent;
    const index = itemsArray.indexOf(taskText);
    if (index !== -1) {
      itemsArray.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(itemsArray));
      this.parentElement.parentElement.remove();
    }
  });

  checkBox.addEventListener("change", function () {
    const p = this.parentElement.querySelector("p");
    p.style.textDecoration = this.checked ? "line-through" : "none";
    p.classList.toggle("text-emerald-500", this.checked);
  });

  p.appendChild(textNode);
  div.appendChild(deleteBtn);
  div.appendChild(checkBox);
  li.appendChild(p);
  li.appendChild(div);
  ul.appendChild(li);
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
