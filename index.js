const todolist= JSON.parse(localStorage.getItem('todolist'))||[];
displaytoDO();
function addtoDo(){
  const inputElement = document.querySelector('.js-name-input')
  const name= inputElement.value
  const dateinputElement = document.querySelector('.js-date-input');
  const dueDate = dateinputElement.value
  if (name.trim() === '') return;
  todolist.push({name, dueDate});
  localStorage.setItem('todolist',JSON.stringify(todolist));
  inputElement.value='';
}

function displaytoDO(){
  let todolistHTML='';
  for (let i =0; i<todolist.length; i++){
    const todoObject=todolist[i];
    const {name, dueDate}=todoObject;
    const html =
    `
    <div>
    ${i+1}.
    </div>
    <div>
      ${name}
    </div>
    <div>
      ${dueDate}
    </div>
    <button onclick="
    todolist.splice(${i},1);
    localStorage.setItem('todolist', JSON.stringify(todolist));
    displaytoDO();"class="del-btn">Delete</button>`
    todolistHTML+= html;
  }
  document.querySelector('.js-todo-container')
    .innerHTML=todolistHTML;
}
function enter(event){
  if (event.key==='Enter'){
    addtoDo(); displaytoDO()
  }
}