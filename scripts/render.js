import el from "./domElements.js"

export default {
    displayExpression(expressionData) {
        const formatedExpression = this.replaceSymbols(expressionData)
        el.displayExpression.textContent = formatedExpression
    },

    displayOperator(operatorData) {
        const formatedOperator = this.replaceSymbols(operatorData)
        el.displayOperator.textContent = formatedOperator
    },

    displayOperand(operandData) {
        this.resizeDisplayOperand(operandData)
        if (operandData === 'Infinity') {
            el.displayOperand.textContent = 'Não é possível dividir por zero'
        } else if(operandData === 'NaN') {
            el.displayOperand.textContent = 'Resultado indefinido'
        } else {
            el.displayOperand.textContent = operandData
        }
    },

    allDisplays({ expressionData, operator, operand }) {
        this.displayExpression(expressionData)
        this.displayOperator(operator)
        this.displayOperand(operand)
    },

    replaceSymbols(expression) {
        return expression.replaceAll('*', 'x').replaceAll('/', '÷')
    },

    resizeDisplayOperand(operandData) {
        operandData.length >= 9 || operandData === 'Infinity' || operandData === 'NaN'
            ? el.displayOperand.classList.add('small')
            : el.displayOperand.classList.remove('small')
    },
}