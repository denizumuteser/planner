function getFromStorage(name)
{
    return JSON.parse(localStorage.getItem(name));
}

function removeFromStorage(name)
{
    localStorage.removeItem(name);
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
    addToStorage(new_class['title'], new_class)
    return false;
};

let clearbtn = document.getElementById("clear-class-button")
clearbtn.addEventListener('click', () => {
    localStorage.clear();
})

let deleteform = document.getElementById('delete-class-form')
deleteform.onsubmit = () => {
    let ftitle = document.getElementById('ftitle-del').value;
    removeFromStorage(ftitle)
    return false;
};


const btn2 = document.querySelector('#local-storage')
btn2.addEventListener('click', () => {
    console.log(localStorage)
});

