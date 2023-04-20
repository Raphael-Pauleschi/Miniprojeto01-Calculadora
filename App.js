import React from 'react';
import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './src/Style';
import CalculatorButtons from './src/CalculatorButtons'

export default function App() {
  const buttons = ['LIMPAR','DEL','%','/',7,8,9,'x',4,5,6,'-',1,2,3,'+',0,'.','+/-','=','^ 3','^ 2','^',];
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    let operator = ' ';
    let actualNumber = 0;
    let newNumber = parseFloat(splitNumbers[0]);
    let index = 1;
    while (index <= splitNumbers.length - 1) {
      operator = splitNumbers[index];
      actualNumber = parseFloat(splitNumbers[index + 1]);

      //Verifica se o número é um número
      if (!isNaN(actualNumber)) {
        // Faz ação referente tecla pressionada
        switch (operator) {
          case '+':
            newNumber = newNumber + actualNumber;
            break;
          case '-':
            newNumber = newNumber - actualNumber;
            break;
          case 'x':
            newNumber = newNumber * actualNumber;
            break;
          case '/':
            newNumber = newNumber / actualNumber;
            break;
          case '^':
            newNumber = Math.pow(newNumber, actualNumber);
            break;
        }

        index = index + 2;
      } else {
        return;
      }
    }

    setCurrentNumber(newNumber.toString());
  }

  function handleInput(buttonPressed) {
    switch (buttonPressed) {
      case '+': case '-': case 'x': case '/':case '^':
        setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
        return;
      case '^ 2': case '^ 3':
        setCurrentNumber(currentNumber + ' ' + buttonPressed);
        return;
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '+/-':
        setCurrentNumber((-1 * currentNumber).toString());
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

    <CalculatorButtons
    buttons = {buttons}
    action = {handleInput}
    />
    </View>
  );
}
