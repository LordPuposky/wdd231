document.getElementById('lastmod').textContent = document.lastModified;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.level-card').forEach((card, idx) => {
        setTimeout(() => { card.classList.add('show'); }, 350 * idx);
    });

    document.getElementById("lastmod").textContent = document.lastModified;
    const tsField = document.getElementById('timestamp');
    if (tsField) tsField.value = new Date().toISOString();

    document.querySelectorAll('.level-info-btn').forEach(btn => {
        btn.onclick = function () {
            const id = this.dataset.modal;
            document.getElementById(id).style.display = 'block';
        }
    });
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.onclick = function () {
            this.closest('.modal').style.display = 'none';
        }
    });
    window.onclick = function (e) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }
});
