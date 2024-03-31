const ul = document.querySelector("ul");
const input = document.getElementById("taskInput");
let itemsArray = JSON.parse(localStorage.getItem("items")) || [];

itemsArray.forEach(addTask);

function addRemoveBtn(list) {
  let span = document.createElement("span");
  let deleteBtn = document.createElement("button");
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    let div = deleteBtn.parentElement.parentElement.textContent;
    let i = itemsArray.indexOf(div.slice(0, div.length - 6));
    deleteBtn.parentElement.parentElement.style.display = "none";
    itemsArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
  });
  checkBox.addEventListener("change", function () {
    let div = checkBox.parentElement.parentElement;
    if (this.checked) {
      div.firstChild.style.textDecoration = "line-through";
      div.firstChild.classList.add("text-emerald-500");
    } else {
      div.firstChild.style.textDecoration = "none";
      div.firstChild.classList.remove("text-emerald-500");
    }
  });
  span.appendChild(deleteBtn);
  span.appendChild(checkBox);
  list.appendChild(span);
}

function addTask(text) {
  const li = document.createElement("li");
  let p = document.createElement("p");
  let s = document.createTextNode(text);
  p.appendChild(s);
  li.appendChild(p);
  ul.appendChild(li);
  addRemoveBtn(li);
}

function add() {
  if (input.value !== "") {
    itemsArray.push(input.value);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    addTask(input.value);
    input.value = "";
  } else {
    alert("Write something!");
  }
}
