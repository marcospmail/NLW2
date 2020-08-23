import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import api from '../../services/api'

import styles from './styles'

const Landing: React.FC = () => {
  const [connectionsCount, setConnectionsCount] = useState(0)

  useEffect(() => {
    async function fetchConnectionsCount() {
      const { data } = await api.get('connections')

      setConnectionsCount(data.total)
    }

    fetchConnectionsCount()
  }, [])

  const { navigate } = useNavigation()

  function handleGoToGiveClassesPage() {
    navigate('GiveClasses')
  }

  function handleGoToStudyPage() {
    navigate('Study')
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Welcome, {'\n'}
        <Text style={styles.titleBold}>What do you wish?</Text>
      </Text>

      <View style={styles.buttonsContainer}>

        <RectButton onPress={handleGoToStudyPage} style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Study</Text>
        </RectButton>

        <RectButton onPress={handleGoToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Teach</Text>
        </RectButton>

      </View>

      <Text style={styles.totalConnections}>
        {connectionsCount > 0 ? `${connectionsCount} connections already made  ` : 'no connection made yet  '}
        <Image source={heartIcon} />
      </Text>

    </View >
  )
}

export default Landing