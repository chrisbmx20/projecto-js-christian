
function showElement(index){
    let event = document.getElementById("events");
    let task = document.getElementById("tasks");

    if(index === 1){
        event.style.display = "none";
        task.style.display = "block";
    }
    else if(index === 0){
        event.style.display = "block";
        task.style.display = "none";
    }
}

//Codigo de los eventos
let eventList = document.getElementById("event-list");
let taskList = document.getElementById("task-list");

let addEventBtn = document.getElementById("addEvent");


getEvents();
getTasks();

addEventBtn.addEventListener("click",function(){

        
    let eventTitle = document.getElementById("eventTitle").value;
    let eventDate = document.getElementById("eventDate").value;

    if (eventTitle !="" && eventDate!=""){
        addEvent(eventTitle,eventDate);
        eventTitle ="";
        saveEvents();

    }


}
);

function addEvent(evtitle,evDate){
    let eventItem = document.createElement("li");
    let eventHeading = document.createElement("h3");
    let evntDate = document.createElement("span");
        
    eventHeading.innerHTML = evtitle;
    evntDate.innerHTML = evDate;

    let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className ="delete-button";
    let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.className = "edit-button";

    //Eliminar Item de Lista
    deleteBtn.addEventListener("click", function(){
        eventList.removeChild(eventItem);
        saveEvents();
    });

    //Editar Item de Lista
    editBtn.addEventListener("click", function(){
        eventItem.firstChild.textContent = prompt("Edit Your Event",eventItem.firstChild.textContent);
        eventItem.childNodes[1].textContent = prompt("Edit Event Date",eventItem.childNodes[1].textContent);
        saveEvents();
    })

    eventItem.appendChild(eventHeading);
    eventItem.appendChild(evntDate);
    eventItem.appendChild(deleteBtn);
    eventItem.appendChild(editBtn);

    eventItem ? eventList.appendChild(eventItem) : console.log("El Elemento No existe");

    
  

    saveEvents();

}

function saveEvents() {
    const eventArr = [];


    eventList.querySelectorAll('li').forEach(eventItem => {

        eventArr.push(
            {
                title:eventItem.firstChild.textContent,
                date:eventItem.childNodes[1].textContent

            }
        );


    });

    localStorage.setItem('events', JSON.stringify(eventArr));
    
}

function getEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => addEvent(event.title,event.date));
    
}


//codigo de las tareas
let addTaskBtn = document.getElementById("addTask");


addTaskBtn.addEventListener("click",function(){

    let prioritySelect = document.getElementById("priority").value;    
    let taskTitle = document.getElementById("taskText").value;


    if (taskTitle !="" && prioritySelect!=""){
        addTask(taskTitle,prioritySelect);
        taskTitle = "";
        prioritySelect = "low";
        saveTasks();

    }


}
);

function addTask(tsktitle,tskPriority){
    let taskItem = document.createElement("li");
    let taskHeading = document.createElement("h3");
    let priority = document.createElement("span");
        
    taskHeading.innerHTML = tsktitle;
    priority.innerHTML = tskPriority;

    let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className ="delete-button";

    let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.className = "edit-button";

    //Eliminar Item de Lista
    deleteBtn.addEventListener("click", function(){
        taskList.removeChild(taskItem);
        saveTasks();
    });

    //Editar Item de Lista
    editBtn.addEventListener("click", function(){
        taskItem.firstChild.textContent = prompt("Edit Your Event",taskItem.firstChild.textContent);
        taskItem.childNodes[1].textContent = prompt("Edit Event Date",taskItem.childNodes[1].textContent);
        saveTasks();
    })

    taskItem.appendChild(taskHeading);
    taskItem.appendChild(priority);
    taskItem.appendChild(deleteBtn);
    taskItem.appendChild(editBtn);

    taskList.appendChild(taskItem);

    saveTasks();

}

function saveTasks() {
    const taskArr = [];


    taskList.querySelectorAll('li').forEach(tasktItem => {

        taskArr.push(
            {
                name:tasktItem.firstChild.textContent,
                priority:tasktItem.childNodes[1].textContent

            }
        );

    });

    localStorage.setItem('tasks', JSON.stringify(taskArr));
    
}

function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.name,task.priority));
    
}




