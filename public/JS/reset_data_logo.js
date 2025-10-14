// /JS/reset_formdata_on_logo.js
document.addEventListener('DOMContentLoaded', function() {
    // Header y Footer logos
    var logoHeader = document.getElementById('logo-link');
    var logoFooter = document.getElementById('footer-logo-link');
    var calculateAnotherPrice = document.getElementById('calculate-another-price');

    function resetFormDataAndNavigate() {
        sessionStorage.removeItem('formData');
        // Deja que el <a href> haga su trabajo y navegue
    }

    if (logoHeader) {
        logoHeader.addEventListener('click', resetFormDataAndNavigate);
    }
    if (logoFooter) {
        logoFooter.addEventListener('click', resetFormDataAndNavigate);
    }
    if (calculateAnotherPrice) {
        calculateAnotherPrice.addEventListener('click', resetFormDataAndNavigate);
    }
});
