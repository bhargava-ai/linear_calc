import { useState } from 'react'

interface CalculatorState {
  display: string
  previousValue: number | null
  operation: string | null
  waitingForNewValue: boolean
}

function Calculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
  })

  function inputNumber(num: string) {
    if (state.waitingForNewValue) {
      setState({
        ...state,
        display: num,
        waitingForNewValue: false,
      })
    } else {
      setState({
        ...state,
        display: state.display === '0' ? num : state.display + num,
      })
    }
  }

  function inputDecimal() {
    if (state.waitingForNewValue) {
      setState({
        ...state,
        display: '0.',
        waitingForNewValue: false,
      })
    } else if (state.display.indexOf('.') === -1) {
      setState({
        ...state,
        display: state.display + '.',
      })
    }
  }

  function clear() {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
    })
  }

  function performOperation(nextOperation: string) {
    const inputValue = parseFloat(state.display)

    if (state.previousValue === null) {
      setState({
        ...state,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForNewValue: true,
      })
    } else if (state.operation) {
      const currentValue = state.previousValue || 0
      const newValue = calculate(currentValue, inputValue, state.operation)

      setState({
        display: String(newValue),
        previousValue: newValue,
        operation: nextOperation,
        waitingForNewValue: true,
      })
    }
  }

  function calculate(firstValue: number, secondValue: number, operation: string): number {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  function handleEquals() {
    const inputValue = parseFloat(state.display)

    if (state.previousValue !== null && state.operation) {
      const newValue = calculate(state.previousValue, inputValue, state.operation)

      setState({
        display: String(newValue),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
      })
    }
  }

  function performUnaryOperation(operation: string) {
    const inputValue = parseFloat(state.display)
    let result: number

    switch (operation) {
      case 'square':
        result = inputValue * inputValue
        break
      case 'sqrt':
        result = Math.sqrt(inputValue)
        break
      case 'cbrt':
        result = Math.cbrt(inputValue)
        break
      default:
        return
    }

    setState({
      display: String(result),
      previousValue: null,
      operation: null,
      waitingForNewValue: true,
    })
  }

  const buttonClasses = "h-16 text-xl font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
  const numberButtonClasses = `${buttonClasses} bg-white text-gray-800 hover:bg-gray-100`
  const operatorButtonClasses = `${buttonClasses} bg-purple-600 text-white hover:bg-purple-700`
  const clearButtonClasses = `${buttonClasses} bg-red-500 text-white hover:bg-red-600`
  const equalsButtonClasses = `${buttonClasses} bg-green-500 text-white hover:bg-green-600`
  const functionButtonClasses = `${buttonClasses} bg-blue-600 text-white hover:bg-blue-700`

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <div className="mb-4">
        <div className="bg-gray-900 text-white text-right p-6 rounded-lg font-mono text-3xl font-bold min-h-[80px] flex items-center justify-end overflow-x-auto">
          {state.display}
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={() => performUnaryOperation('square')}
          className={functionButtonClasses}
        >
          x²
        </button>
        <button
          onClick={() => performUnaryOperation('sqrt')}
          className={functionButtonClasses}
        >
          √x
        </button>
        <button
          onClick={() => performUnaryOperation('cbrt')}
          className={functionButtonClasses}
        >
          ∛x
        </button>
        <button
          onClick={clear}
          className={clearButtonClasses}
        >
          C
        </button>

        <button onClick={() => inputNumber('7')} className={numberButtonClasses}>
          7
        </button>
        <button onClick={() => inputNumber('8')} className={numberButtonClasses}>
          8
        </button>
        <button onClick={() => inputNumber('9')} className={numberButtonClasses}>
          9
        </button>
        <button
          onClick={() => performOperation('/')}
          className={operatorButtonClasses}
        >
          ÷
        </button>

        <button onClick={() => inputNumber('4')} className={numberButtonClasses}>
          4
        </button>
        <button onClick={() => inputNumber('5')} className={numberButtonClasses}>
          5
        </button>
        <button onClick={() => inputNumber('6')} className={numberButtonClasses}>
          6
        </button>
        <button
          onClick={() => performOperation('*')}
          className={operatorButtonClasses}
        >
          ×
        </button>

        <button onClick={() => inputNumber('1')} className={numberButtonClasses}>
          1
        </button>
        <button onClick={() => inputNumber('2')} className={numberButtonClasses}>
          2
        </button>
        <button onClick={() => inputNumber('3')} className={numberButtonClasses}>
          3
        </button>
        <button
          onClick={() => performOperation('-')}
          className={operatorButtonClasses}
        >
          −
        </button>

        <button
          onClick={() => inputNumber('0')}
          className={`${numberButtonClasses} col-span-2`}
        >
          0
        </button>
        <button onClick={inputDecimal} className={numberButtonClasses}>
          .
        </button>
        <button
          onClick={() => performOperation('+')}
          className={operatorButtonClasses}
        >
          +
        </button>

        <button
          onClick={handleEquals}
          className={`${equalsButtonClasses} col-span-4`}
        >
          =
        </button>
      </div>
    </div>
  )
}

export default Calculator

