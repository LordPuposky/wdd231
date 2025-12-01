/**
 * Handles user customization and saves settings using LocalStorage.
 * Meets requirements: LocalStorage, Data Fetching, Event Handling.
 */

import { initMenu, setFooterYear } from './main.js';

const PREFS_KEY = 'futurebank_favorites';

/**
 * Fetches the list of trends to generate checkboxes.
 */
async function loadPreferencesOptions() {
    const listContainer = document.getElementById('favorites-list');
    if (!listContainer) return;

    try {
        const response = await fetch('data/trends.json');
        if (!response.ok) throw new Error('Failed to load trends');

        const trends = await response.json();
        renderCheckboxes(trends, listContainer);

    } catch (error) {
        console.error('Error loading options:', error);
        listContainer.innerHTML = '<li>Unable to load preferences options.</li>';
    }
}

/**
 * Renders the list of trends as checkboxes.
 * @param {Array} trends
 * @param {HTMLElement} container
 */
function renderCheckboxes(trends, container) {
    // 1. Get currently saved favorites from LocalStorage
    const savedFavorites = getSavedFavorites();

    // 2. Generate HTML for each trend
    const listHtml = trends.map(trend => {
        const isChecked = savedFavorites.includes(trend.id.toString()) ? 'checked' : '';
        return `
            <li>
                <label class="preference-item">
                    <input type="checkbox"
                        value="${trend.id}"
                        class="trend-checkbox"
                        ${isChecked}>
                    <span>${trend.title}</span>
                </label>
            </li>
        `;
    }).join('');

    container.innerHTML = listHtml;

    // 3. Add Event Listeners to save changes immediately
    addCheckboxListeners();
}

/**
 * Retrieves the array of favorite IDs from LocalStorage.
 * @returns {Array} Array of strings (IDs)
 */
function getSavedFavorites() {
    const storedData = localStorage.getItem(PREFS_KEY);
    return storedData ? JSON.parse(storedData) : [];
}

/**
 * Adds change events to all checkboxes to update LocalStorage.
 */
function addCheckboxListeners() {
    const checkboxes = document.querySelectorAll('.trend-checkbox');

    checkboxes.forEach(box => {
        box.addEventListener('change', (e) => {
            const id = e.target.value;
            let favorites = getSavedFavorites();

            if (e.target.checked) {
                // Add ID if not already present
                if (!favorites.includes(id)) {
                    favorites.push(id);
                }
            } else {
                // Remove ID
                favorites = favorites.filter(favId => favId !== id);
            }

            // Save back to LocalStorage
            localStorage.setItem(PREFS_KEY, JSON.stringify(favorites));

            // Optional: Notify user (console or UI)
            console.log('Preferences saved:', favorites);
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    setFooterYear();
    loadPreferencesOptions();
});