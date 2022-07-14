import React from 'react';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,FormControl,Select,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,CloseButton} from "@chakra-ui/react";
import {Input} from '../../../../components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory} from 'react-router-dom';
import api from "../../../../services/api";
import { useEffect, useState } from "react";
import { IClientsDTO} from '../../../../dtos/IClientsDTO';
import { IGroupActionDTO } from '../../../../dtos/IGroupActionDTO';
import { ILawyersDTO } from '../../../../dtos/ILawyersDTO';
import { IFeesDTO } from '../../../../dtos/IFeesDTO';

const createFeesFormSchema = yup.object().shape({
  opposing_party: yup.string().required('Nome obrigatório'),
  value: yup.number().required('Valor obrigatória'),
  endDate: yup.string().required('Data obrigatória'),
  payment_date: yup.string().required('Data obrigatória'),
  });

export function CreateFees(){
  const [clients, setClients] = useState<IClientsDTO[]>([]);
  const [groupAction, setGroupAction] = useState<IGroupActionDTO[]>([]);
  const [lawyers, setLawyers] = useState<ILawyersDTO[]>([]);

  const [selectClients, setSelectClients] = useState('');
  const [selectGroupAction, setSelectGroupAction] = useState('');
  const [selectLawyers, setSelectLawyers] = useState('');
  const [selectStatus, setSelectStatus] = useState('');

  //const [companyId, setCompanyId] =useState('');
  
  
  const [error,setError] = useState<any>();
  const history = useHistory();

  useEffect( () => {
    api.get('/clients').then(response => setClients(response.data));
    api.get('/groupAction').then(response => setGroupAction(response.data));
    api.get('/lawyers').then(response => setLawyers(response.data));
  },[]);

  async function createFees (feesInput:IFeesDTO){
    
    clients.filter((client)=>{
      if(client.name===selectClients){
        feesInput.clients=client.name;
        return true;
      }
      else{
        return false;
      }
    });

    groupAction.filter((groupAction)=>{
      if(groupAction.name===selectGroupAction){
        feesInput.group_action=groupAction.name;
        return true;
      }
      else{
        return false;
      }
    });

    lawyers.filter((lawyer)=>{
      if(lawyer.name===selectLawyers){
        feesInput.lawyers=lawyer.name;
        return true;
      }
      else{
        return false;
      }
    });

    feesInput.status = selectStatus;


    try{
      await api.post('/fees',feesInput);
      history.push("/listFees");
    }
    catch(err){
      setError(err);
    }
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<IFeesDTO>({resolver: yupResolver(createFeesFormSchema),});

  // function handleSelect(event: string){
  //   setSelectClients(event);
  //   const clientHandle = clients.filter(client =>client.name ===event);
  //   //setCompanyId(clientHandle[0].company_id);
  // }

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createFees)} >

      <Heading size='lg' fontWeight='normal'>Criar Honorário</Heading>

      { error &&(
        <Alert status="error" variant='solid' borderRadius='md' mt='4' >
        <AlertIcon />
        <AlertTitle mr={2}>Esse honorário já existe!</AlertTitle>
        <AlertDescription>Crie um honorário com outro nome.</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
      )}

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='400px' spacing={['6','8']} w='100%' >
          <Input  label='Parte contrária' error={errors.opposing_party} {...register("opposing_party")}/>
          <Input  label='Valor'  error={errors.value} {...register("value")}/>
          <Input  label='Data de finalização' type='date' error={errors.endDate} {...register("endDate")}/>
          <Input  label='Data de pagamento'  type='date' error={errors.payment_date} {...register("payment_date")}/>
          <Flex>
            <FormControl mr='5' >
              <Select placeholder="Selecionar status" onChange={event=>setSelectStatus(event.target.value)} >
                <option>Concluído</option>
                <option>Andamento</option>
                <option>Parado</option>
              </Select>
            </FormControl>
            <FormControl >
            <Select placeholder="Selecionar Grupo de Ação" onChange={event=>setSelectGroupAction(event.target.value)} >
            {
              groupAction.map(groupAction => (
                <option key={groupAction.id}>
                  {groupAction.name}
                </option>
              ))
            }
            </Select>
            </FormControl>
          </Flex>
          <Flex>
            <FormControl mr='5'>
              <Select placeholder="Selecionar cliente" onChange={event=>setSelectClients(event.target.value)} >
                {clients.map(client =>(
                  <option key={client.id}>
                    {client.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl >
              <Select placeholder="Selecionar advogado" onChange={event=>setSelectLawyers(event.target.value)} >
              {
                lawyers.map(lawyer => (
                  <option key={lawyer.id}>
                    {lawyer.name}
                  </option>
                ))
              }
              </Select>
            </FormControl>
          </Flex>
        </SimpleGrid>
      </VStack>
        <Flex mt='8' justify='flex-end' >
          <HStack>  
            <Link to='/listFees'>
              <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
            </Link> 
              <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting} >Confirmar</Button>  
          </HStack>
        </Flex>
    </Box>
  );
}