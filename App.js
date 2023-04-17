import React from 'react';
import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=','^3', '^2','^',]

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator() {
    const splitNumbers = currentNumber.split(' ')
    const firstNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString())
        return
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString())
        return
      case 'x':
        setCurrentNumber((firstNumber * lastNumber).toString())
        return
      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString())
        return
      case '^2':
        setCurrentNumber((Math.pow(firstNumber,2)).toString())
        return
      case '^3':
      setCurrentNumber((Math.pow(firstNumber,3)).toString())
      return
      case '^':
      setCurrentNumber((Math.pow(firstNumber, lastNumber)).toString())
      return
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if (buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/"
    | buttonPressed === '^2' | buttonPressed === '^3' | buttonPressed === '^' ) {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("")
        setCurrentNumber("")
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        setCurrentNumber((-1 * currentNumber).toString())
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) =>
          button === '=' ? // Mapeamento do botão =
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, { backgroundColor: '#FC3AF3' }]}>
              <Text style={[styles.textButton, { color: "white", fontSize: 30 }]}>{button}</Text>
            </TouchableOpacity>
            : // Mapeamento dos outros botões
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
              <Text style={[styles.textButton, { color: typeof (button) === 'number' ? 'white' : '#2E2EFE' }]}>{button}</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#FC3AF3"
  },
  resultText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText: {
    color: "#E34243",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#8A29E6',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#E34243",
    fontSize: 20,
  }
});