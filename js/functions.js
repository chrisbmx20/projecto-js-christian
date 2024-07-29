
function showElement(index){
    let event = document.getElementById("events");
    let task = document.getElementById("tasks");

    event.style.display = index === 0 ? "block" : "none";
    task.style.display = index === 1 ? "block" : "none";
}

//Codigo de los eventos
let eventList = document.getElementById("event-list");
let taskList = document.getElementById("task-list");

let addEventBtn = document.getElementById("addEvent");


showEvents(getEvents());
getTasks();

addEventBtn.addEventListener("click",function(){

    let eventTitle = document.getElementById("eventTitle").value;
    let eventDate = document.getElementById("eventDate").value;

    if (eventTitle !="" && eventDate!=""){
        const event = {
                title: eventTitle,
                date: eventDate
        }
        saveEvents(event);
        eventTitle ="";
    }
}
);

function showEvents(events){

    events.forEach(event =>{
        let eventContainer = document.createElement("div");
        eventContainer.classList.add("event-container");
    
        let dateContainer = document.createElement("div");
        dateContainer.classList.add("date-container");
    
        let eventFeatures = document.createElement("div");
        eventFeatures.classList.add("event-features");
    
        let eventHeading = document.createElement("h3");
        eventHeading.textContent = event.title;
    
        let eventDescription = document.createElement("p");
        eventDescription.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, placeat.";
    
        // de aqui obtenemos el
        let eventDateObjt = getDayAndMonth(event.date);
    
        let eventDaySpan = document.createElement("span");
        eventDaySpan.textContent = eventDateObjt.dayNumber;
    
        let eventMonthSpan = document.createElement("span");
        eventMonthSpan.textContent = eventDateObjt.montText;
    
        let btnContainer = createButtons();
        let editBtn = btnContainer.firstChild;
        let deleteBtn = btnContainer.childNodes[1];
    
        dateContainer.appendChild(eventDaySpan);
        dateContainer.appendChild(eventMonthSpan);
    
        eventFeatures.appendChild(eventHeading);
        eventFeatures.appendChild(eventDescription);
        eventFeatures.appendChild(btnContainer);
    
        eventContainer.appendChild(dateContainer);
        eventContainer.appendChild(eventFeatures);
    
        eventList.appendChild(eventContainer);
    
        //Eliminar Item de EVENTO
        deleteBtn.addEventListener("click", function(){
            eventList.removeChild(eventContainer);
            updateEvents(events);
        });
    
        //Editar Item de EVENTO
        editBtn.addEventListener("click", function(){
            eventHeading.textContent = prompt("Edit Your Event", eventHeading.textContent);
            eventDaySpan.textContent = prompt("Edit Event Day", eventDaySpan.textContent);
            eventMonthSpan.textContent = prompt("Edit Event Date", eventMonthSpan.textContent);
            updateEvents(events);
        });
    });
    
   }

function updateEvents(events){
    localStorage.setItem('events', JSON.stringify(events)); 
}

function saveEvents(event) {
    const eventArr = getEvents() || [];
    eventArr.push(
        {
            title:event.title,
            date:event.date
        }
    );

    updateEvents(eventArr);
    showEvents(eventArr); 
}

function getEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    return events;
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

//Fin de add Event

function addTask(tsktitle,tskPriority){
    let taskItem = document.createElement("li");
        taskItem.classList.add("list-item");

    let taskHeading = document.createElement("h3");
        taskHeading.classList.add("task-heading");

    let priority = document.createElement("span");
        priority.classList.add("dot");

    let btnContainer = createButtons();
    let editBtn = btnContainer.firstChild;
    let deleteBtn = btnContainer.childNodes[1];

    if(tskPriority === "low"){
        priority.classList.add("bg-success");
    }
    else if(tskPriority === "medium"){
        priority.classList.add("bg-warning");
    }
    else{
        priority.classList.add("bg-danger");
    }

    taskHeading.innerHTML = tsktitle;
    //priority.innerHTML = tskPriority;

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
        //taskItem.style.backgroundColor ="blueviolet";
        taskTitle.value = taskItem.firstChild.textContent;
        prioritySelect.value = checkDots(taskItem.childNodes[1]);

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
                priority:checkDots(tasktItem.childNodes[1])
            }
        );

    });

    localStorage.setItem('tasks', JSON.stringify(taskArr));
    
}

function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.name,task.priority));
    
}

function checkDots(dot){
    if(dot.classList.contains("bg-success")){
        return "low";
    }
    else if(dot.classList.contains("bg-warning")){
        return "medium";
    }
    else{
        return "high";
    }
}

function createButtons(){

    let btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");

    let editIcon = document.createElement("i");
        editIcon.classList.add("fa-regular");
        editIcon.classList.add("fa-pen-to-square");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash-can");

    let deleteBtn = document.createElement("button");
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.className ="delete-button";

    let editBtn = document.createElement("button");
        editBtn.className = "edit-button";
        editBtn.appendChild(editIcon);

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    return btnContainer;
}


function getDayAndMonth(date) {
    const monthAbbreviations = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    date = new Date(date + 'T00:00:00Z');
    const dateObj = {}

    dateObj.montText = monthAbbreviations[date.getUTCMonth()];
    dateObj.dayNumber = date.getUTCDate();

    return dateObj;

}



