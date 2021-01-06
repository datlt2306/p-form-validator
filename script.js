const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $('#form');
const username = $('#username');
const email = $('#email');
const password = $('#password');
const password2 = $('#password2');


const showError = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerHTML = message;
}
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}
const checkRequired = (inputArr) => {
    inputArr.forEach(input => {
        if(input.value.trim() === ''){
            showError(input,`${getName(input)} is required`);
        }
    });
};
const checkLength = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, `Không được nhỏ hơn giá trị ${min}` )
    } else if(input.value.length > max) {
        showError(input, `Không được lớn hơn giá trị ${max}` )
    } else {
        showSuccess(input);
    }
}
const checkEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)){
        showSuccess(email)
    } else {
        showError(email, 'Email is not valid');
    }
}
const checkPasswordMatch = (input1, input2) => {
    if( input1.value !== input2.value){
        showError(input2, 'Password không giống');
    }
}
const getName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkPasswordMatch(password, password2);
    checkLength(username, 3, 5);
    checkEmail(email);
    checkRequired([username, email, password, password2]);
});