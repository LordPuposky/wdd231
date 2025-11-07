// Step 1: Declare the URL for the JSON data
const url = 'data/latter-day-prophets.json';

// Step 2: Select the cards container from the HTML
const cards = document.querySelector('#cards');

// Step 3: Define an async function to fetch and handle the data
async function getProphetData() {
  // Fetch the data from the URL
    const response = await fetch(url);

  // Parse the JSON data from the response
    const data = await response.json();

  // Call displayProphets with the array from the JSON object
    displayProphets(data.prophets);
}

// Step 4: Function to build and display prophet cards
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
    // Create card elements
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let imgPortrait = document.createElement('img');
    let birthInfo = document.createElement('p');

    // Fill card content
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    // Two separate lines: Date of Birth and Place of Birth
    birthInfo.innerHTML = `Date of Birth: ${prophet.birthdate}<br>Place of Birth: ${prophet.birthplace}`;

    // Image attributes
    imgPortrait.setAttribute('src', prophet.imageurl);
    imgPortrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    imgPortrait.setAttribute('loading', 'lazy');
    imgPortrait.setAttribute('width', '340');
    imgPortrait.setAttribute('height', '440');

    // Add elements to card
    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(imgPortrait);

    // Add card to the cards div
    cards.appendChild(card);
    });
}

// Step 5: Call the async function on page load
getProphetData();
