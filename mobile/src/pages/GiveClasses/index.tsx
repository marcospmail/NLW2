import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, ImageBackground, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import giveClassesBgImage from '../../assets/images/give-classes-background.png'

import styles from './styles'

function GiveClasses() {
  const { goBack } = useNavigation()

  function handleNavigateBack() {
    goBack()
  }

  return (
    <View style={styles.container}>
        <ImageBackground source={giveClassesBgImage} style={styles.content}>


          <Text style={styles.title}>Want to teach?</Text>
          <Text style={styles.description}>
            To start, first you need to register in our website.
          </Text>
        </ImageBackground>

        <RectButton style={styles.okButton} onPress={handleNavigateBack}>
          <Text style={styles.okButtonText}>
            Alright!
          </Text>
        </RectButton>
    </View>
  )
}

export default GiveClasses