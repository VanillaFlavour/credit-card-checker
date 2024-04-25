// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


//FUNCTIONS

// Function to validate a credit card number
const validateCred = (cardNumb) => {
  // Create a new array without the last item
  let cardChecker = cardNumb.slice(cardNumb.length <= 0, cardNumb.length - 1);
  // Reverse the array for easier manipulation
  cardChecker.reverse()
  // Iterate through the array from left to right
  for (let i = 0; i < cardChecker.length; i++) {
    // Double every other number
    if (i % 2 === 0) {
      cardChecker[i] *= 2;
    }
    // If the number * 2 is greater than 9, subtract 9
    if (cardChecker[i] > 9) {
      cardChecker[i] -= 9;
    }
  }
  // Add the last digit from the original array
  const lastNumbIndex = cardNumb => {
    let x = cardNumb.length - 1
    return cardNumb[x]
  }
  // Sum all the values (card numbers)
  const totalSum = (x, y) => x + y;
  let sumResult = cardChecker.reduce(totalSum, lastNumbIndex(cardNumb));
  // Check if the total sum modulo 10 is 0 (valid credit card)
  if (sumResult % 10 === 0) {
    return true
  } else return false
}

// Function to find invalid credit card numbers
const findInvalidCards = (nestedCards) => {
  // Array to store invalid card numbers
  let invalidCards = [];
  for (let i = 0; i < nestedCards.length; i++) {
    /* Iterate through each card number array.
     If validateCred returns false, push the card number to invalidCards array */
    if (!validateCred(nestedCards[i])) {
      invalidCards.push(nestedCards[i]);
    }
  }
  return invalidCards;
}

// Function to identify the companies behind invalid credit cards
const idInvalidCardCompanies = (invalidCards) => {
  let companyNames = [];

  // Iterate through each invalid card number and Get the first digit of the card number.
  invalidCards.forEach(firstDig => {
    switch (firstDig.shift()) {
      case 3:
        companyNames.push('Amex (American Express)');
        break;
      case 4:
        companyNames.push('Visa');
        break;
      case 5:
        companyNames.push('Mastercard');
        break;
      case 6:
        companyNames.push('Discover');
        break;
      default:
        companyNames.push('Company not found');
    }
  });
  // Remove duplicate company names
  companyNames = companyNames.filter((companie, index) => {
    return companyNames.indexOf(companie) === index;
  });
  return companyNames;
}


//Testing
let invalid = findInvalidCards(batch);

console.log(idInvalidCardCompanies(invalid))
console.log(findInvalidCards(batch))
console.log(validateCred(valid5));
