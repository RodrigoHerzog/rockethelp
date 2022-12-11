import { useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  IconButton,
  HStack,
  Box
} from 'native-base'
import { CaretLeft, Envelope, Key } from 'phosphor-react-native'
import Logo from '../assets/logo_primary.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'

export function CreateAccount() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleCreateAccount() {
    if (!email || !password) {
      return Alert.alert('Criar conta', 'Informe e-mail e senha.')
    }

    setIsLoading(true)

    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error)
        setIsLoading(false)

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Criar conta', 'E-mail inválido.')
        }

        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert(
            'Criar conta',
            'Já existe uma conta com esse e-mail.'
          )
        }

        if (error.code === 'auth/weak-password') {
          return Alert.alert(
            'Criar conta',
            'A senha precisa ter no mínimo 6 caracteres.'
          )
        }

        return Alert.alert('Criar conta', 'Não foi possível criar a conta.')
      })
  }

  const { colors } = useTheme()
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <HStack w="full" justifyContent="space-between" alignItems="center">
        <IconButton
          icon={<CaretLeft color={colors.gray[200]} size={24} />}
          onPress={handleGoBack}
        />
        <Box flex={1} ml={6}>
          <Logo />
        </Box>
      </HStack>

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Vamos criar uma conta
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
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleCreateAccount}
        isLoading={isLoading}
      />
    </VStack>
  )
}
