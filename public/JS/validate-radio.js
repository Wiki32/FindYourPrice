document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('nextBtn');
    if (!nextBtn) return;

    nextBtn.addEventListener('click', function(event) {
        const form = document.querySelector('.single-choice-form');
        if (!form) return;

        if (!form.checkValidity()) {
            form.reportValidity();
            event.preventDefault();
        }
        // Si es válido, deja navegar normalmente
    });
});
