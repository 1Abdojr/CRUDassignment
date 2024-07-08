var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var siteList = [];

if (localStorage.getItem("siteList") != null) {
    siteList = JSON.parse(localStorage.getItem("siteList"));
    displaySite();
}

function addSite() {
    var site = {
        name: siteName.value,
        url: siteUrl.value
    };

    siteList.push(site);
    updateLocalStorage();
    console.log(siteList);

    displaySite();
}

function displaySite() {
    var cartona = '';
    for (let i = 0; i < siteList.length; i++) {
        cartona += `<div class="col-md-3 text-center pt-4">${i + 1}</div>
                    <div class="col-md-3 text-center pt-4">${siteList[i].name}</div>
                    <div class="col-md-3 text-center pt-4"><a class="btn btn-success px-3 text-white" target="_blank" href="${siteList[i].url}"><i class="fa-solid fa-eye"></i> Visit</a></div>
                    <div class="col-md-3 text-center pt-4"><button onclick="deleteSite(${i})" class="btn btn-danger px-3"><i class="fa-solid fa-trash"></i> Delete</button></div>`;
    }
    document.getElementById("myData").innerHTML = cartona;
    clearData();
}

function clearData() {
    siteName.value = '';
    siteUrl.value = '';
}

function deleteSite(index) {
    console.log(index);
    siteList.splice(index, 1);
    updateLocalStorage();
    displaySite();
}

function updateLocalStorage() {
    localStorage.setItem("siteList", JSON.stringify(siteList));
}

function siteInputValidation(element) {
    console.log(element);

    var regex = {
        siteName: /^.{4,}$/,
        siteUrl: /^((http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))$/
    };

    if (regex[element.id].test(element.value)) {
        console.log("Match");
        element.nextElementSibling.classList.add("d-none");
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
    } else {
        console.log("Not match");
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.remove("d-none");
    }
}
