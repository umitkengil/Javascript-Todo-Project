//Elementleri tanımla

const form = document.querySelector("#todo-form");
const inputTodo = document.querySelector("#todo");
const listTodo = document.querySelector(".list-group");
const cardFooter1 = document.querySelectorAll(".card-footer")[0];
const cardFooter2 = document.querySelectorAll(".card-footer")[1];
const removeButton = document.querySelectorAll(".card-body")[1];
const clearTodos = document.querySelector("#clear-todos");

eventListener();

function eventListener() {
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",getAllTodoStorage);
    removeButton.addEventListener("click",deleteTodo);
    clearTodos.addEventListener("click",allDeleteTodos);
}

function addTodo(e){
   const newTodo = inputTodo.value.trim();
   if(newTodo===""){
       showInfos("danger","TODO ekleme alanı boş bırakılamaz");
   }
   else{
       addTodoList(newTodo);
       setStorage(newTodo);
       showInfos1("success",`[${newTodo}] TODO'su Başarıyla Eklendi`)
   }
   e.preventDefault();
}

function showInfos1(type, message){
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    alert.style="margin:3px 5px;text-align:center;font-size:1.2em;background-color:#00ff99;color:#0080ff;";
    // #33ccff;
    cardFooter1.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 1300);
}

function showInfos2(type, message){
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    alert.style="margin:3px 5px;text-align:center;font-size:1.2em;background-color:bisque;";

    cardFooter2.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 1300);
}

function addTodoList(todo){
    //  <li class="list-group-item d-flex justify-content-between list-group-item-action">
    //     Todo 1
    //     <a href = "#" class ="delete-item">
    //         <i class = "fa fa-remove"></i>
    //     </a>
    // </li>

    const list = document.createElement("li");
    list.className = "list-group-item d-flex justify-content-between list-group-item-action";

    const link = document.createElement("a");
    link.href="#";
    link.className = "delete-item";

    const i = document.createElement("i");
    i.className="fa fa-remove";

    link.appendChild(i);
    list.appendChild(document.createTextNode(todo));
    list.appendChild(link);
    listTodo.appendChild(list);

    inputTodo.value="";
}

function getStorage() {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
       todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function setStorage(todo){
    let todos = getStorage();
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getAllTodoStorage(){
    let todos=getStorage();
    todos.forEach(function(item){
        addTodoList(item);
    });
}

function deleteTodo(e){
    if(e.target.className==="fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteStorage(e.target.parentElement.parentElement.textContent);
        showInfos2("success",`[${e.target.parentElement.parentElement.textContent}] kaldırıldı`)
    }
}

function deleteStorage(todo){
    let todos = getStorage();
    todos.forEach(function(value,key){
        if(value===todo){
            todos.splice(key,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function confirmAlert(){
    confirm("Tüm TODO'ları Silmek İstediğinize Emin Misiniz?")
}

function allDeleteTodos(){
    if(confirmAlert()){
       listTodo.innerHTML="";
    }
    localStorage.removeItem("todos");
}
