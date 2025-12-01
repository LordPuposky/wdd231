document.addEventListener("DOMContentLoaded", () => {

    // 1. Card logic (Animation)
    const cards = document.querySelectorAll('.level-card');
    if (cards.length > 0) {
        cards.forEach((card, idx) => {
            setTimeout(() => { card.classList.add('show'); }, 350 * idx);
        });
    }

    // 2. Modification date and Timestamp
    const lastModSpan = document.getElementById("lastmod");
    if (lastModSpan) {
        lastModSpan.textContent = document.lastModified;
    }

    const tsField = document.getElementById('timestamp');
    if (tsField) {
        tsField.value = new Date().toISOString();
    }

    // 3. Modals (Pop-up windows)
    const infoBtns = document.querySelectorAll('.level-info-btn');
    infoBtns.forEach(btn => {
        btn.onclick = function () {
            const id = this.dataset.modal;
            const modal = document.getElementById(id);
            if (modal) modal.style.display = 'block';
        }
    });

    const closeBtns = document.querySelectorAll('.modal .close');
    closeBtns.forEach(closeBtn => {
        closeBtn.onclick = function () {
            this.closest('.modal').style.display = 'none';
        }
    });

    window.onclick = function (e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    }

    // 4. HAMBURGER MENU
    const menuButton = document.querySelector('#menu');
    const navigation = document.querySelector('.main-nav');

    // We check that the button and menu exist before adding the event
    // This prevents the "Cannot read properties of null" error if you open a page without a menu.
    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('open');
            navigation.classList.toggle('open');
        });
    }
});