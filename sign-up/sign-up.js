const FIRST_NAME = document.getElementById('firstName');
const LAST_NAME = document.getElementById('lastName');
const USER_NAME = document.getElementById('userName');
const BIRTH_DATE = document.getElementById('birthDate');
const GENDER = document.getElementById('gender');
const ENGLISH = document.getElementById('English');
const RUSSIAN = document.getElementById('Russian');
const UZBEK = document.getElementById('Uzbek');
const PHONE_NUMBER = document.getElementById('phoneNumber');
const EMAIL = document.getElementById('email');
const PASSWORD = document.getElementById('password');
const PASSWORD_CONFIRMATION = document.getElementById('passwordConfirmation');
const SUBMIT_BUTTON = document.getElementById('submit');

const users = JSON.parse(localStorage.getItem('users')) || [];
console.log(users);

class User {
    constructor (firstName, lastName, username, birthDate, gender, knowsEnglish, knowsRussian, knowsUzbek, phoneNumber, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.birthDate = birthDate;
        this.gender = gender;
        this.knowsEnglish = knowsEnglish; 
        this.knowsRussian = knowsRussian;
        this.knowsUzbek = knowsUzbek;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
    }
}

SUBMIT_BUTTON.addEventListener('click', function() {
    const errors = document.getElementById('errors');
    errors.innerHTML = '';
    const firstName = FIRST_NAME.value;
    const lastName = LAST_NAME.value;
    const userName = USER_NAME.value;
    const birthDate = BIRTH_DATE.value;
    const gender = GENDER.value;
    const knowsEnglish = ENGLISH.checked;
    const knowsRussian = RUSSIAN.checked;
    const knowsUzbek = UZBEK.checked;
    const phoneNumber = PHONE_NUMBER.value;
    const email = EMAIL.value;
    const password = PASSWORD.value;
    const passwordConfirmation = PASSWORD_CONFIRMATION.value;
    if (!firstName) {
        addError('Enter a valid first name');
        firstName = ''; 
        return; 
    };
    if (!lastName) {
        addError('Enter a valid last name');
        lastName = '';
        return
    };
    if (!userName) {
        addError('Enter a valid username');
        userName = '';
        return 
    };
    if (!birthDate) {
        addError('Enter a valid birthDate');
        birthDate = '';
        return;
    }
    if (gender == 'notChosen') {
        addError('Choose your gender');
        return;
    }
    if (!phoneNumber) {
        addError('You must enter your phone number');
        return;
    }
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
        addError('Invalid email address');
        return;
    }
    if (isAlreadyRegistered(email)) {
        addError('User with this email already exists');
        return;
    }
    if (password != passwordConfirmation) {
        addError("Your passwords don't match");
        password = '';
        passwordConfirmation = ''; 
        return;
    }  
    const user = new User(firstName, lastName, userName, birthDate, gender, knowsEnglish, knowsRussian, knowsUzbek, phoneNumber, email, password);
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    window.location.href = 'success.html';
})

function addError(errorMessage) {
    const errors = document.getElementById('errors');
    const li = document.createElement('li');
    li.innerHTML = errorMessage;
    errors.appendChild(li);
}

function isAlreadyRegistered(email) {
    let isRegistered = false;
    users.forEach(element => {
        if (element.email == email) {
            isRegistered = true;
            return;
        };
    });
    return isRegistered;
}