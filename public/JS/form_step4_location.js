function getFormData() {
    return JSON.parse(sessionStorage.getItem('formData')) || {};
}
function setFormData(data) {
    sessionStorage.setItem('formData', JSON.stringify(data));
}
function updateFormData(newFields) {
    const current = getFormData();
    const updated = {...current, ...newFields};
    setFormData(updated);
}

document.addEventListener('DOMContentLoaded', function () {
    // 1. Rellenar valores guardados
    const data = getFormData();

    // LOCATION
    const locationInput = document.getElementById('location');
    if (locationInput) {
        if (data.location) locationInput.value = data.location;

        // Guardar en cada cambio
        locationInput.addEventListener('input', function() {
            updateFormData({ location: locationInput.value });
        });
    }

    // CURRENCY
    const currencyValueInput = document.getElementById('currency-value');
    const dropdownValue = document.getElementById('dropdown-value');
    if (currencyValueInput && data.currency) {
        currencyValueInput.value = data.currency;
        if (dropdownValue) dropdownValue.textContent = data.currency;
    }

    // Si tu custom dropdown usa eventos JS, asegúrate de llamar updateFormData({currency: ...}) en el handler que seleccione la moneda.
    // Por si acaso, aquí un ejemplo simple:
    if (currencyValueInput) {
        currencyValueInput.addEventListener('change', function() {
            updateFormData({ currency: currencyValueInput.value });
            if (dropdownValue) dropdownValue.textContent = currencyValueInput.value;
        });
    }

    // 2. Validación y siguiente paso al enviar
    const formLocation = document.querySelector('.text-form-location');
    const formCurrency = document.querySelector('.description-section .text-form');

    // OPCIÓN 1: Validar ambos al pulsar "Next" (solo currency tiene Next)
    if (formCurrency) {
        formCurrency.addEventListener('submit', function(e) {
            // Evita que recargue la página
            e.preventDefault();

            // Chequea location también (aunque está en otro form)
            if (!locationInput.value.trim()) {
                locationInput.reportValidity();
                locationInput.focus();
                return;
            }

            // Chequea currency
            if (!currencyValueInput.value.trim() || currencyValueInput.value === "") {
                // Intenta activar validación nativa
                document.getElementById('currency-helper').reportValidity?.();
                // O resalta visualmente si es necesario
                if (dropdownValue) dropdownValue.style.color = "red";
                return;
            }

            // Si todo OK, ve al siguiente paso
            window.location.href = "free_forms_selling_site.html"; // Cambia a tu siguiente página
        });
    }

    // OPCIÓN 2: (Opcional) Evita que el form de location recargue la página por error (si piden Enter)
    if (formLocation) {
        formLocation.addEventListener('submit', function(e) {
            e.preventDefault();
            // NO navega, solo evita reload
        });
    }
});
