document.addEventListener('DOMContentLoaded', function () {
    // Opcional: No preselecciones nada para que empiece en blanco
    // const data = getFormData();
    // if (data.variable_costs_yesno) {
    //     const radio = document.querySelector(`input[name="variable_costs_yesno"][value="${data.variable_costs_yesno}"]`);
    //     if (radio) radio.checked = true;
    // }

    const form = document.getElementById('variable-cost-form');
    const radios = form.querySelectorAll('input[name="variable_costs_yesno"]');
    const extraContainer = document.getElementById('extra-container');
    const nextBtnDefault = document.getElementById('next-btn-default');
    const nextBtnExtra = document.getElementById('next-btn-extra');

    // Mostrar/ocultar el container extra y botón next según selección
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') { // "Yes"
                extraContainer.style.display = '';
                nextBtnDefault.style.display = 'none';
            } else {
                extraContainer.style.display = 'none';
                nextBtnDefault.style.display = '';
            }
        });
    });

    // Guarda el rol al enviar el formulario "normal"
    form.addEventListener('submit', function(e) {
        const selected = form.querySelector('input[name="variable_costs_yesno"]:checked');
        if (selected) updateFormData({role: selected.value});
        // Si se está mostrando el extra, previene submit aquí
        if (selected && selected.value === 'yes') {
            e.preventDefault(); // No hacer submit aquí, se hace con el extra
        }
        // Si es "no", deja hacer submit normalmente
    });

    // Envía a la siguiente página desde el botón "extra"
    nextBtnExtra.addEventListener('click', function(e){
        e.preventDefault();
        // Aquí puedes validar tus campos extra si los pones
        window.location.href = "free_forms_location_currency.html";
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('variable-costs');
    if (textarea) {
        textarea.addEventListener('input', function () {
            // Permite solo números, puntos, comas y espacios
            this.value = this.value.replace(/[^0-9.,\s]/g, '');
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('variable-costs-form');
    if (!form) return;
    const textarea = document.getElementById('variable-costs');
    const currencyValue = document.getElementById('currency-value');
    const currencyHelper = document.getElementById('currency-helper');

    form.addEventListener('submit', function(e) {
        const regex = /^[0-9.,\s]+$/;
        const value = textarea.value.trim();
        const currency = currencyValue.value.trim();

        // Si hay texto, pero no es válido (solo números, puntos, comas)
        if (value && !regex.test(value)) {
            e.preventDefault();
            textarea.setCustomValidity("Please enter only numbers, dots, and commas.");
            textarea.reportValidity();
            return false;
        } else {
            textarea.setCustomValidity(""); // Limpia el error si es válido
        }

        // Si hay número y no hay moneda, fuerza el error nativo
        if (value !== '' && regex.test(value) && !currency) {
            currencyHelper.value = '';
            currencyHelper.focus();
            e.preventDefault();
            return false;
        }
        // Si todo bien, sincroniza helper (por si era el último campo requerido)
        currencyHelper.value = currency;
    });
});

// form_step3_variable_cost.js
document.getElementById('next-btn-extra').addEventListener('click', function() {
    const value = document.getElementById('variable-costs').value.trim();
    const currency = document.getElementById('currency-value').value.trim();
    const yesno = document.querySelector('input[name="variable_costs_yesno"]:checked');    updateFormData({ 
        'variable_costs_yesno': yesno, // Asumiendo que el usuario eligió "yes"
        'variable-costs': value,
        'variable-costs-currency': currency // Puedes poner el nombre que prefieras
    });
    window.location.href = 'free_forms_location_currency.html';
});


