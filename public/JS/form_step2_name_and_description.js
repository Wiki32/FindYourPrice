document.addEventListener('DOMContentLoaded', function () {
    // --- Cambia el título según el rol seleccionado ---
    const data = getFormData();
    const nameTitle = document.querySelector('.name-section h1');
    if (nameTitle && data.role) {
        nameTitle.textContent = (data.role === 'person') ? 'Name' : 'Business Name';
    }

    // --- Nombre
    const nombreInput = document.getElementById('nombre');
    if (nombreInput) {
        // Rellena si ya hay dato
        if (data.nombre) nombreInput.value = data.nombre;

        // Guarda en cada cambio
        nombreInput.addEventListener('input', function() {
            updateFormData({ nombre: nombreInput.value });
        });
    }

    // --- Product Name 
    /* -------- Product Name ------------------------------------------- */
    const prodInput = document.getElementById('productName');
        if (prodInput) {
        // Pre-carga si ya existe
        if (data.productName) prodInput.value = data.productName;

        // Guarda en cada cambio
        prodInput.addEventListener('input', () => {
            updateFormData({ productName: prodInput.value });
        });
    }


    // --- Descripción
    const descripcionInput = document.getElementById('descripcion');
    const charCount = document.getElementById('char-count');
    if (descripcionInput) {
        // Rellena si ya hay dato
        if (data.descripcion) {
            descripcionInput.value = data.descripcion;
            if (charCount) charCount.textContent = `${data.descripcion.length}/800`;
        }

        // Guarda en cada cambio
        descripcionInput.addEventListener('input', function() {
            updateFormData({ descripcion: descripcionInput.value });
            if (charCount) charCount.textContent = `${descripcionInput.value.length}/800`;
        });
    }

    // --- Submit con validación y redirección ---
    const formDescripcion = document.querySelector('.description-section form');
    if (formDescripcion) {
        formDescripcion.addEventListener('submit', function(e) {
            // Si el nombre está vacío, muestra el aviso del campo
            if (!nombreInput.value.trim()) {
                e.preventDefault();
                nombreInput.reportValidity();
                return;
            }
            // Si la descripción está vacía, muestra el aviso del campo
            if (!descripcionInput.value.trim()) {
                e.preventDefault();
                descripcionInput.reportValidity();
                return;
            }
            // Si todo es válido, redirige
            e.preventDefault();
            window.location.href = "free_forms_variable_cost_yn.html";
        });
    }
});


