class MyCalculator {
    constructor(previousValueTextElement, currentValueTextElement) {
        this.previousValueTextElement = previousValueTextElement
        this.currentValueTextElement = currentValueTextElement
        this.clearScreen()
    }
    clearScreen() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    deleteLastNumber() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number) {
        // Add 0 at the beginning if numbers start with ('.')
        if(number.startsWith('.')) this.currentOperand = '0' + this.currentOperand.toString()
        // Verify if the dot is clicked or the number already contains the dot [no action]
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperator(operation) {
        if(this.currentOperand === '' || this.currentOperand === undefined) return
        if(this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    // Method to handle the arithmetic calculation
    calculate() {
        let result
        const previousValue = parseFloat(this.previousOperand) 
        const currentValue = parseFloat(this.currentOperand) 
        if(isNaN(previousValue) || isNaN(currentValue)) return
        // Swutch statement to handle different operations
        switch(this.operation) {
            case '+':
                result =  previousValue + currentValue
            break
            case '*':
                result =  previousValue * currentValue
            break
            case '-':
                result =  previousValue - currentValue
            break
            case '/':
                result =  previousValue / currentValue
            break
            default:
                return
        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    // Method to update the output result
    updateDisplay() {
        this.currentValueTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousValueTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousValueTextElement.innerText = ''
        }
    }
}

// Get all variables
const numberBtns = document.querySelectorAll('[data-number]')
const operationBtns = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const clearScreenBtn = document.querySelector('[data-clear-all]')
const previousValueTextElement = document.querySelector('[data-previous-value]')
const currentValueTextElement = document.querySelector('[data-actual-value]')

const calculator = new MyCalculator(previousValueTextElement, currentValueTextElement)

// The forEach() method executes a function once for each [button number]
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

// The forEach() method executes a function once for each operation [+,-,*,/]
operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})

// method is to register an event listener for equal button
equalButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateDisplay()
})

// Clear the screen [the output result]
clearScreenBtn.addEventListener('click', button => {
    calculator.clearScreen()
    calculator.updateDisplay()
    
})
// Delete last added number 
deleteBtn.addEventListener('click', button => {
    calculator.deleteLastNumber()
    calculator.updateDisplay()
})


// Allow user to use the keyboard
window.addEventListener('keydown', (e) => {
    if(
        // Allow user to use the keyboard numbers [0,1,2,3,4,5,6,7,8,9]
        e.key === '0' || e.key === '1' || e.key === '2' || 
        e.key === '3' || e.key === '4' || e.key === '5' || 
        e.key === '6' || e.key === '7' || e.key === '8' || 
        e.key === '9' || e.key === '.'
    ) {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    } else if (
        // Allow user to use the keyboard operators [+,*,-,/] 
        e.key === '*' || e.key === '+' || e.key === '-' || e.key === '/'
    ) {
        calculator.chooseOperator(e.key)
        calculator.updateDisplay()
    } else if ( e.key === 'Enter') {
        // Allow user to use the keyboard ['Enter'] to get result
        calculator.calculate()
        calculator.updateDisplay()
    } else if ( e.key === 'c' || e.key === 'C' || e.key === 'delete') {
        // Allow user to use the keyboard ['c','C', 'delete'] to clear screen
        calculator.clearScreen()
        calculator.updateDisplay()
    } else if ( e.key === 'd' || e.key === 'D' || e.key === 'Backspace') {
        // Allow user to use the keyboard  ['d','D'] to delete last number
        calculator.deleteLastNumber()
        calculator.updateDisplay()
    } else {
        // Do not allow user to use other keys than the predefined ones
        alert('🚫 This key is not allowed 🚫')
    }
})

// Disable right-click
document.addEventListener('contextmenu', (e) => e.preventDefault());

function ctrlShiftKey(e, keyCode) {
  return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
}

document.onkeydown = (e) => {
  // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
  if (
    event.keyCode === 123 ||
    ctrlShiftKey(e, 'I') ||
    ctrlShiftKey(e, 'J') ||
    ctrlShiftKey(e, 'C') ||
    (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
  )
    return false;
};