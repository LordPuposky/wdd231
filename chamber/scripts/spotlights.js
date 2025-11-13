// Fetch members data from JSON file
async function getMembers() {
  const response = await fetch('data/members.json');
  return await response.json();
}

// Pick 2 or 3 random Gold or Silver members for the spotlight
function pickSpotlightMembers(members) {
  // Filter only Gold or Silver members
  const validMembers = members.filter(
    m => m.membership_level === 'Gold' || m.membership_level === 'Silver'
  );
  // Shuffle the array (Fisher-Yates algorithm)
  for (let i = validMembers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [validMembers[i], validMembers[j]] = [validMembers[j], validMembers[i]];
  }
  // Return up to 3 random members (but at least 2)
  return validMembers.slice(0, Math.min(3, validMembers.length));
}

// Render the logo grid with the selected spotlight members
function renderLogoGrid(members) {
  const logoGrid = document.getElementById('spotlight-logos');
  logoGrid.innerHTML = '';
  members.forEach(member => {
    const logoDiv = document.createElement('div');
    logoDiv.className = 'spotlight-logo-only';
    logoDiv.innerHTML = `<img src="${member.logo}" alt="${member.name} logo">`;
    logoDiv.addEventListener('click', () => showMemberModal(member));
    logoGrid.appendChild(logoDiv);
  });
}

// Show info modal for a chamber member (with membership coloring)
function showMemberModal(member) {
  const modal = document.getElementById('memberModal');
  const content = document.getElementById('modalContent');
  const membershipClass = member.membership_level
    ? member.membership_level.toLowerCase()
    : 'bronze';

  content.innerHTML = `
    <span class="close" onclick="document.getElementById('memberModal').style.display='none';">&times;</span>
    <div class="modal-member-card ${membershipClass}">
      <img src="${member.logo}" class="spotlight-logo" style="margin:0 auto;" alt="${member.name} logo">
      <h3 style="margin-top:1.5rem;">${member.name}</h3>
      <p>${member.tagline || ''}</p>
      <ul>
        <li><strong>Type:</strong> ${member.business_type}</li>
        <li><strong>Phone:</strong> ${member.phone}</li>
        <li><strong>Address:</strong> ${member.address}</li>
        <li><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></li>
        <li><strong>Membership:</strong> ${member.membership_level}</li>
      </ul>
    </div>
  `;
  modal.style.display = 'flex';
}

// Hide modal when clicking outside the modal content area
window.onclick = function(event) {
  const modal = document.getElementById('memberModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Main: get members, pick spotlights, and render on page load
document.addEventListener("DOMContentLoaded", async () => {
  const members = await getMembers();
  const spotlights = pickSpotlightMembers(members);
  renderLogoGrid(spotlights);
});
