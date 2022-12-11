import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import { VStack, Heading, Icon, useTheme, Text } from 'native-base'
import { Envelope, Key } from 'phosphor-react-native'

import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  function handleNewAccount() {
    navigation.navigate('create')
  }

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert('Login', 'Informe e-mail e senha.')
    }

    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error)
        setIsLoading(false)

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Login', 'E-mail inválido.')
        }

        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Login', 'E-mail ou senha inválidos.')
        }

        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Login', 'E-mail ou senha inválidos.')
        }

        return Alert.alert('Não foi possível acessar.')
      })
  }

  const { colors } = useTheme()
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder="E-mail"
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Input
        mb={6}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Criar uma conta"
        bg="gray.600"
        fontSize="sm"
        h={10}
        _pressed={{ bg: 'gray.500' }}
        onPress={handleNewAccount}
      ></Button>

      <Button
        mt={8}
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  )
}