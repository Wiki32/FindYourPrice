// autosize.js

function autoResizeTextareaById(id) {
    const textarea = document.getElementById(id);
    if (!textarea) return;

    textarea.setAttribute('style', 'height:' + (textarea.scrollHeight) + 'px;overflow-y:hidden;');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    autoResizeTextareaById('descripcion');
});
