const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions: []
}

//Logout Click Button Exit
document.getElementById("button-logout").addEventListener("click", logout);

//Click Button for View All Transactions Screen
document.getElementById("all-transactions-button").addEventListener("click", function() {
    window.location.href = "transactions.html";
});

//Add Transaction
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotalValue();
    alert("Lançamento adicionado com sucesso!")
});

//Login Checking
checkLogged();

//Function for Check Logger
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if (!logged) {
        window.location.href = "index.html";
        return;
    }

    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotalValue();
}

//Function for Logout System
function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");
    window.location.href = "index.html";
}

//Save Transactions Data
function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}

//Return Transactions Cash In
function getCashIn() {
    const transaction = data.transactions;
    const cashIn = transaction.filter((item) => item.type === "1");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>                                           
                </div>
            </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

//Return Transactions Cash In
function getCashOut() {
    const transaction = data.transactions;
    const cashIn = transaction.filter((item) => item.type === "2");

    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>                                           
                </div>
            </div>
            `
        };

        document.getElementById("cash-out-list").innerHTML = cashInHtml;
    }
}

//Return Total Value
function getTotalValue() {
    const transaction = data.transactions;
    let total = 0;

    transaction.forEach((item) => {
        if (item.type === "1") {
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total-value").innerHTML = `R$ ${total.toFixed(2)}`;
}