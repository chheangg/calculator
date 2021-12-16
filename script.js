let nums = [];
let btn = document.querySelectorAll('button');
let displayField = document.querySelector('.field');
let displaySign = document.querySelector('.display-sign');

btn.forEach((button) => {
    button.addEventListener('click', (value) => {
        displayValue(value.target.textContent);
    })
})


const add = function(x, y) {
    return x + y;
}

const subtract = function(x, y) {
    return x - y;
}

const multiply = function(x, y) {
    return x * y;
};

const divide = function (x, y) {
    return x / y;
}

function operate(x, y, sign) {
    switch(sign) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break;
        case '*':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break;
    }
}

function displayValue(value) {
    if ( value == '+' || value == '-' || value == '/' || value == '*' || value == '=') {
        displaySign.textContent = value;
        displayField.textContent = '';
    } else {
        displayField.textContent += value;
    }
}

