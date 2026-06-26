
let listTitles=JSON.parse(localStorage.getItem('listTitles'))||[];
let activeListIndex=0;
displaytoDO();
displayListTitles();
document.querySelector('.js-add-btn').addEventListener('click',()=>{
  addtoDo();
})
function addtoDo(){
if (listTitles.length === 0) return;
  const inputElement = document.querySelector('.js-name-input')

  const name= inputElement.value

  const dateinputElement = document.querySelector('.js-date-input');

  const dueDate = dateinputElement.value || 'Date not Entered';

  if (name.trim() === '') return;

  listTitles[activeListIndex].todolist.push({name, dueDate});

  saveToStorage();
  
  inputElement.value='';
  displaytoDO();
}

function displaytoDO(){
  if(listTitles.length<1){
    document.querySelector('.js-main-list')
      .classList.add('noShow')
    return;
  }
  else {
    document.querySelector('.js-main-list').classList.remove('noShow');
  }

  let todolistHTML='';
    listTitles[activeListIndex].todolist.forEach((todoObject,index)=>{
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
        listTitles[activeListIndex].todolist.splice(index, 1);
        saveToStorage();
        displaytoDO();
      })
    });
  }
function enter(event){
  if (event.key==='Enter'){
    addtoDo(); 
  }
}

const createBtn = document.querySelector('.js-create');
const listNameInput = document.querySelector('.js-list-name');
const saveBtn = document.querySelector('.js-save');
let listHTML='';
createBtn
  .addEventListener('click',()=>
  {
    document.querySelector('.js-create-container')
      .classList.add('create-clicked')
  })

  saveBtn
    .addEventListener('click',()=>
    {
    newList();
    })
  

function saveToStorage(){
  localStorage.setItem('listTitles', JSON.stringify(listTitles));
}
function displayListTitles() {
  let listHTML = ''; 
  
  listTitles.forEach((listTitle,index) => {
    listHTML += `
    <div class="name ${index === activeListIndex ? 'active-list' : ''}">
      <span>${listTitle.name}</span>
      <button class="list-del-btn js-list-del-btn">x</button>
    </div>
`;
  });
  document.querySelector('.js-names').innerHTML = listHTML;
  document.querySelectorAll('.name')
    .forEach((name,index)=>{
      name.addEventListener('click',()=>
      {
        activeListIndex=index;
        displayListTitles();
        displaytoDO();
      })
    })

  document.querySelectorAll('.js-list-del-btn').forEach((btn, index) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation(); 
      askDelete(index);
    })
  })

}
function newList(){
      const trimmedValue = listNameInput.value.trim();
      if (trimmedValue){
        document.querySelector('.js-create-container')
          .classList.remove('create-clicked')
        listNameInput.value='';
        listTitles.push({
          name: trimmedValue,
          todolist: []
        });
        saveToStorage();
        displayListTitles();
        displaytoDO();
      }
    }

    listNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    newList();
  }
});


function askDelete(index) {
  const warningBox = document.querySelector('.js-delete-warning');
  
  warningBox.innerHTML = `<p class="delete-warning-message">Are you sure you want to delete ${listTitles[index].name}?</p> 
  <button class="delete-confirm">Confirm</button> 
  <button class="delete-cancel">Cancel</button>`;
  
  warningBox.classList.add('active-delete-warning');

  warningBox.querySelector('.delete-confirm').addEventListener('click', () => {
    listTitles.splice(index, 1);
    activeListIndex = 0; 
    saveToStorage();
    displayListTitles();
    displaytoDO();
    warningBox.classList.remove('active-delete-warning');
  });
  warningBox.querySelector('.delete-cancel').addEventListener('click', () => {
    warningBox.classList.remove('active-delete-warning');
  });
}