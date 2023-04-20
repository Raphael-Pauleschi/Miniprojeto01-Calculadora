import React from 'react';
import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './src/Style';

export default function App() {
  const buttons = ['LIMPAR','DEL','%','/',7,8,9,'x',4,5,6,'-',1,2,3,'+',0,'.','+/-','=','^ 3','^ 2','^'];

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
          case '%':
            newNumber = (newNumber*1/100) * actualNumber;
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
      case '+': case '-': case 'x': case '/':case '^': case '%':
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

      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ? ( // Mapeamento do botão =
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={[styles.button, { backgroundColor: '#FC3AF3' }]}>
              <Text
                style={[styles.textButton, { color: 'white', fontSize: 30 }]}>
                {button}
              </Text>
            </TouchableOpacity>
          ) : (
            // Mapeamento dos outros botões
            <TouchableOpacity
              onPress={() => handleInput(button)}
              key={button}
              style={styles.button}>
              <Text
                style={[
                  styles.textButton,
                  { color: typeof button === 'number' ? 'white' : '#2E2EFE' },
                ]}>
                {button}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}
