import events from './events.js'
import render from './render.js'

const calculator = {
    expressionData: '',
    operator: '',
    operand: '0',

    start() {
        events.controllerClick(calculator.handleControllersClick)
    },

    handleControllersClick({ target }) {
        const key = Object.keys(target.dataset)[0]
        const value = Object.values(target.dataset)[0]
        const method = calculator[key]

        if (method) method(value)
    },

    digitNum(num) {
        if (calculator.operand.length >= 12) return
        calculator.increaseDisplayOperand(num)
        render.displayOperand(calculator.operand)
    },

    digitDot(num) {
        if (calculator.operand.includes('.')) return
        calculator.digitNum(num)
    },

    digitBackspace() {
        calculator.decrementDisplayOperand()
        render.displayOperand(calculator.operand)
    },

    digitOper(num) {
        const {expressionData, operator, operand} = calculator
        const completeExpression = expressionData + operator + operand
        
        calculator.changeCompleteExpressionData(completeExpression, num, '0')
        render.allDisplays(calculator)
    },

    digitClear() {
        calculator.changeCompleteExpressionData('', '', '0')
        render.allDisplays(calculator)
    },

    digitPercent() {
        const expressionTotal = eval(calculator.expressionData)
        const percentTotal = expressionTotal / 100 * calculator.operand

        calculator.operand = percentTotal || '0'
        render.displayOperand(calculator.operand)
    },

    digitCalc() {
        const totalExpression = calculator.getTotalValExpression()
        
        calculator.changeCompleteExpressionData('', '', totalExpression)
        render.allDisplays(calculator)
        if(totalExpression === 'Infinity' || totalExpression ===  'NaN') {
            calculator.operand = '0'    
        }
    },

    changeCompleteExpressionData(expression, operator, operand) {
        calculator.expressionData = expression
        calculator.operator = operator
        calculator.operand = operand
    },

    getTotalValExpression() {
        const { expressionData, operator, operand } = calculator
        const expression = expressionData + operator + operand
        return String(Math.round(eval(expression) * 10) / 10)
    },

    decrementDisplayOperand() {
        const lengthOperand = calculator.operand.length
        calculator.operand = lengthOperand <= 1
            ? '0' : calculator.operand.substring(0, lengthOperand - 1)
    },

    increaseDisplayOperand(num) {
        if (num === '') return
        calculator.operand === '0' && num !== '.'
            ? calculator.operand = num
            : calculator.operand += num
    },

}

window.addEventListener('load', calculator.start)