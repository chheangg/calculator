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

/* Accept keyboard input */
window.addEventListener('keydown', (value) => {
    console.log(value.key)
    if (value.key > 0 && value.key < 10 || value.key == '*' || value.key == '/' || value.key == '%' || value.key == 'Enter' 
    || value.key == '+' || value.key == '-' || value.key == 'Backspace' || value.key == 'Space' || value.key == '_') {
        if (value.key == 'Enter') {
            calcValue('=');
        } else if (value.key == 'Backspace') {
            calcValue('C');
        } else if (value.key == 'Space') {
            calcValue('AC');
        } else if (value.key == '_') {
            displayField.textContent = -parseInt(displayField.textContent); 
        } else {
        calcValue(value.key);
        }
    }
})

/* Special buttons event */
posnegbtn.addEventListener('click', () => {
    displayField.textContent = -parseInt(displayField.textContent); 
})

sliceNum.addEventListener('click', () => {
    displayField.textContent = displayField.textContent.slice(displayField.textContent.length)
})

/* Operator function */
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
    if ( y == '0') {
        alert('Pizza time');
        return 0;
    } else {
        return x / y;
    }
}

const modulus = function (x , y) {
    return x % y;
}

/* Operation function */
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

/* Edge case for some float values */
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
    checkPrevious(value);
    /* This checks for operator and then assign the variable sign a value */
        if ( value == '+' || value == '-' || value == '/' || value == '*' || value == '%') {
            displaySign.textContent = value;
            sign = value;
            /* Let's say both num1 and num2 are enter, and an operator is entered again.
             The former operation will run before giving ways to the new ones*/
            if ( (num1 != '' && num1 != '0') && (num2 != '' && num2 != '0') ) {
                num1 = operate(num1, num2, value);
                displayField.textContent = num1;
                num2 = '';
                temp = true;
            } 
            /* Check if the float value already exist, else don't append the . */
        } else if ( value == '.' ) {
            if ( displayField.textContent.includes('.') ) {
            return;
            } else {
                displayField.textContent += value;  
            }
            /* If an AC is entered, clear everything */
        } else if ( value == 'AC' ) {
            num1 = '';
            num2 = '';
            sign = '';
            displayField.textContent = '';
            displaySign.textContent = '';
            /* If an equal is entered, check if both value exists and then do the operation */
        } else if ( value == '=') {
            if ((num1 != '' && num1 != '0') && (num2 != '' && num2 != '0')) {
                displaySign.textContent = ''
                num1 = operate(+num1, +num2, sign);
                displayField.textContent = num1;
                sign = '';
                num2 = '';
                temp = true;
            }
            /* Append the numbers to num2 if a value is already in place */
        }  else if ( num2 != '' && num2 != '0' && displayField.textContent != '') {
                        displayField.textContent += value;
                        num2 = displayField.textContent;
            /* Remove num1 that was still displayed after the operator has been entered if an input has been detected */
        } else if ((( num1 != '' || num1 != '0' ) && sign != '') || (( num1 != '' || num1 != '0' ) && sign != '' &&  temp == true)) {
            /* However, If a '0.' string is in place, don't mistake it for an empty value, but a value to be appended */
            if (displayField.textContent != '0.') {
            displayField.textContent = '';  
            }
            displayField.textContent += value;
            num2 = displayField.textContent;
            /* Don't let the '+/-' value get into the display */
        } else if ( value != '+/-' && value != '+/-' ) {
                if ( displayField.textContent == '0') {
                    displayField.textContent = '';
                }
            /* Append value to num1 normally */
            displayField.textContent += value;
            num1 = displayField.textContent;
        }
}


