// suppose when we click add task but it is not ready due to some issue of server ,so what we have to do is we have to add event listener called domcontent loaded when it finishes dom loading then all things can work like getting element from document so we have to wrap under addeventlistener 

document.addEventListener('DOMContentLoaded',()=>
{
// grabbing the elemnts by their ids 

const todoInput=document.getElementById("todo-input");

const addTaskButton=document.getElementById("add-task-btn");

const todoList=document.getElementById("todo-list");


//using parse method to get convert string to array when getting it from localstorage and tasks are initialzed as empty when there is nothing in localstorage


let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

//if there is something to display just go ahead and display

tasks.forEach((task) => renderTask(task));

// here we added stuff into the array 
addTaskButton.addEventListener("click",() =>
{
  const taskText=todoInput.value.trim();

  if(taskText==="") return;

  const newTask={
    id: Date.now(),
    text: taskText,
    completed:false,
  };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  todoInput.value=""; //clear input
  console.log(tasks);
  
});


// after grabbing the things from localstorage to array task that we have declared at the very first we want to render 

function renderTask(task)
{
  const li=document.createElement("li");
  li.setAttribute("data-id",task.id);

  if(task.completed) li.classList.add("completed");
  li.innerHTML=`<span>${task.text}</span>
  <button>delete</button>`;

  li.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON') return;
    task.completed=!task.completed
    li.classList.toggle('completed')
    saveTasks();
  })


  //we want to grab that ids which are not to be deleted so we filter out ids that we wont want to delete except that one we want to delete
 li.querySelector('button').addEventListener('click', (e) => {
  e.stopPropagation()
  tasks=tasks.filter(t => t.id !==task.id ) //if we === then it will remove things except that we want ...also remember t will contain those task ids that we dont want to delete or the its that ids which are not equal to target id
  li.remove();
  saveTasks();
 })

  todoList.appendChild(li);
}
// saving things in above array have to save in localstorage which gives us api

function saveTasks()
{
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
})