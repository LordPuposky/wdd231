import { places } from '../data/places.mjs';

const msToDays = 84600000;
const theDateToday = new Date();
const messageElement = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
  messageElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysDifference = Math.floor((theDateToday - new Date(parseInt(lastVisit))) / msToDays);
  if (daysDifference < 1) {
    messageElement.textContent = "Back so soon! Awesome!";
  } else {
    const dayWord = daysDifference === 1 ? "day" : "days";
    messageElement.textContent = `You last visited ${daysDifference} ${dayWord} ago.`;
  }
}
localStorage.setItem("lastVisit", Date.now());

const cardsContainer = document.getElementById("cards-container");

function displayPlaces(items) {
  cardsContainer.innerHTML = "";
  items.forEach(place => {
    const card = document.createElement("section");
    card.classList.add("card");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;
    img.setAttribute("loading", "lazy");
    img.width = 300;
    img.height = 200;

    const address = document.createElement("address");
    address.textContent = place.address;

    const desc = document.createElement("p");
    desc.textContent = place.description;

    const btn = document.createElement("button");
    btn.textContent = "Learn More";

    card.append(title, img, address, desc, btn);
    cardsContainer.appendChild(card);
  });
}

displayPlaces(places);

// 3. Footer Last Modified
document.addEventListener('DOMContentLoaded', () => {
  const lastMod = document.getElementById('lastmod');
  if (lastMod) lastMod.textContent = document.lastModified;
});