import React, { ReactNode } from 'react'
import { View, Image, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

import styles from './styles'

interface PageHeaderProps {
  title: string,
  headerRight?: ReactNode
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, headerRight, children }) => {
  const { goBack } = useNavigation()

  function handleGoBack() {
    goBack()
  }

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>

        <RectButton onPress={handleGoBack}>
          <Image source={backIcon} resizeMode="contain" />
        </RectButton>

        <Image source={logoImg} resizeMode="contain" />

      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>

      {children} 

    </View>
  )
}

export default PageHeader