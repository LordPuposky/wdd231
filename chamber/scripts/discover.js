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

    btn.addEventListener('click', () => showModal(place));

    card.append(title, img, address, desc, btn);
    cardsContainer.appendChild(card);
  });
}

displayPlaces(places);

const modal = document.getElementById("photoModal");

const modalDetails = document.getElementById("modal-details");
const closeModal = document.getElementById("closeModal");

function showModal(place) {
  modalDetails.innerHTML = `
    <h2 style="color:#b00028;">${place.name}</h2>
    <img src="${place.image}" alt="${place.name}" style="width:100%; max-width:600px; height:auto; border-radius:8px; margin: 1rem 0;">
    <p><strong>Location:</strong> ${place.address}</p>
    <p>${place.description}</p>
  `;
  modal.style.display = "flex";
}
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const lastMod = document.getElementById('lastmod');
  if (lastMod) lastMod.textContent = document.lastModified;
});