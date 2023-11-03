const EMAIL = document.getElementById('email');
const PASSWORD = document.getElementById('password');
const ERROR = document.querySelector('.error-message');
const SUBMIT = document.getElementById('submit');

const users = JSON.parse(localStorage.getItem('users'));

EMAIL.addEventListener('input', function() {validateInputs(EMAIL.value, PASSWORD.value)});
PASSWORD.addEventListener('input', function() {validateInputs(EMAIL.value, PASSWORD.value)});

SUBMIT.addEventListener('click', function() {
    event.preventDefault();
    const email = EMAIL.value;
    const password = PASSWORD.value;
    let isWrongEmail = true;
    let userProfile;
    users.forEach(element => {
        if (element['email'] === email) {
            isWrongEmail = false;
            userProfile = element;
        }
    });
    if (isWrongEmail) {
        ERROR.innerHTML = "You have entered a wrong email";
        return;
    }
    if (userProfile['password'] === password) {
        window.location.href = 'success.html';
    } else {
        ERROR.innerHTML = 'Wrong password';
    }
})

function validateInputs(email, password) {
    if (email.trim() !== '' && password.trim() !== '') {
        SUBMIT.removeAttribute('disabled');
        SUBMIT.classList.add('submit-active');
    } else {
        SUBMIT.setAttribute('disabled', 'true');
        SUBMIT.classList.remove('submit-active')
    }
}