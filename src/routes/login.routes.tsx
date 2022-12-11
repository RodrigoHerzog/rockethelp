import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { SignIn } from '../screens/SignIn'
import { CreateAccount } from '../screens/CreateAccount'

const { Navigator, Screen } = createNativeStackNavigator()

export function LoginRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="login" component={SignIn} />
      <Screen name="create-account" component={CreateAccount} />
    </Navigator>
  )
}
