function getFromStorage(name)
{
    return JSON.parse(localStorage.getItem(name));
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

function removeFromStorage(name)
{
    let temp = getFromStorage("stored_classes")
    for (let i = 0; i < temp.length; i++) {
        if (temp[i]["title"] == name) {
            temp.splice(i,1);
            localStorage.removeItem("stored_classes");
            addToStorage("stored_classes", temp)
        }
    }
}

function addToStorage(name, myobj)
{
    localStorage.setItem(name, JSON.stringify(myobj))
}

let addform = document.getElementById('add-class-form')
addform.onsubmit = () => {
    let ftitle = document.getElementById('ftitle').value;
    let flocation = document.getElementById('flocation').value;
    let fday = document.getElementById('fday').value;
    let ftime = document.getElementById('ftime').value;
    let flink = document.getElementById('flink').value;
    
    let new_class = {"weekday":fday,"timeslot":ftime,"title":ftitle,"isOnline":true,"location":flocation,"link":flink}
    console.log(new_class)

    let temp = getFromStorage("stored_classes")
    temp.push(new_class)
    removeFromStorage("stored_classes")
    addToStorage("stored_classes" ,temp)
    return false;
};

let clearbtn = document.getElementById("clear-class-button")
clearbtn.addEventListener('click', () => {
    localStorage.clear();
    if (!(localStorage.getItem("stored_classes"))) {
        addToStorage("stored_classes", [])
    }
    let selectmenu = document.getElementById("fdel")
    while (selectmenu.firstChild) {
        selectmenu.removeChild(selectmenu.lastChild);
      }
})

let deleteform = document.getElementById('delete-class-form')
deleteform.onsubmit = () => {
    let fdel = document.getElementById('fdel').value;
    removeFromStorage(fdel.split(" ")[0])
    let selectmenu = document.getElementById("fdel")
    for (let i = 0; i < selectmenu.childElementCount; i++) {
        if (selectmenu[i].textContent == fdel) {
            selectmenu.removeChild(selectmenu[i])
        }
    }
    return false;
};

function findDeletables()
{
    let selectmenu = document.getElementById("fdel")
    let temp = getFromStorage("stored_classes")
    for (let i = 0; i < temp.length; i++) {
        let option = document.createElement("option")
        setAttributes(option, {"id":"fdel","value": temp[i]['title'] + " " + temp[i]['weekday']+ " " + temp[i]['timeslot']})
        option.textContent = temp[i]['title']+ " " +temp[i]['weekday']+" "+ temp[i]['timeslot']
        selectmenu.appendChild(option)
    }
}

const btn2 = document.querySelector('#local-storage')
btn2.addEventListener('click', () => {
    console.log(localStorage)
});

findDeletables()