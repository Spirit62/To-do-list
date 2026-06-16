const todolist= JSON.parse(localStorage.getItem('todolist'))||[];

displaytoDO();
document.querySelector('.js-add-btn').addEventListener('click',()=>{
  addtoDo();
  displaytoDO();
})
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
    <button class="del-btn js-del-btn">Delete</button>`
    todolistHTML+= html;
  })
  
  document.querySelector('.js-todo-container')
    .innerHTML=todolistHTML;
  document.querySelectorAll('.js-del-btn')
    .forEach((deletebutton,index)=>{
      deletebutton.addEventListener('click',()=>{
        todolist.splice(index,1);
        localStorage.setItem('todolist', JSON.stringify(todolist));
        displaytoDO();
      })
    });
  }
function enter(event){
  if (event.key==='Enter'){
    addtoDo(); displaytoDO()
  }
}