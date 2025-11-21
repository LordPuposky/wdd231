import { temples } from '../data/temples.js';
//console.log(temples);

import { url } from '../data/temples.js';
//console.log(url);

//-------GRAB A REFERENCE TO THE DIVISION WHERE WE DISPLAY THE ITEMS
const showHere = document.querySelector("#showHere");
//GET A REFERENCE TO THE HTML DIALOG ELEMENT
const mydialog = document.querySelector("#mydialog");
const mytitle = document.querySelector("#mydialog h2");
const myinfo = document.querySelector("#mydialog p");
const myclose = document.querySelector("#mydialog button");
myclose.addEventListener("click", () => mydialog.close())

//--------------LOOP THROUGH THE ARRAY OF JASON ITEMS
function displayItems(data) {
    console.log(data);
    data.forEach(x => {
        console.log(x);
        const photo = document.createElement("img");
        photo.src = `${url}${x.path}`
        photo.alt = x.name;
        //Add an event listener to each division of the page
    photo.addEventListener("click", () => showStuff(x));
    // end event listener
        showHere.appendChild(photo)
        })// end loop
    }// end function

    // start displayin all the items in the JSON file
displayItems(temples)

//POPULATE THE DIALOG WITH THE INFORMATION WHEN IMAGE IS CLICKED
function showStuff(x) {
    mytitle.innerHTML = x.name;
    // Agregamos los datos extra al párrafo
    myinfo.innerHTML = `
        Dedicated: ${x.dedicated}
        By: ${x.person}
    `;
    mydialog.showModal();
}