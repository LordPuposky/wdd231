/*
 * Handles fetching data, rendering trend cards, and managing the modal.
 * Meets requirements: Fetch API, Async/Await, Array Methods (.map, .filter), Template Literals.
 */


// Global state to hold fetched trends
let trendsData = [];

/**
 * Fetches trend data from the local JSON file.
 * Uses async/await and try...catch for error handling.
 */
async function getTrends() {
    const url = 'data/trends.json';
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        trendsData = data; // Store data globally for filtering

        displayTrends(trendsData);
        populateCategoryFilter(trendsData);

    } catch (error) {
        console.error('Error fetching trends:', error);
        // Display a user-friendly error message in the container
        const container = document.getElementById('trendsContainer');
        if (container) {
            container.innerHTML = `<p class="error-msg">Sorry, we couldn't load the trends. Please try again later.</p>`;
        }
    }
}

/**
 * Renders the trend cards into the DOM.
 * @param {Array} trends - Array of trend objects to display
 */
function displayTrends(trends) {
    const container = document.getElementById('trendsContainer');
    if (!container) return; // Guard clause

    // Clear existing content
    container.innerHTML = '';

    if (trends.length === 0) {
        container.innerHTML = '<p>No trends found matching your criteria.</p>';
        return;
    }

    // Use .map() to create HTML strings for each trend (Array Method Requirement)
    const cardsHtml = trends.map(trend => `
        <article class="trend-card" data-id="${trend.id}">
            <img src="images/${trend.image}.webp" alt="${trend.title}" loading="lazy" width="300" height="200">
            
            <div class="card-header">
                <h3>${trend.title}</h3>
                <span class="category-tag">${trend.category}</span>
            </div>
            <p>${trend.description}</p>
            <button class="cta-button details-btn" aria-label="View details for ${trend.title}">
                View Details
            </button>
        </article>
    `).join(''); // Join the array into a single string

    // Inject HTML into the DOM
    container.innerHTML = cardsHtml;

    // Add event listeners to the new buttons for the Modal
    addModalListeners();
}

/**
 * Populates the <select> element with unique categories from the data.
 * @param {Array} trends
 */
function populateCategoryFilter(trends) {
    const filterSelect = document.getElementById('categoryFilter');
    if (!filterSelect) return;

    // Get unique categories using Set
    const categories = [...new Set(trends.map(item => item.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filterSelect.appendChild(option);
    });

    // Add change listener for filtering
    filterSelect.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === 'all') {
            displayTrends(trendsData);
        } else {
            // Use .filter() to find matching items (Array Method Requirement)
            const filtered = trendsData.filter(item => item.category === selectedCategory);
            displayTrends(filtered);
        }
    });
}

/**
 * Adds click event listeners to "View Details" buttons to open the modal.
 */
function addModalListeners() {
    const buttons = document.querySelectorAll('.details-btn');
    const modal = document.getElementById('trendModal');

    // Elements inside the modal to update
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDescription');
    const modalImpact = document.getElementById('modalImpact');
    const modalTimeline = document.getElementById('modalTimeline');
    const closeModal = document.getElementById('closeModal');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find the parent card to get the ID
            const card = e.target.closest('.trend-card');
            const id = parseInt(card.dataset.id);
            const trend = trendsData.find(t => t.id === id);

            if (trend && modal) {
                // Populate Modal Data
                modalTitle.textContent = trend.title;
                modalDesc.textContent = trend.description;
                modalImpact.textContent = trend.impact;
                modalTimeline.textContent = trend.timeline;

                // Show the modal
                modal.showModal();
            }
        });
    });

    // Close modal functionality
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.close();
        });

        // Close when clicking outside the modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.close();
            }
        });
    }
}

// Initialize everything when the module loads
document.addEventListener('DOMContentLoaded', () => {
    getTrends();
});