// --- Funciones de sessionStorage ---
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
    const radios = document.querySelectorAll('.radio-option input[type="radio"]');
    const inputContainer = document.getElementById('custom-input-container');
    const customInput = document.getElementById('custom-input');
    const charCount = document.getElementById('char-count');
    const formData = getFormData();

    // --- 1. Restaurar selección al cargar ---
    if (formData.selling_site) {
        radios.forEach(radio => {
            if (radio.value === formData.selling_site) {
                radio.checked = true;
                inputContainer.style.display = 'block';
                customInput.placeholder = `Add details for "${radio.parentNode.querySelector('span').innerText}" (Optional)`;
            }
        });
    }

    // --- 2. Restaurar detalles al cargar ---
    if (formData.custom_input && formData.last_selling_site === formData.selling_site) {
        customInput.value = formData.custom_input;
        charCount.textContent = `${customInput.value.length}/200`;
    }

    // --- 3. Guardar selección de sitio de venta ---
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            const site = this.value;
            updateFormData({ selling_site: site });
            updateFormData({ last_selling_site: site });

            inputContainer.style.display = 'block';
            customInput.placeholder = `Add details for "${this.parentNode.querySelector('span').innerText}" (Optional)`;

            const data = getFormData();
            if (data.custom_input && data.last_selling_site === site) {
                customInput.value = data.custom_input;
                charCount.textContent = `${this.value.length}/200`;
            } else {
                customInput.value = '';
                charCount.textContent = '0/200';
            }
        });
    });

    // --- 4. Guardar detalles mientras el usuario escribe ---
    if (customInput) {
        customInput.addEventListener('input', function() {
            updateFormData({ custom_input: this.value, last_selling_site: getSelectedSite() });
            charCount.textContent = `${this.value.length}/200`;
        });
    }

    function getSelectedSite() {
        for (const radio of radios) {
            if (radio.checked) return radio.value;
        }
        return '';
    }

    // --- 5. Redirigir al hacer click en Calculate ---
    const calculateBtn = document.getElementById('send-to-chatgpt');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Ya hemos guardado los datos, ahora redirigimos
            window.location.href = 'free_final_price.html';
        });
    }
});