import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

function NothingToShow() {
  return (
    <View style={styles.container}>
      <Text style={styles.label} >
        Nothing to show
          </Text>
    </View>
  )
}

export default NothingToShow