function enablebuttons(){
var radios = document.querySelectorAll('[name=customRadioInline1]');
Array.from(radios).forEach(function (r) {
    r.addEventListener('click', function () {
        var priceEl = document.getElementById('price');
        if (this.id == 'sell')
            priceEl.removeAttribute('disabled');
        else
            priceEl.setAttribute('disabled', 'disabled');
    });
});
}