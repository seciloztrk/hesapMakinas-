const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys'); //const ile tanımlanıyor değer değişmeyeceği için. burda class değerleri alınıyor.

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {
    const element = e.target;

    if (!element.matches('button')) return; //ifin anlamı tıklanan yer button değilse işlemlere devam etme. returnden sonraki kodlar işletilmez.

    if(element.classList.contains('operator')){ //sayı butonu mu operatör butonu mu kontrol et 
       // console.log('operator', element.value);
       handleOperator(element.value);
       updateDisplay();
        return;
    }

    if(element.classList.contains('decimal')){ //sayı butonu mu operatör butonu mu kontrol et 
        //console.log('decimal', element.value);
        inputDecimal();
        updateDisplay();
        return;
    }

    if(element.classList.contains('clear')){ //sayı butonu mu operatör butonu mu kontrol et 
       // console.log('clear', element.value);
       clear();
       updateDisplay();
        return;
    }

    //console.log('number', element.value); //son üç if gerçekleşmezse bu çalışır
    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    }else if (operator) {
        const result = calculate(firstValue, value, operator);

       // displayValue = String(result);
        displayValue = `${parseFloat(result.toFixed(7))}`; //virgülden sonra 7 basamak alır.
        firstValue = result;

    }

    waitingForSecondValue = true; //ikinci bir değerin beklendiği bildiriliyor
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }

    return second; //dört koşul çalışmazsa bu durum gerçekleşir
}

function inputNumber(num) {
    if (waitingForSecondValue ) {
        displayValue = num;
        waitingForSecondValue = false;
    }else{
        displayValue = displayValue === '0'? num: displayValue + num;
    }
    
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {
    if (!displayValue.includes('.')){
        displayValue += '.';
    }
    
}

function clear() {
    displayValue = '0';
}