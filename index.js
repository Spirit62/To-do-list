const todolist= JSON.parse(localStorage.getItem('todolist'))||[];

displaytoDO();

function addtoDo(){

  const inputElement = document.querySelector('.js-name-input')

  const name= inputElement.value

  const dateinputElement = document.querySelector('.js-date-input');

  const dueDate = dateinputElement.value || 'Date not Entered';

  if (name.trim() === '') return;

  todolist.push({name, dueDate});

  localStorage.setItem('todolist',JSON.stringify(todolist));
  
  inputElement.value='';
  displaytoDO();
}

function displaytoDO(){
  let todolistHTML='';
  todolist.forEach((todoObject,index)=>{
    const {name, dueDate}=todoObject;
    const html =
    `
    <div>
    ${index+1}.
    </div>
    <div>
      ${name}
    </div>
    <div>
      ${dueDate}
    </div>
    <button onclick="
    todolist.splice(${index},1);
    localStorage.setItem('todolist', JSON.stringify(todolist));
    displaytoDO();"class="del-btn">Delete</button>`
    todolistHTML+= html;
  })
  
  document.querySelector('.js-todo-container')
    .innerHTML=todolistHTML;
  }
function enter(event){
  if (event.key==='Enter'){
    addtoDo(); displaytoDO()
  }
}