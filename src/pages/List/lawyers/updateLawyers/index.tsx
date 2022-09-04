import React from 'react';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,FormControl,Select,FormLabel,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,CloseButton} from "@chakra-ui/react";
import {Input} from '../../../../components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory, useParams} from 'react-router-dom';
import { api } from '../../../../services/apiClient';
import { useEffect, useState } from "react";
import { IGroupActionDTO } from '../../../../dtos/IGroupActionDTO';
import { ILawyersDTO } from '../../../../dtos/ILawyersDTO';

const createLawyersFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  oab: yup.number().required('Valor obrigatório'),
  phone: yup.number().required('Telefone obrigatório'),
  email: yup.string().email().required('Data obrigatório'),
  cpf: yup.string().required('CPF obrigatória'),
  });

interface LawyersId {
  id: string;
}

export function UpdateLawyers(){
  const [groupAction, setGroupAction] = useState<IGroupActionDTO[]>([]);
  const [lawyer, setLawyer] = useState<ILawyersDTO>({} as ILawyersDTO);
  
  const [selectGroupAction, setSelectGroupAction] = useState('');
 
  const [error,setError] = useState<any>();
  const history = useHistory();
  const lawyersId = useParams<LawyersId>();

  useEffect( () => {
    //api.get('/clients').then(response => setClients(response.data));
    api.get('/groupAction').then(response => setGroupAction(response.data));
    api.get('/lawyers').then((response) => {setLawyer(response.data.find((f:ILawyersDTO) => f.id === lawyersId.id));})
    //api.get('/lawyers').then(response => setLawyers(response.data));
  },[lawyersId]);

  async function createLawyers (lawyersInput:ILawyersDTO){
    
    groupAction.filter((groupAction)=>{
      if(groupAction.name===selectGroupAction){
        lawyersInput.specialty=groupAction.name;
        return true;
      }
      else{
        return false;
      }
    });  

    try{
      await api.put('/lawyers/'+lawyersId.id,lawyersInput);
      history.push("/listLawyers");
    }
    catch(err){
      setError(err);
    }
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<ILawyersDTO>({resolver: yupResolver(createLawyersFormSchema),});


  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createLawyers)} >

      <Heading size='lg' fontWeight='normal'>Editar Advogados</Heading>

      { error &&(
        <Alert status="error" variant='solid' borderRadius='md' mt='4' >
        <AlertIcon />
        <AlertTitle mr={2}>Esse advogado já existe!</AlertTitle>
        <AlertDescription>Crie um advogado com outro nome.</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
      )}

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='400px' spacing={['6','8']} w='100%' >
          <Input  label='Nome' defaultValue={lawyer.name} error={errors.name} {...register("name")}/>
          <Input  label='OAB' defaultValue={lawyer.oab} error={errors.oab} {...register("oab")}/>
          <Input  label='Telefone' defaultValue={lawyer.phone} error={errors.phone} {...register("phone")}/>
          <Input  label='E-mail'defaultValue={lawyer.email} error={errors.email} {...register("email")}/>
          <Input  label='CPF' defaultValue={lawyer.cpf} error={errors.email} {...register("cpf")}/>
          <FormControl>
            <FormLabel>Especialidade</FormLabel>
            <Select placeholder="Selecionar Grupo de Ação" defaultValue={String(lawyer.specialty)} onChange={event=>setSelectGroupAction(event.target.value)} >
            {
              groupAction.map(groupAction => (
                <option key={groupAction.id}>
                  {groupAction.name}
                </option>
              ))
            }
            </Select>
            </FormControl>

        </SimpleGrid>
      </VStack>
        <Flex mt='8' justify='flex-end' >
          <HStack>  
            <Link to='/listLawyers'>
              <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
            </Link> 
              <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting} >Confirmar</Button>  
          </HStack>
        </Flex>
    </Box>
  );
}