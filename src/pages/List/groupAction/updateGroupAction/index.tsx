import React, { useEffect } from 'react';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,CloseButton} from "@chakra-ui/react";
import {Input} from '../../../../components/Form/Input';
import {useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory, useParams} from 'react-router-dom';
import { api } from '../../../../services/apiClient';
import { useState } from "react";
import { IGroupActionDTO} from '../../../../dtos/IGroupActionDTO';

const createGroupActionFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório')
});

export interface GroupActionId {
  id: string;
} 

export function UpdateGroupAction(){
  const [error,setError] = useState<any>();
  const [groupAction, setGroupAction] = useState<IGroupActionDTO>({} as IGroupActionDTO);
  const history = useHistory();
  const groupActionId = useParams<GroupActionId>();

  useEffect( () => {
    api.get('/groupAction').then((response) => {setGroupAction(response.data.find((f:IGroupActionDTO) => f.id === groupActionId.id));})
  },[groupActionId])
  
  async function createGroupAction (groupActionInput:IGroupActionDTO){
   try{
    await api.put('/groupAction/'+groupActionId.id,groupActionInput);
    history.push('/listGroupAction');
   }
   catch(err){
    setError(err);
   }
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<IGroupActionDTO>({resolver: yupResolver(createGroupActionFormSchema),});

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createGroupAction)} >

      <Heading size='lg' fontWeight='normal'>Editar Grupo de Ações</Heading>

      { error &&(
        <Alert status="error" variant='solid' borderRadius='md' mt='4' >
        <AlertIcon />
        <AlertTitle mr={2}>Esse grupo de ações já existe!</AlertTitle>
        <AlertDescription>Crie uma grupo de ações com outro nome.</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
      )}

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%' >
          <Input  label='Nome completo' defaultValue={groupAction.name} error={errors.name} {...register("name")}/>
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