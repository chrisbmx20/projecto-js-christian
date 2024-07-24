function showElement(index){
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


getEvents();

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
    let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";

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

    eventList.appendChild(eventItem);

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

        console.log("evento ", event);

    });

    localStorage.setItem('events', JSON.stringify(eventArr));
    
}

function getEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach(event => addEvent(event.title,event.date));
    
}



