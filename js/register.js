//register form
let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit",event => {
    event.preventDefault();
    const user = {}

    user.name = document.getElementById("firstName").value;
    user.lastName = document.getElementById("lastName").value;
    user.phoneNumber =document.getElementById("phoneNumber").value;
    user.password = document.getElementById("password").value;
    user.email = document.getElementById("email").value;

    validateFormFields(user)? saveUser(user) : console.log("There was an error");

    clearForm(registerForm);

}
)

function validateFormFields(obj) {
    return Object.values(obj).every(value => value !== "");
}

function saveUser(user){
    let users = getUsers() || [];


    users = getUsers();

    users.push(user);
    localStorage.setItem('userList', JSON.stringify(users));
}

function getUsers(){
    return JSON.parse(localStorage.getItem('userList')) || [];
}


let lista = document.getElementById("users");

function clearForm(form){
    form.reset();
}




