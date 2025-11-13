// Fetch members data from JSON file
async function getMembers() {
  const response = await fetch('data/members.json');
  return await response.json();
}

// Render logos as a grid (NO badges en los logos, solo grid visual)
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

// Show modal with colored background according to membership
function showMemberModal(member) {
  const modal = document.getElementById('memberModal');
  const content = document.getElementById('modalContent');
  // Determina la clase con base en el membership
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

// Hide modal when clicking outside the content
window.onclick = function(event) {
  const modal = document.getElementById('memberModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Main
document.addEventListener("DOMContentLoaded", async () => {
  const members = await getMembers();
  renderLogoGrid(members);
});
