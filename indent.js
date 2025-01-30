function validateCreditCard(cardNumber) {
    // Remove all non-digit characters
    cardNumber = cardNumber.replace(/\D/g, '');
    
    // Define regex patterns for different card types
    const cardPatterns = {
        'Walmart': /^4[0-9]{12}(?:[0-9]{3})?$/,
        'Google': /^5[1-5][0-9]{14}$/,
        'Ebay': /^3[47][0-9]{13}$/,
        'Credit Union': /^6(?:011|5[0-9]{2})[0-9]{12}$/
    };
    
    let cardType = '';
    for (let type in cardPatterns) {
        if (cardPatterns[type].test(cardNumber)) {
            cardType = type;
            break;
        }
    }
    
    if (!cardType) return 'Invalid card type';
    
    // Validate using Luhn Algorithm
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    if (sum % 10 === 0) {
        return `Valid ${cardType} card`;
    } else {
        return 'Invalid card number';
    }
}

// Example usage
console.log(validateCreditCard('4111111111111111')); // Walmart
console.log(validateCreditCard('5500000000000004')); // Google
console.log(validateCreditCard('340000000000009'));  // Ebay
console.log(validateCreditCard('6011000000000004')); // Credit Union
console.log(validateCreditCard('0111111111111110')); // Walmart
console.log(validateCreditCard('2300000000000001')); // Google
console.log(validateCreditCard('710000000000010'));  // Ebay
console.log(validateCreditCard('5001000000000001')); // Credit Union
