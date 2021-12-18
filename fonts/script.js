let num1 = '0';
let num2 = '0';
let sign = '';
let btn = document.querySelectorAll('button');
let displayField = document.querySelector('.field');
let displaySign = document.querySelector('.display-sign');
let posnegbtn = document.querySelector('.posneg');

btn.forEach((button) => {
    button.addEventListener('click', (value) => {
        calcValue(value.target.textContent);
    })
})

posnegbtn.addEventListener('click', () => {
    displayField.textContent = -parseInt(displayField.textContent); 
})

const add = function(x, y) {
    return +x + +y;
}

const subtract = function(x, y) {
    return x - y;
}

const multiply = function(x, y) {
    return ((x * 10)/10 ) * y;
};

const divide = function (x, y) {
    return x / y;
}

const modulus = function (x , y) {
    return x % y;
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
        case '%':
            return modulus(x, y);
    }
}

function roundNum(num) {
    if (typeof num == 'number') {
        num = Math.round(num + 100000)/100000;
    }
    return num;
}
function calcValue(value) {
    value = roundNum(value);
    if ( value == '+' || value == '-' || value == '/' || value == '*' || value == '%') {
        displaySign.textContent = value;
        sign = value;
        if ( (num1 != '' && num1 != '0') && (num2 != '' && num2 != '0') ) {
            num1 = operate(num1, num2, value);
            displayField.textContent = num1;
            sign = '';
            num2 = '';
        } 
    } else if ( displayField.textContent.includes('.') && value == '.' ) {

    } else if ( value == 'AC' ) {
        num1 = '';
        num2 = '';
        sign = '';
        displayField.textContent = '';
        displaySign.textContent = '';
    } else if ( value == '=') {
        if ((num1 != '' && num1 != '0') && (num2 != '' && num2 != '0')) {
            displaySign.textContent = ''
            num1 = operate(+num1, +num2, sign);
            displayField.textContent = num1;
            sign = '';
            num2 = '';
        }
    } else if ( num2 != '' && num2 != '0' && displayField.textContent != '') {
             if ( displayField.textContent == '0') {
            displayField.textContent = '';
            }
            displayField.textContent += value;
            num2 = displayField.textContent;
    } else if ( ( num2 == '' || num2 == '0' ) && sign != '' ) {
             displayField.textContent = ''; 
             displayField.textContent += value;
             num2 = displayField.textContent;
    } else if ( value != '+/-' ) {
            if ( displayField.textContent == '0') {
                displayField.textContent = '';
            }
        displayField.textContent += value;
        num1 = displayField.textContent;
    }
}

