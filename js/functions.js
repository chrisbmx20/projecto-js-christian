
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

showTasks(getTasks());
showEvents(getEvents());

addEventBtn.addEventListener("click",function(){

    let eventTitle = document.getElementById("eventTitle");
    let eventDate = document.getElementById("eventDate");

    if (eventTitle !="" && eventDate!=""){
        const event = {
                title: eventTitle.value,
                date: eventDate.value
        }

        saveEvents(event);

        eventTitle.value = "";
        eventDate.value = "";
    }
}
);

function clearEvents(){
    eventList.innerHTML = "";
}




function showEvents(events){
    
    events.forEach((event, index) =>{
        
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
    
        // de aqui obtenemos el mes y el dia
        let eventDateObjt = getDayAndMonth(event.date);
    
        let eventDaySpan = document.createElement("span");
        eventDaySpan.classList.add("event-day");
        eventDaySpan.textContent = eventDateObjt.dayNumber;
    
        let eventMonthSpan = document.createElement("span");
        eventMonthSpan.classList.add("event-month");
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
            //clearEvents();
            events.splice(index, 1); // Remove event from the array
            updateEvents(events);
        });
    
        //Editar Item de EVENTO
        editBtn.addEventListener("click", function(){

            let eventTitle = document.getElementById("eventTitle");
            let eventDate = document.getElementById("eventDate");

            eventTitle.value = event.title;
            eventDate.value = event.date;

            addEventBtn.childNodes[1].textContent = "Edit Event";
            addEventBtn.id ='editEventBtn';

            document.getElementById("editEventBtn").addEventListener("click",()=>{
                
                event.title = eventTitle.value;
                event.date = eventDate.value;

                eventTitle.value = "";
                eventDate.value = "";
                
                updateEvents(events);

                document.getElementById("editEventBtn").id ="addEventBtn";
                document.getElementById("addEventBtn").childNodes[1].textContent ="Add Event";

                addEventBtn.addEventListener("click", addEvent);
                addEventBtn.removeEventListener("click", editEvent);

            })

        });
    });
    
}

function updateEvents(events){
    localStorage.setItem('events', JSON.stringify(events));
    clearEvents();
    showEvents(events);
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
}

function getEvents() {
  return JSON.parse(localStorage.getItem('events')) || [];
}

//codigo de las tareas
let addTaskBtn = document.getElementById("addTask");
let taskForm = document.getElementById("taskForm");

addTaskBtn.addEventListener("click",function(){

    let prioritySelect = document.getElementById("priority");    
    let taskTitle = document.getElementById("taskText");

    if (taskTitle !="" && prioritySelect!=""){

        const task = {
            title: taskTitle.value,
            priority:prioritySelect.value
        }
        
        saveTask(task);
        
    }

    taskTitle.value = "";
    prioritySelect.value = "low";
}
);

function showTasks(tasks){
    
    tasks.forEach((task,index) => {

    let taskItem = document.createElement("li");
    taskItem.classList.add("list-item");

    let taskHeading = document.createElement("h3");
        taskHeading.classList.add("task-heading");

    let priority = document.createElement("span");
        priority.classList.add("dot");

    let btnContainer = createButtons();
    let editBtn = btnContainer.firstChild;
    let deleteBtn = btnContainer.childNodes[1];

    if(task.priority === "low"){
        priority.classList.add("bg-success");
    }
    else if(task.priority === "medium"){
        priority.classList.add("bg-warning");
    }
    else{
        priority.classList.add("bg-danger");
    }

    taskHeading.textContent = task.title;

    //Eliminar Item de Lista
    deleteBtn.addEventListener("click", function(){
        tasks.splice(index, 1);
        updateTasks(tasks);
       
    });

    //Editar Item de Lista
    editBtn.addEventListener("click", function(){

        let prioritySelect = document.getElementById("priority");    
        let taskTitle = document.getElementById("taskText");
        
        addTaskBtn.textContent = "";
        
        taskTitle.value = task.title;
        prioritySelect.value = task.priority;

        addTaskBtn.textContent = "Edit Task";
        addTaskBtn.id ='editTaskBtn';

        document.getElementById("editTaskBtn").addEventListener("click",()=>{
            
            task.title = taskTitle.value;
            task.priority = prioritySelect.value;

            taskTitle.value = "";
            prioritySelect.value = "low";
            
            document.getElementById("editTaskBtn").id ="addTask";
            document.getElementById("addTask").textContent ="Add Task";

            addTaskBtn.addEventListener("click", addEvent);
            addTaskBtn.removeEventListener("click", editEvent);

            updateTasks(tasks);
            
        })
    })

    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    taskItem.appendChild(taskHeading);
    taskItem.appendChild(priority);
    taskItem.appendChild(btnContainer);
    
    taskList.appendChild(taskItem);

    })

}

function clearTasks(){
    taskList.innerHTML = "";
}

function updateTasks(tasks){

    localStorage.setItem('tasks', JSON.stringify(tasks));

    clearTasks();
    showTasks(tasks);
}

function saveTask(task) {

    const taskArr = getTasks() || [];
    taskArr.push(task);

    updateTasks(taskArr); 
    
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
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



