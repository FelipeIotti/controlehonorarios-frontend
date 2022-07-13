import  { useContext } from 'react';
import { Flex,Stack, Button } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input';
import { useHistory } from 'react-router-dom';
import { AuthUser } from '../App';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})


export function AuthPage(){
  const {register, handleSubmit, formState, formState: { errors }} = useForm<SignInFormData>({resolver: yupResolver(signInFormSchema),});
  const history = useHistory();
  const {userAuthenticate,setIsAuthenticated} = useContext(AuthUser);


  const handleSignIn:SubmitHandler<SignInFormData> =(value)=>{
    

    if(userAuthenticate.email=== value.email && userAuthenticate.password=== value.password){
    setIsAuthenticated(true);
    history.push("/general");
    
    }
    else{
      history.push("/");
    }
    
  }

  return (
    <Flex
      w="100vw"
      h= "100vh"
      align="center"
      justify="center"
    >
      <Flex
        as= "form"
        width= "100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      > 
        <Stack spacing='4'>
          <Input  type="email" label="E-mail" error={errors.email} {...register("email")} />
          <Input  type="password" label="Senha" error={errors.password} {...register("password")} />
        </Stack>
        <Button 
          type="submit"
          mt="6"
          colorScheme='pink'
          size="lg"
          isLoading={formState.isSubmitting}
        >Entrar</Button>
      </Flex>
    </Flex>
  );
}