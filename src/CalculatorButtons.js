import React from 'react'
import styles from './Style'
import {View, TouchableOpacity,Text} from 'react-native'

export default Comp =>{
  return(
  <View style={styles.buttons}>
        {Comp.buttons.map((button) =>
          button === '=' ? ( // Mapeamento do botão =
            <TouchableOpacity
              onPress={() => Comp.action(button)}
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
              onPress={() => Comp.action(button)}
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
  )
}