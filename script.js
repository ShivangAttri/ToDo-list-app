const input = document.querySelector('#task-input');
const addButton = document.querySelector('#add-task-btn');
const taskList = document.querySelector('#task-list');

loadTasks();

addButton.addEventListener("click", addTask);

input.addEventListener("keypress", function(e){
if(e.key === "Enter"){
addTask();
}
});

function addTask(){

let taskText = input.value;

if(taskText === ''){
alert("Please enter a task");
return;
}

createTask(taskText);

input.value = "";

saveTasks();
}

function createTask(taskText){

let li = document.createElement("li");

let span = document.createElement("span");
span.innerText = taskText;

li.appendChild(span);

let btnContainer = document.createElement("div");
btnContainer.classList.add("btn-container");

let completeBtn = document.createElement("button");
completeBtn.innerText = "Done";
completeBtn.classList.add("complete-btn");

let deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete";
deleteBtn.classList.add("delete-btn");

btnContainer.appendChild(completeBtn);
btnContainer.appendChild(deleteBtn);

li.appendChild(btnContainer);

taskList.appendChild(li);

completeBtn.addEventListener("click",function(){
li.classList.toggle("completed");
saveTasks();
});

deleteBtn.addEventListener("click",function(){
li.remove();
saveTasks();
});
}

function saveTasks(){
localStorage.setItem("tasks",taskList.innerHTML);
}

function loadTasks(){

let savedTasks = localStorage.getItem("tasks");

if(savedTasks){
taskList.innerHTML = savedTasks;

document.querySelectorAll(".delete-btn").forEach(btn=>{
btn.addEventListener("click",function(){
btn.parentElement.parentElement.remove();
saveTasks();
});
});

document.querySelectorAll(".complete-btn").forEach(btn=>{
btn.addEventListener("click",function(){
btn.parentElement.parentElement.classList.toggle("completed");
saveTasks();
});
});
}
}