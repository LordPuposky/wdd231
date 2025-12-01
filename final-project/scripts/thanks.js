/**
 * Handles extracting URL parameters and displaying form submission data.
 * Meets requirements: URLSearchParams, Template Literals, DOM Manipulation.
 */

import { initMenu, setFooterYear } from './main.js';

/**
 * Extracts query parameters from the URL and displays them in the DOM.
 */
function displaySubmissionData() {
    // Get the current URL search params object from the window location
    const params = new URLSearchParams(window.location.search);

    // Get specific values submitted from the form based on the 'name' attributes
    // We use logical OR (||) to provide default values if the data is missing
    const fullName = params.get('fullname') || 'Guest';
    const email = params.get('email') || 'Not provided';
    const message = params.get('message') || 'No message provided';
    
    // Checkbox inputs send 'on' if checked, or null if not checked
    const newsletter = params.get('newsletter') ? 'Yes, subscribed' : 'No, thanks';

    // Select the container element in the HTML where results will be shown
    const resultsContainer = document.getElementById('submission-results');

    // Safety check: ensure the container exists before trying to modify it
    if (resultsContainer) {
        // Use Template Literals (backticks) to construct the HTML dynamically
        resultsContainer.innerHTML = `
            <h2>Thank You, ${fullName}!</h2>
            <p>We have received your submission with the following details:</p>
            
            <div style="background-color: rgba(0, 67, 164, 0.05); padding: 1.5rem; border-radius: 8px; margin: 1rem 0; text-align: left;">
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Newsletter Status:</strong> ${newsletter}</p>
                <hr style="border: 0; border-top: 1px solid #ddd; margin: 1rem 0;">
                <p><strong>Your Message:</strong></p>
                <p style="font-style: italic;">"${message}"</p>
            </div>

            <p><small>A confirmation has been sent to your email address.</small></p>
        `;
    } else {
        console.error('Error: Container #submission-results not found in the DOM.');
    }
}

// Initialize functions when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize common layout functionality (menu and footer date)
    initMenu();
    setFooterYear();
    
    // Run the specific logic for this page to display the form data
    displaySubmissionData();
});