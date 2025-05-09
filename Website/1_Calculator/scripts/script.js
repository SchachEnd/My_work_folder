const result = document.getElementById('result');
let currentResult = '0';
let resultFontSize = result.style.fontSize;

function clearDisplay() {
    currentResult = '0';
    result.style.fontSize = resultFontSize;
    updatingDisplay();
}

function plusAndMinusToDisplay() {
    // Находим последнее число в выражении (может быть с минусом и может содержать точку)
    const lastNumberMatch = currentResult.match(/([+\-×÷]?)(-?\d+\.?\d*)$/);
    
    if (!lastNumberMatch) return;
    
    const [fullMatch, operator, number] = lastNumberMatch;
    
    // Игнорируем если число 0
    if (number === '0') return;
    
    const newNumber = number.startsWith('-') ? number.substring(1) : '-' + number;
    const startPos = currentResult.length - fullMatch.length;
    
    currentResult = currentResult.substring(0, startPos) + (operator || '') + newNumber;
    updatingDisplay();
}

function appendToDisplay(value) {
    if (currentResult === '0' && value !== '.') {
        currentResult = value;
    } else {
        currentResult += value;
    }
    updatingDisplay();
}

function resultDisplay() {
    try {
        // Заменяем все символы × на * и ÷ на / для корректного вычисления
        const expression = currentResult.replace(/×/g, '*').replace(/÷/g, '/');
        currentResult = eval(expression).toString();
        updatingDisplay();
    } catch (error) {
        currentResult = 'Error';
        updatingDisplay();
        // Через 1 секунду очищаем ошибку
        setTimeout(clearDisplay, 1000);
    }
}

function updatingDisplay() {
    switch (currentResult.length) {
        case 8:
            result.style.fontSize = 'calc(64px - 16px)';
            break;

        case 10:
            result.style.fontSize = 'calc(64px - 32px)';
            break;

        case 16:
            result.style.fontSize = 'calc(64px - (32px + 12px))';
            break;
    }
    result.textContent = currentResult;
}