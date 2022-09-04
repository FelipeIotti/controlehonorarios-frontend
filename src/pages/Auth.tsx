import  {  useContext, useState } from 'react';
import { Flex,Stack, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import {  SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { Input } from '../components/Form/Input';
//import { useHistory } from 'react-router-dom';
//import { AuthUser } from '../App';
import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})


export function AuthPage(){
  //const {register, handleSubmit, formState, formState: { errors }} = useForm<SignInFormData>({resolver: yupResolver(signInFormSchema),});

  const {register, formState, handleSubmit,formState: { errors }} = useForm<SignInFormData>({resolver: yupResolver(signInFormSchema),});
  const history = useHistory();
  //const {userAuthenticate,setIsAuthenticated} = useContext(AuthUser);
  const {signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


    const handleSignIn:SubmitHandler<SignInFormData> =async (value,event:any)=>{
  //async function handleSubmits(event: FormEvent) {
    event.preventDefault();
    
    const data = {
      email,
      password
    }

      const authentication = await signIn(data);

      if(authentication===true){
        history.push('/listFees')
      }
      else{
        

        return(
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{authentication}</AlertTitle>
            <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
          </Alert>
        );
      }
      
    
  }

  return (
    <Flex
      w="100vw"
      h= "100vh"
      align="center"
      justify="center"
      ml={'-6'}
      mt={'-28'}
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
          <Input  type="email" label="E-mail" error={errors.email} value={email} {...register("email")} onChange={ e=> setEmail(e.target.value)}/>
          <Input  type="password" label="Senha" error={errors.password} value={password} {...register("password")}onChange={ e=> setPassword(e.target.value)} />
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