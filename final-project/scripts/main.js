/*
 * Main module for shared functionalities (Menu and Footer)
 * Meets the requirement: ES Modules & DOM Manipulation
 */

/**
 * Activates the hamburger menu for mobile devices
 */
export function initMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            menuBtn.setAttribute('aria-expanded', isOpen);
            menuBtn.textContent = isOpen ? '✕' : '☰';
        });
    }
}

/**
 * Inserts the current year into the footer
 */
export function setFooterYear() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }
}

// Initialize functions when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    setFooterYear();
});