function showElement(){
    let event = document.getElementById("events");
    let task = document.getElementById("tasks");

    if(event.style.display==="block"){
        event.style.display = "none";
        task.style.display = "block";
    }
    else{
        event.style.display = "block";
        task.style.display = "none";

    }
}

//Codigo de los eventos
let eventList = document.getElementById("event-list");
let addEventBtn = document.getElementById("addEvent");


addEventBtn.addEventListener("click",function(){

    let eventItem = document.createElement("li");
    let eventHeading = document.createElement("h3");
    let evntDate = document.createElement("span");
        
    let eventTitle = document.getElementById("eventTitle");
    let eventDate = document.getElementById("eventDate");

    let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
    let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";

    //Eliminar Item de Lista
    deleteBtn.addEventListener("click", function(){
        eventList.removeChild(eventItem);
    });

    //Editar Item de Lista
    editBtn.addEventListener("click", function(){
        eventItem.firstChild.textContent = prompt("Edit Your Event",eventItem.firstChild.textContent);
        eventItem.childNodes[1].textContent = prompt("Edit Event Date",eventItem.childNodes[1].textContent);
    })

    eventHeading.innerHTML = eventTitle.value;
    evntDate.innerHTML = eventDate.value;

    eventItem.appendChild(eventHeading);
    eventItem.appendChild(evntDate);
    eventItem.appendChild(deleteBtn);
    eventItem.appendChild(editBtn);

    eventList.appendChild(eventItem);
}
);


function saveEvents() {
    const eventArr = [];
    const event = {
         title:"",
         date:"",
    }

    eventList.querySelectorAll('li').forEach(eventItem => {

        event.title = eventItem.firstChild.textContent;
        event.date =  eventItem.childNodes[1].textContent;
        eventArr.push(event);

    });

    localStorage.setItem('events', JSON.stringify(eventArr));
    
}

function getEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => addEvent(event));
    
}



