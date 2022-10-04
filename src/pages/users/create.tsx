import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

type CreateUserFormData = {
  nome: string
  email: string
  password: string
  password_confirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-Mail obrigatório').email('E-Mail Invalido'),
  password: yup.string().required('Senha Obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })
  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
  }

  return (
    <Box>
      <Header />

      <Flex w='100% ' my='6' maxWidth={1480} mx='auto' px='6'>
        <Sidebar />

        <Box as="form" flex='1' borderRadius={8} bg='gray.800' p='8' onSubmit={handleSubmit(handleCreateUser)}>
          <Heading size='lg' fontWeight='normal'>Criar usuário</Heading>

          <Divider my='6' borderColor='gray.700' />

          <VStack spacing='8'>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <Input
                name='name'
                label="Nome completo"
                {...register('name')} 
                error={errors.name}
              />
              <Input
                name='email'
                label="E-mail"
                {...register('email')} 
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <Input
                name='password'
                type='password'
                label="Senha"
                {...register('password')} 
                error={errors.password}
              />
              
              <Input
                name='password_confirmation'
                type='password'
                label="Confirmação da senha"
                {...register('password_confirmation')} 
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link href='/users/create' passHref>
                <Button as="a" colorScheme='whiteAlpha' _hover={{bgColor: 'red.500'}}>Cancelar</Button>
              </Link>
              <Button type="submit" bg='pink.500' _hover={{bgColor: 'pink.700'}} isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}