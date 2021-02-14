//Elementleri tanımla

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");//ul class seçildi
const filterTodo = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const showAlertsCardFooter = document.querySelector(".card-footer");
const removeButton = document.querySelectorAll(".card-body")[1];

eventListener();

function eventListener()
{
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadTodoUIFromStorage);
    filterTodo.addEventListener("keyup",filterTodos);
    removeButton.addEventListener("click",deleteTodo);
    clearButton.addEventListener("click",clearTodos);
}


function addTodo(e)
{
    const newTodo = todoInput.value.trim();

    if(newTodo==="")
    {
        showAlertInfos("danger","Boş Bırakmayınız");
    }

    else
    {
        addTodoList(newTodo);
        addTodoLocalStorage(newTodo);
        showAlertInfos("success","Todo Başarıyla Eklendi");
    }

    e.preventDefault();
    
}

function showAlertInfos(type,message)
{
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;

    showAlertsCardFooter.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 1500);
}

function addTodoList(newTodo)
{
    //     <li class="list-group-item d-flex justify-content-between list-group-item-action">
    //      Todo 1
    //          <a href = "#" class ="delete-item">
    //              <i class = "fa fa-remove"></i>
    //          </a>
    //      </li>

    const list = document.createElement("li");
    list.className="list-group-item d-flex justify-content-between list-group-item-action";

    const link = document.createElement("a");
    link.className="delete-item";
    link.href="#";

    const i = document.createElement("i");
    i.className="fa fa-remove";

    list.appendChild(document.createTextNode(newTodo));

    link.appendChild(i);
    list.appendChild(link);
    todoList.appendChild(list);

    todoInput.value="";
}

//local storage için key-value olustur ve her yerde kullan (todos->['1','w'])

function getTodoLocalStorage()
{
    let todos;

    if(localStorage.getItem("TODO")===null)
    {
        todos=[];
    }
    else
    {
       todos = JSON.parse(localStorage.getItem("TODO"));
    }

    return todos;
}

function addTodoLocalStorage(newTodo)
{
    let todos = getTodoLocalStorage();
    todos.push(newTodo);

    localStorage.setItem("TODO",JSON.stringify(todos));
}

function loadTodoUIFromStorage()
{
    let todos = getTodoLocalStorage();
    todos.forEach(function(todo){
        addTodoList(todo);
    })
}

function filterTodos(e)
{
  const filterValue = e.target.value.toLowerCase();
  const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(item){
       const text = item.textContent.toLocaleLowerCase();

       if(text.indexOf(filterValue)===-1)
       {
           item.setAttribute("style","display:none !important");
       }
       else
       {
           item.setAttribute("style","display:block");
       }

    });

}

function deleteTodo(e)
{
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromLocalStorage(e.target.parentElement.parentElement.textContent);
        showAlertInfos("success","TODO Başarıyla Silindi");
    }
}

function deleteTodoFromLocalStorage(deleteTodo)
{
    let todos = getTodoLocalStorage();

    todos.forEach(function(todo,index){
        if(todo===deleteTodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("TODO",JSON.stringify(todos));
}

function clearTodos()
{
    if(confirm("Tüm TODO ' ları Silmek İsteğinize Emin Misiniz?"))
    {
        todoList.innerHTML="";
    }

    localStorage.removeItem("TODO");
}