import React, { useContext, useCallback } from 'react'
import { View, ScrollView, AsyncStorage } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { ClassProps } from '../../components/TeacherItem'
import NothingToShow from '../../components/NothingToShow'

import { FavoritesContext, useFavoritesContext } from '../../context/Favorites'

import styles from './styles'

function Favorites() {
  const { favoriteClasses, setFavoriteClasses } = useFavoritesContext()

  return (
    <View style={styles.container}>
      <PageHeader title="My favorite Proffys" />

      {favoriteClasses.length == 0 ? (
        <NothingToShow />
      ) : (

          <ScrollView style={styles.teacherList}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16
            }}
          >

            {favoriteClasses.map((c: ClassProps) => (
              <TeacherItem
                key={c.id}
                teacherClass={c}
                favorited
              />
            ))}


          </ScrollView>
        )}


    </View>
  )
}

export default Favorites