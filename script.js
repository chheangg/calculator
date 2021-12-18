let num1 = '0';
let num2 = '0';
let temp = '';
let sign = '';
const btn = document.querySelectorAll('button');
const displayField = document.querySelector('.field');
const displaySign = document.querySelector('.display-sign');
const posnegbtn = document.querySelector('.posneg');
const sliceNum = document.querySelector('.slice-num');


btn.forEach((button) => {
    button.addEventListener('click', (value) => {
        calcValue(value.target.textContent);
    })
})

posnegbtn.addEventListener('click', () => {
    displayField.textContent = -parseInt(displayField.textContent); 
})

sliceNum.addEventListener('click', () => {
    displayField.textContent = displayField.textContent.slice(displayField.textContent.length)
})

const add = function(x, y) {
    return +x + +y;
}

const subtract = function(x, y) {
    return x - y;
}

const multiply = function(x, y) {
    return (((x * 10) * y)/10 );
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

/* Check if there has been an operation */
function checkPrevious(value) {
    if ( temp == true && typeof +value == 'number') {
        displayField.textContent = '';
        num2 = '';
        sign = '';
        temp = false;
    }
}

function calcValue(value) {
    value = roundNum(value);
        if ( value == '+' || value == '-' || value == '/' || value == '*' || value == '%') {
            displaySign.textContent = value;
            sign = value;
            if ( (num1 != '' && num1 != '0') && (num2 != '' && num2 != '0') ) {
                num1 = operate(num1, num2, value);
                displayField.textContent = num1;
                num2 = '';
                temp = true;
            } 
        } else if ( value == '.' ) {
            if ( displayField.textContent.includes('.') ) {
            return;
            } else {
                displayField.textContent += value;  
            }
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
                temp = true;
            }
        }  else if ( num2 != '' && num2 != '0' && displayField.textContent != '') {
                        displayField.textContent += value;
                        num2 = displayField.textContent;
        } else if ((( num1 != '' || num1 != '0' ) && sign != '') || (( num1 != '' || num1 != '0' ) && sign != '' &&  temp == true)) {
        
            if (displayField.textContent != '0.') {
            displayField.textContent = '';  
            }
            displayField.textContent += value;
            num2 = displayField.textContent;
        } else if ( value != '+/-' && value != '+/-' ) {
                if ( displayField.textContent == '0') {
                    displayField.textContent = '';
                }
            displayField.textContent += value;
            num1 = displayField.textContent;
        }
}


