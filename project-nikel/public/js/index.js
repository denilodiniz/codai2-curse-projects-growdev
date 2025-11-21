const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//Login System
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    if (!account) {
        alert("Login ou senha estão incorretos!");
        return;
    }

    if (account) {
        if (account.password !== password) {
            alert("Login ou senha estão incorretos!");
            return;
    }

    saveSession(email, checkSession);

    window.location.href = "home.html";
    }

});

//Create Account
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if (email.length < 5) {
        alert("Prencha o campo com um e-mail válido!");
        return;
    }

    if (password.length < 4) {
        alert("Crie uma senha com no mínimo 4 dígitos!");
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transactions: []
    })

    myModal.hide();

    alert("Conta criada com sucesso!");
});

//Function Save Account
function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

//Function for return Account in Local Storage
function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {          
        return JSON.parse(account);
    }

    return "";
}

//Function for Check Logger
function checkLogged () {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session);
        window.location.href = "home.html";
    }
}

//Function for Save Session
function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}