// form_step1_role.js

document.addEventListener('DOMContentLoaded', function () {
    // Preselecciona si hay datos guardados
    const data = getFormData();
    if (data.role) {
        const radio = document.querySelector(`input[name="role"][value="${data.role}"]`);
        if (radio) radio.checked = true;
    }

    // Guarda el rol al enviar el formulario
    const form = document.querySelector('.single-choice-form');
    form.addEventListener('submit', function() {
        const selected = document.querySelector('input[name="role"]:checked').value;
        updateFormData({role: selected});
        // No uses e.preventDefault() aquí, deja que navegue a la siguiente página
    });
});
