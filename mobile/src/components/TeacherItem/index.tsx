import React, { useState, useEffect } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'
import defaultAvatar from '../../assets/images/avatar.png'

import { useFavoritesContext } from '../../context/Favorites';

import styles from './styles'

export interface ScheduleProps {
  week_day: number,
  from: string,
  to: string
}

export interface TeacherProps {
  id?: number,
  name: string,
  avatar: string,
  whatsapp: string,
  bio: string,
  subject: string,
  schedule: Array<ScheduleProps>
}

export interface ClassProps extends TeacherProps {
  class_id: number
  cost: number,
}

export interface TeacherItemProps {
  teacherClass: ClassProps,
  favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacherClass, favorited }) => {
  const { favoriteClasses, setFavoriteClasses } = useFavoritesContext()

  const [isFavorited, setIsFavorited] = useState<boolean>(favorited)

  useEffect(() => { setIsFavorited(favorited) }, [favorited])

  const teacherHasAvatar = !!teacherClass.avatar

  async function handleToggleFavorited() {
    let newFavorites;

    if (isFavorited) {
      newFavorites = favoriteClasses.filter(f => f.id !== teacherClass.id)
    }
    else {
      newFavorites = [...favoriteClasses, teacherClass]
    }

    setFavoriteClasses(newFavorites)
    setIsFavorited(!isFavorited)
  }

  function handleWhatsappContactButtonPressed() {
    Linking.openURL(`whatsapp://send?phone=${teacherClass.whatsapp}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile} >
        <Image
          style={styles.avatar}
          source={teacherHasAvatar ? { uri: teacherClass.avatar } : defaultAvatar} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacherClass.name}</Text>
          <Text style={styles.subject}>{teacherClass.subject}</Text>
        </View>

      </View>

      <Text style={styles.bio}>
        {teacherClass.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Price/hour {'  '}
          <Text style={styles.priceValue}>R$ {teacherClass.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>

          <RectButton style={[styles.favoriteButton, isFavorited ? styles.favorited : null]} onPress={handleToggleFavorited}>
            {isFavorited ?
              <Image source={unfavoriteIcon} /> :
              <Image source={heartOutlineIcon} />}
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleWhatsappContactButtonPressed}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Get in touch</Text>
          </RectButton>
        </View>

      </View>

    </View>
  )
}

export default TeacherItem;