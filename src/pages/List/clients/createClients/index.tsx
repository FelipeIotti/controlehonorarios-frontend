import React from 'react';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,CloseButton} from "@chakra-ui/react";
import {Input} from '../../../../components/Form/Input';
import {useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory} from 'react-router-dom';
import api from "../../../../services/api";
import { useState } from "react";
import { IClientsDTO} from '../../../../dtos/IClientsDTO';

const createClientsFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório')
});

export function CreateClients(){
  const [error,setError] = useState<any>();
  const history = useHistory();
  
  async function createClients (clientsInput:IClientsDTO){
   try{
    await api.post('/clients',clientsInput);
    history.push('/listClients');
   }
   catch(err){
    setError(err);
   }
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<IClientsDTO>({resolver: yupResolver(createClientsFormSchema),});

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createClients)} >

      <Heading size='lg' fontWeight='normal'>Criar clients</Heading>

      { error &&(
        <Alert status="error" variant='solid' borderRadius='md' mt='4' >
        <AlertIcon />
        <AlertTitle mr={2}>Esse cliente já existe!</AlertTitle>
        <AlertDescription>Crie uma clientes com outro nome.</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
      )}

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%' >
          <Input  label='Nome completo' error={errors.name} {...register("name")}/>
        </SimpleGrid>
      </VStack>
      <Flex mt='8' justify='flex-end' >
        <HStack>
          <Link to='/listClients'>
            <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
          </Link>  
          <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting} >Confirmar</Button>
        </HStack>
      </Flex>
    </Box>
  );
}