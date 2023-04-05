/*planning:
 - i need to create a new ul with java 
 - the ul will contain the array items that will be added
 - when adding a task it will save to localStorage.tasks = [] 
 - it will be task.push(this.innerText) i think?
  - i need to add buttons with two different classes (remove and done) in the list
 */

const addButton = document.getElementById("addNewTaskButton");
const taskList = document.getElementById("addedTask");

addButton.addEventListener("click", addNewTask);

function addNewTask() {
  if (localStorage.newTask === undefined) {
    localStorage.newTask = JSON.stringify([]);
  }
  let tasksArray = JSON.parse(localStorage.newTask);

  const newTaskElement = document.getElementById("addNewTask");
  const newTask = newTaskElement.value;
  if (newTask.length > 0) {
    tasksArray.unshift(newTask);
    localStorage.newTask = JSON.stringify(tasksArray);
    showTasks();
    newTaskElement.value = ""; //doesnt work with keyword newTask
  }
}

function showTasks() {
  if (localStorage.newTask !== undefined) {
    let tasksArray = JSON.parse(localStorage.newTask);

    addedTask.innerText = "";
    for (let task of tasksArray) {
      //make the task appear:
      const addedTask = document.createElement("li");
      const buttonsDiv = document.createElement("div");
      addedTask.innerText = task;

      addedTask.style.display = "flex";
      addedTask.style.justifyContent = "space-between";

      // the task's delete button:
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.innerText = "-";
      deleteButton.addEventListener("click", function () {
        deleteTask(task);
      });
      // the task's "done" button:
      const doneButton = document.createElement("button");
      doneButton.classList.add("done");
      doneButton.innerText = "Done";
      doneButton.addEventListener("click", function () {
        addedTask.style.color = "rgb(68, 81, 93)";
        addedTask.style.fontWeight = "bold";
        //done task move to the bottom?
        doneButton.remove();
        moveToBottom(task);
      });

      //fix layout
      buttonsDiv.appendChild(deleteButton);
      buttonsDiv.appendChild(doneButton);
      addedTask.appendChild(buttonsDiv);
      taskList.appendChild(addedTask);
    }
  }
}

function deleteTask(task) {
  //i need to delete it from the array
  let tasksArray = JSON.parse(localStorage.getItem("newTask"));
  const index = tasksArray.indexOf(task);
  tasksArray.splice(index, 1);
  localStorage.setItem("newTask", JSON.stringify(tasksArray));

  // delete it from the list
  const taskElement = taskList.children[index];
  taskList.removeChild(taskElement);
}

function moveToBottom(task) {
  //i need to delete it from the array and then add it again at the bottom
  let tasksArray = JSON.parse(localStorage.getItem("newTask"));
  const index = tasksArray.indexOf(task);

  tasksArray.splice(index, 1);
  tasksArray.push(task);
  localStorage.setItem("newTask", JSON.stringify(tasksArray));

  // delete it from the list and then place again at the bottom
  const taskElement = taskList.children[index];
  taskList.removeChild(taskElement);
  taskList.appendChild(taskElement);
}

showTasks();
