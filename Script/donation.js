const confirmDonation = document.getElementById('donation-confirm-button');

const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const creditCardNumber = document.getElementById('cc-number-input');
const creditCardExp = document.getElementById('cc-exp-input');
const creditCardCVC = document.getElementById('cc-cvc-input');
const donationsForm = document.getElementById('donations-form');

const fieldsToCheck = [nameInput,emailInput,creditCardNumber,creditCardCVC,creditCardExp];

confirmDonation.addEventListener('click',(e) => {
    if(inputValidation())
    {
        window.alert('Thanks for you generous donation!');
        donationsForm.submit();
    }
    else e.preventDefault();
});

function inputValidation(){
    let valid = true;
    fieldsToCheck.forEach(e => {
        if(e.value === '' || e.value === 0){
            e.classList.add('donation-input-error');
            valid = false;
        }
    });
    return valid;
}

(function(){
    fieldsToCheck.forEach(e =>{
        e.addEventListener('focusout',(e) => {
            if(e.target.value !== '' && e.target.classList.contains('donation-input-error')){
                e.target.classList.remove('donation-input-error')
            }
        })
    })
})();
