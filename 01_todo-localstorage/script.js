document.addEventListener('DOMContentLoaded',() => {
  const todoInput = document.getElementById("todo-input")//first step is whatever elements you have , just grab them
const addTaskButton = document.getElementById("add-task-btn")//first step is whatever elements you have , just grab them
const todoList = document.getElementById("todo-list")//first step is whatever elements you have , just grab them

let tasks = JSON.parse(localStorage.getItem('tasks')) || [] //JSON.parse Converts string → JavaScript object/array. //getItem wala line agar local storage mei kuch hai to lekr ayega

tasks.forEach(task => renderTasks(task));//loopo through every saved tasks and display each one on the screen.even when the page reloads -> tasks are still visible

addTaskButton.addEventListener("click", () => {//add event listener click feature dilane ke liye
  const taskText = todoInput.value.trim()//value is the text entered by the user
  if(taskText == "") return;

  const newTask = {
    id:Date.now(),//Date.now to create unique ids
    text: taskText,
    completed: false
  }
  tasks.push(newTask)//tasks is the array in which we are pushing
  saveTasks()//saving the tasks to local storage . to call the function saveTasks()
  renderTasks(newTask)
  todoInput.value = ""//this clears the input again
  console.log(tasks); 
})

function renderTasks(task){//pick up the task from local storage. renderTask real job is to take one task object and show it on the screen.render is just a fancy word programmers use to display items from DOM
   const li = document.createElement('li')//we are creating li over here bcuz in html he did so we can add
   li.setAttribute('data-id',task.id)
   if(task.completed) li.classList.add('completed')//html ka class list mei completed add krdega
   li.innerHTML = `
   <span>${task.text}</span>    
   <button>delete</button>`
   li.addEventListener('click',(e) => {// e event h .jahan click kr rhe ho wo e ban ja rha
    if(e.target.tagName === 'BUTTON') return //elements ko tagName bolte. button mtlb delete button. ismei linethrough ni hoga bcz delete krne se to element he udd ja rha lol
    task.completed = !task.completed //it makes true to false and false to true
    li.classList.toggle('completed')// ek aur bar click kroge to linethrough hat jayega . ye functionality completed diya hai to issile completed likh rhe double quotes mei 
    saveTasks()
  })
  //delete logic
li.querySelector('button').addEventListener('click',(e) => {
    
  e.stopPropagation() //prevent toggle from firing.jo yahan hoga wo dusro mei reflect ni hoga . like delete ke ass pass bhi dabane se kabhi kabhi reciprocate. if stop propagation use ni kiye to delete jo li ke andar hai ,delete dabane se line through wala function activate ho jayega(completed class)
    tasks = tasks.filter(t => t.id != task.id)//sirf wahii id delete hoga delete dabane se. filter usse hatayega jo satisfy ni krega
   
    li.remove() 
    saveTasks()
  })
   todoList.appendChild(li) // add krdega li ko ul ke andar. todoList id hai ul ka
}
function saveTasks(){//this function add stuff in local storage
  localStorage.setItem('tasks',JSON.stringify(tasks))//local storage is the keyword. JSON.springify because local storage only stores strings. so the objects must be converted
}
})