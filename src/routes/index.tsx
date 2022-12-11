import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { Loading } from '../components/Loading'
import { AppRoutes } from './app.routes'

import { Home } from '../screens/Home'
import { Details } from '../screens/Details'
import { Register } from '../screens/Register'
import { SignIn } from '../screens/SignIn'
import { CreateAccount } from '../screens/CreateAccount'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { background } from 'native-base/lib/typescript/theme/styled-system'
const { Navigator, Screen } = createNativeStackNavigator()

export function Routes() {
  const [loading, setIsLoading] = useState(true)
  const [user, setUser] = useState<FirebaseAuthTypes.User>()

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(response => {
      setUser(response)
      setIsLoading(false)
    })

    return subscriber
  }, [])

  if (loading) {
    return <Loading />
  }

  const authScreens = {
    login: SignIn,
    create: CreateAccount
  }

  const homeScreens = {
    home: Home,
    new: Register,
    details: Details
  }

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom'
        }}
      >
        {Object.entries({
          ...(user ? homeScreens : authScreens)
        }).map(([name, component]) => (
          <Screen key={name} name={name} component={component} />
        ))}
      </Navigator>
    </NavigationContainer>
  )
}
