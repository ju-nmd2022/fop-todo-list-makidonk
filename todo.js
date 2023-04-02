/*planning:
 - i need to create a new div with java which will contain an ul
 - the ul will contain the array items that will be added
 - when adding a task it will save to localStorage.tasks = [] 
 - it will be task.push(this.innerText) i think?
 
 */

const addButton = document.getElementById("addNewTaskButton");
const tasksArray = [];

addButton.addEventListener("click", addNewTask);

function addNewTask() {
  if (localStorage.newTask === undefined) {
    localStorage.newTask = JSON.stringify([]);
  }
  let tasksArray = JSON.parse(localStorage.newTask);

  const newTaskElement = document.getElementById("addNewTask");
  const newTask = newTaskElement.value;
  tasksArray.push(newTask);
  console.log(tasksArray);
  localStorage.newTask = JSON.stringify(tasksArray);
  showTasks();
}

function showTasks() {
  if (localStorage.newTask !== undefined) {
    let tasksArray = JSON.parse(localStorage.newTask);

    addedTask.innerText = "";
    for (let task of tasksArray) {
      const addedTask = document.createElement("li");

      addedTask.innerText = task;
      const taskList = document.getElementById("addedTask");
      taskList.appendChild(addedTask);
    }
  }
}

showTasks();
