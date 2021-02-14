
//elementleri tanımla

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
//todo eklendiğinde ekrana alert çıkaran ilk card-footer bölümü
const showAlertsCardFooter = document.querySelector(".card-footer");
//todo listteki remove butona tıklanıp silindiğinde gösterilecek alert
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearTodo = document.querySelector("#clear-todos");
const filterTodo = document.querySelector("#filter");


eventListener();

function eventListener()
{
    form.addEventListener("submit",addTodo);
    //storageden todoları almak için --- domcontentloaded sayfa yüklendiğinde direk oluşturur
    document.addEventListener("DOMContentLoaded",tumTodolarıCagir);
    secondCardBody.addEventListener("click",deleteTodo);
    filterTodo.addEventListener("keyup",filterTodos);
    clearTodo.addEventListener("click",tumTodolariSil);
}

function addTodo(e)
{
    const yeniTodo = todoInput.value.trim();

    if(yeniTodo !=="")
    {
        todoListEkle(yeniTodo);
        todoLocalStorageEkle(yeniTodo);
        showAlertInfos("success","Yeni TODO Başarıyla Eklendi");
    }

    else
    {
        showAlertInfos("danger","Boş Bırakmayınız");
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
    }, 1300);
}

function todoListEkle(yeniTodo)
{
    //eklenen todo yu dinamik bir şeklde listeleme

    //     <li class="list-group-item d-flex justify-content-between list-group-item-action">
    //      Todo 1
    //          <a href = "#" class ="delete-item">
    //              <i class = "fa fa-remove"></i>
    //          </a>
    //      </li>

    const listItem = document.createElement("li");
    listItem.className="list-group-item d-flex justify-content-between list-group-item-action";

    const link = document.createElement("a");
    link.href="#";
    link.className="delete-item";

    const i = document.createElement("i");
    i.className="fa fa-remove";

    link.appendChild(i);

    listItem.appendChild(document.createTextNode(yeniTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value="";
}

function getTodoLocalStorage()
{
    //1.durum local storage de key-value olarak todo yer almıyorsa önce todo olustur
    let todos;

    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function todoLocalStorageEkle(yeniTodo)
{
    let todos = getTodoLocalStorage();
    todos.push(yeniTodo);

    //todo eklendikten sonra local storage den degeri güncelle

    localStorage.setItem("todos",JSON.stringify(todos));
}

function tumTodolarıCagir()
{
    let todos = getTodoLocalStorage();

    todos.forEach(function(todo){
        todoListEkle(todo);
    });
}

function deleteTodo(e)
{
    if(e.target.className==="fa fa-remove")
    {
        e.target.parentElement.parentElement.remove();
        todoStoragedenSil(e.target.parentElement.parentElement.textContent);
        showAlertInfos("success","Todo Başarıyla Silindi");
    }
}

function todoStoragedenSil(deletetodo)
{
    let todos = getTodoLocalStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo)
        {
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));//silme işleminden sonra güncelle
}

function filterTodos(e)
{
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(item){
        const value = item.textContent.toLocaleLowerCase();

        if(value.indexOf(filterValue) === -1)
        {
            item.setAttribute("style","display : none !important");
        }
        else
        {
            item.setAttribute("style","display : block");
        }
    })
}

function tumTodolariSil(e)
{
    if(confirm("Tüm Todo Listesini Silmek İstediğinize Emin Misiniz?"))
    {
        todoList.innerHTML="";
    }

    localStorage.removeItem("todos");

}