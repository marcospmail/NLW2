import React, { useState, createContext, Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { ClassProps } from '../components/TeacherItem'
import { AsyncStorage } from 'react-native'

interface IFavoritesContext<T> {
  state: T;
  dispatch: Dispatch<SetStateAction<T>>
}

export const FavoritesContext = createContext({} as IFavoritesContext<ClassProps[]>)

const Favorites: React.FC = ({ children }) => {
  const [favoriteClasses, setFavoriteClasses] = useState<ClassProps[]>([])


  return (
    <FavoritesContext.Provider
      value={{ state: favoriteClasses, dispatch: setFavoriteClasses }} >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavoritesContext() {
  const { state: favoriteClasses, dispatch } = useContext(FavoritesContext)

  useEffect(() => {
    loadFavoritedClassesFromStorage()
  }, [])

  async function loadFavoritedClassesFromStorage() {
    const response = await AsyncStorage.getItem('favorites')
    if (!response) return

    const data = JSON.parse(response)
    dispatch(data)
  }

  async function setFavoriteClasses(favoriteClasses: ClassProps[]) {
    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteClasses))
    dispatch(favoriteClasses)
  }

  return {
    favoriteClasses, setFavoriteClasses
  }
}

export default Favorites

