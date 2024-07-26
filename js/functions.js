
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
        taskItem.classList.add("list-item");

    let taskHeading = document.createElement("h3");
        taskHeading.classList.add("task-heading");

    let priority = document.createElement("span");
        priority.classList.add("priority");


    let btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");


    let editIcon = document.createElement("i");
        editIcon.classList.add("fa-regular");
        editIcon.classList.add("fa-pen-to-square");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash-can");


    if(tskPriority === "low"){
        priority.classList.add("text-success");
    }
    else if(tskPriority === "medium"){
        priority.classList.add("text-warning");
    }
    else{
        priority.classList.add("text-danger");
    }


    taskHeading.innerHTML = tsktitle;
    priority.innerHTML = tskPriority;

    let deleteBtn = document.createElement("button");
        deleteBtn.appendChild(deleteIcon);
        deleteBtn.className ="delete-button";

    let editBtn = document.createElement("button");
        editBtn.className = "edit-button";
        editBtn.appendChild(editIcon);

    //Eliminar Item de Lista
    deleteBtn.addEventListener("click", function(){
        taskList.removeChild(taskItem);
        saveTasks();
    });

    //Editar Item de Lista
    editBtn.addEventListener("click", function(){

        let prioritySelect = document.getElementById("priority");    
        let taskTitle = document.getElementById("taskText");
        
        addTaskBtn.textContent = "";

        taskTitle.value = taskItem.firstChild.textContent;
        console.log(taskItem.firstChild.textContent);
        prioritySelect.value = taskItem.childNodes[1].textContent;

        addTaskBtn.textContent = "Edit Task";
        addTaskBtn.id ='editTaskBtn';

        
        document.getElementById("editTaskBtn").addEventListener("click",()=>{
            taskList.removeChild(taskItem);

            taskItem.firstChild.textContent = taskTitle.value;
            taskItem.childNodes[1].textContent = prioritySelect.value; 

            taskTitle.value = "";
            prioritySelect.value = "low";
            
            saveTasks();
            
            document.getElementById("editTaskBtn").id ="addTask";
            document.getElementById("addTask").textContent ="Add Task";
            
        })

         
        
    })

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    taskItem.appendChild(taskHeading);
    taskItem.appendChild(priority);
    taskItem.appendChild(btnContainer);
    

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




