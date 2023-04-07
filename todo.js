/*planning:
 - i need to create a new ul with java 
 - the ul will contain the array items that will be added
 - when adding a task it will save to localStorage.tasks = [] 
 - it will be task.push(this.innerText) i think?
  - i need to add buttons with two different classes (remove and done) in the list
 */

const addButton = document.getElementById("addNewTaskButton");
const taskList = document.getElementById("addedTask");
const safety = document.getElementsByClassName("safety")[0];
const clearAllButton = document.getElementById("clearAllButton");
const noClear = document.getElementById("noClear");
const yesClear = document.getElementById("yesClear");

//add button or "enter" key to add a task
addButton.addEventListener("click", addNewTask);

const newTaskInput = document.getElementById("addNewTask");
newTaskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addNewTask();
  }
});

if (localStorage.newTask === undefined) {
  localStorage.newTask = JSON.stringify([]);
}
let tasksArray = JSON.parse(localStorage.getItem("newTask"));

function addNewTask() {
  if (localStorage.newTask === undefined) {
    localStorage.newTask = JSON.stringify([]);
  }
  // let tasksArray = JSON.parse(localStorage.newTask);

  const newTaskElement = document.getElementById("addNewTask");
  const newTaskText = newTaskElement.value;
  const newTask = {
    text: newTaskText,
    color: "#ffffff",
    weight: 100,
    done: false,
  };

  if (newTask.text.length > 0) {
    tasksArray.unshift(newTask);
    localStorage.newTask = JSON.stringify(tasksArray);

    showTasks();
    newTaskElement.value = ""; //doesnt work with keyword newTask
  }
}

function showTasks() {
  if (localStorage.newTask !== undefined) {
    // let tasksArray = JSON.parse(localStorage.newTask);

    taskList.innerText = "";
    for (let task of tasksArray) {
      //make the task appear:
      const addedTask = document.createElement("li");
      const buttonsDiv = document.createElement("div");
      buttonsDiv.classList.add("buttonsDiv");

      addedTask.innerText = task.text;

      addedTask.style.color = task.color;
      addedTask.style.fontWeight = task.weight;

      // the task's delete button:
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.innerText = "-";
      deleteButton.addEventListener("click", function () {
        deleteTask(task);
      });
      // the task's "done" button:
      const doneButton = document.createElement("button");
      doneButton.classList.add("doneButton");
      doneButton.innerText = "Done";
      doneButton.addEventListener("click", function () {
        task.color = "rgb(68, 81, 93)";
        task.weight = "bold";
        task.done = true;
        showTasks();
        moveToBottom(task);
      });

      //fix layout
      buttonsDiv.appendChild(deleteButton);
      buttonsDiv.appendChild(doneButton);
      addedTask.appendChild(buttonsDiv);
      taskList.appendChild(addedTask);
      console.log(task.done);
      if (task.done) {
        buttonsDiv.removeChild(doneButton);
      }
    }
  }
}

function deleteTask(task) {
  //i need to delete it from the array
  const index = tasksArray.indexOf(task);

  tasksArray.splice(index, 1);

  localStorage.setItem("newTask", JSON.stringify(tasksArray));

  // delete it from the list
  const taskElement = taskList.children[index];
  taskList.removeChild(taskElement);
}

function moveToBottom(task) {
  const index = tasksArray.indexOf(task);

  tasksArray.splice(index, 1);
  tasksArray.push(task);

  localStorage.setItem("newTask", JSON.stringify(tasksArray));

  // Animating the completed task:

  // these next lines for the animation i have gotten inspiration from ChatGPT 6/4-2023
  const taskElement = taskList.children[index];
  const taskRect = taskElement.getBoundingClientRect(); //here i got the size of the task
  const taskTop = taskRect.top + window.scrollY; //here i calculate where the top of the task's "hitbox" is
  const taskHeight = taskRect.height; // here is just the height if the task's "hitbox"

  const listRect = taskList.getBoundingClientRect(); // same as before but for the whole list
  const listBottom = listRect.top + listRect.height + window.scrollY; // here it calculates where the bottom is (this way is apparently safer than listRact.bottom)
  const distance = listBottom - taskTop; //distance between bottom edge of the list and top edge of task

  taskElement.style.transform = `translateY(${distance}px)`; //the translation to move taskelement the distance calculated before
  taskElement.style.transition = "transform 1s ease-out";
  taskList.style.transform = `translateY(-${taskHeight}px)`;// and the list to move up the height of a task
  taskList.style.transition = "transform 1s ease-out";

  setTimeout(() => {
    taskList.style.transform = "none";
    taskList.style.transition = "none";
    taskList.appendChild(taskElement);
    taskElement.style.transform = "translateY(0)";
    taskElement.style.transition = "none";
    showTasks();
  }, 1000);
}

//clear button
safety.style.display = "none";
clearAllButton.addEventListener("click", () => {
  if (safety.style.display === "none") {
    safety.style.display = "block";
  } else {
    safety.style.display = "none";
  }
});
noClear.addEventListener("click", () => {
  safety.style.display = "none";
});
yesClear.addEventListener("click", () => {
  safety.style.display = "none";
  tasksArray = [];
  showTasks();
});

showTasks();
