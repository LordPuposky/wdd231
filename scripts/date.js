// Dynamically insert the current copyright year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Dynamically insert the document's last modified date
document.getElementById('lastModified').textContent =
    "Last Modified: " + document.lastModified;
