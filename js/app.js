console.log('collegato');

let addButton = document.getElementById('add-button');
addButton.addEventListener('click', function () {
    addToDoItem();
});

let pressBtn = document.getElementById('todo-entry-box');
pressBtn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        console.log('You pressed Enter');
        e.preventDefault();
        addToDoItem();
    }
});

let clearButton = document.getElementById('clear-completed-button');
clearButton.addEventListener('click', function () {
    clearCompletedToDoItems();
});

let emptyButton = document.getElementById('empty-button');
emptyButton.addEventListener('click', emptyList);

let saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', saveList);

// variabile del selettore HTML che ho come id todo-entry-box

var toDoEntryBox = document.getElementById('todo-entry-box');

// variabile del selettore HTML che ha come id todo-list

var toDoList = document.getElementById('todo-list');

function newToDoItem(itemText, completed) {
    let toDoItem = document.createElement('li');
    let toDoText = document.createTextNode(itemText); // abbiamo creato il nodo dove inettiamo gli elementi della lista

    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add('completed');
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener('dblclick', toggleToDoItemState);
}

function addToDoItem() {
    let itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
}

function toggleToDoItemState() {
    if (this.classList.contains('completed')) {
        this.classList.remove('completed');
    }
    else {
        this.classList.add('completed');
    }
}

// button delete completed

function clearCompletedToDoItems() {
    let completedItems = toDoList.getElementsByClassName('completed');

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}

// button DELETE ALL

function emptyList() {
    let toDoItems = toDoList.children; // children ovvero i listItem

    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }

    localStorage.clear(); // metodo per svuotare il local storage senza farlo manualmente
}


// save-list 

function saveList() {
    let toDos = [];

    for (let i = 0; i < toDoList.children.length; i++) {
        let toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains('completed')
        };

        toDos.push(toDoInfo);
    }
    console.log(toDos);

    if (toDos.length !== 0) {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }
}

setInterval(saveList, 6000);

function loadList() {
    if (localStorage.getItem('toDos' != null)) {

        let toDos = JSON.parse(localStorage.getItem('toDos'));

        for (let i = 0; i < toDos.length; i++) {
            let toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();