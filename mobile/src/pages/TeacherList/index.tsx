import React, { useState, useContext } from 'react'
import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { ClassProps } from '../../components/TeacherItem'
import NothingToShow from '../../components/NothingToShow'

import { FavoritesContext, useFavoritesContext } from '../../context/Favorites'

import api from '../../services/api'

import styles from './styles'

interface ScheduleFilterProps {
  subject: string,
  week_day: number,
  time: string
}

function TeacherList() {
  const { favoriteClasses, setFavoriteClasses } = useFavoritesContext()

  const defaultScheduleFilter: ScheduleFilterProps = {
    week_day: 1,
    subject: 'Algebra',
    time: '10:30'
  }

  const [isFiltersVisible, setIsFiltersVisible] = useState(true)
  const [scheduleFilter, setScheduleFilter] = useState<ScheduleFilterProps>(defaultScheduleFilter)
  const [classes, setClasses] = useState<ClassProps[]>([])




  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  function handleFilterChange(name: string, value: string | number) {
    const newScheduleFilter = { ...scheduleFilter, [name]: value }

    setScheduleFilter(newScheduleFilter)
  }

  async function handleFiltersSubmit() {
    const { data } = await api.get('classes', {
      params: scheduleFilter
    })

    setClasses(data)

    setIsFiltersVisible(false)
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Available Proffys"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >

        {isFiltersVisible && (
          <View style={styles.searchForm}>

            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="Which subject?"
              placeholderTextColor="#c1bccc"
              value={scheduleFilter.subject}
              onChangeText={value => handleFilterChange('subject', value)}
            />

            <View style={styles.inputGroup}>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Week day</Text>
                <TextInput
                  style={[styles.input]}
                  placeholder="Week day"
                  placeholderTextColor="#c1bccc"
                  keyboardType={'numeric'}
                  value={String(scheduleFilter.week_day)}
                  onChangeText={value => handleFilterChange('week_day', value)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Time"
                  placeholderTextColor="#c1bccc"
                  value={scheduleFilter.time}
                  onChangeText={value => handleFilterChange('time', value)}
                />
              </View>

            </View>

            <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
              <Text style={styles.submitButtonText} >Search</Text>
            </RectButton>

          </View>
        )}

      </PageHeader>

      {classes.length == 0 ? (

        <NothingToShow />

      ) : (

          <ScrollView style={styles.teacherList}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16
            }}
          >

            {classes.map((c: ClassProps) => {
              const favorited = favoriteClasses.some((f: ClassProps) => f.class_id === c.class_id)

              return (
                <TeacherItem
                  key={c.class_id}
                  teacherClass={c}
                  favorited={favorited}
                />
              )
            })}

          </ScrollView>
        )}

    </View>
  )
}

export default TeacherList