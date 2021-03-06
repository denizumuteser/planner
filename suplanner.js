const time_slots = ["8.40","9.40","10.40","11.40","12.40","13.40",
                        "14.40","15.40","16.40","17.40", "18.40"]
const time_slot_class = ["8","9","10","11","12","13","14","15","16","17","18"]
const week_days = ["monday","tuesday","wednesday","thursday","friday"]

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

function createGrid()
{
    let container = document.querySelector("tbody");

    // create time slot rows
    
    for (let i = 0; i < time_slots.length; i++) {

        const tr = document.createElement('tr');
        //add time slot
        const th = document.createElement('th');
        th.setAttribute('class', 'time');
        th.textContent = time_slots[i];
        tr.appendChild(th);
        //add columns
        for (let ii = 0; ii < week_days.length; ii++) {
            const td = document.createElement('td');
            td.setAttribute('class', week_days[ii] + " " + time_slot_class[i]);
            
            const div1 = document.createElement('div');
            div1.setAttribute('class', 'class-title');
            const div2 = document.createElement('div');
            div2.setAttribute('class', 'class-location');

            td.appendChild(div1);
            td.appendChild(div2);
            tr.appendChild(td);
        }
        container.appendChild(tr);
    }
}

function populateGrid(classList)
{
    for (let c = 0; c < classList.length; c++) {
        
        let newclass = document.getElementsByClassName(classList[c]["weekday"]+" "+classList[c]["timeslot"])
        //title
        let title = newclass[0].childNodes[0]
        title.textContent = classList[c]["title"]
        //zoom link
        const div2a = document.createElement('a');
        div2a.textContent = classList[c]["location"]
        if (classList[c]["isOnline"]) {
            setAttributes(div2a, {"target":"_blank","href":classList[c]["link"]})   
        }
        newclass[0].childNodes[1].appendChild(div2a);
    }    
}

function getFromStorage(name)
{
    return JSON.parse(localStorage.getItem(name));
}

function constructClassListFromStorage()
{
    return getFromStorage("stored_classes")
}

function addToStorage(name, myobj)
{
    localStorage.setItem(name, JSON.stringify(myobj))
}


if (!(localStorage.getItem("stored_classes"))) {
    addToStorage("stored_classes", [])
}

createGrid()
temp_list = constructClassListFromStorage()
populateGrid(temp_list)


