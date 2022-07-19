import React from 'react';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,FormControl,Select, FormLabel, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Text} from "@chakra-ui/react";
import {Input} from '../../../../components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory, useParams} from 'react-router-dom';
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

interface updateId {
  id: string;
}

export function UpdateFees(){
  const [clients, setClients] = useState<IClientsDTO[]>([]);
  const [groupAction, setGroupAction] = useState<IGroupActionDTO[]>([]);
  const [lawyers, setLawyers] = useState<ILawyersDTO[]>([]);

  const [selectClients, setSelectClients] = useState('');
  const [selectGroupAction, setSelectGroupAction] = useState('');
  
  const [selectLawyers1, setSelectLawyers1] = useState('');
  const [selectLawyers2, setSelectLawyers2] = useState('');
  const [selectLawyers3, setSelectLawyers3] = useState('');
  const [selectLawyers4, setSelectLawyers4] = useState('');

  const [selectStatus, setSelectStatus] = useState('');

  const[inputValue, setInputValue] = useState('');
  const[inputPercentage1, setInputPercentage1] = useState('');
  const[inputPercentage2, setInputPercentage2] = useState('');
  const[inputPercentage3, setInputPercentage3] = useState('');
  const[inputPercentage4, setInputPercentage4] = useState('');

  const {id} = useParams<updateId>();

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
      if(lawyer.name===selectLawyers1){
        feesInput.lawyers1=lawyer.name;
        return true;
      }
      else{
        return false;
      }
    });

    lawyers.filter((lawyer)=>{
      if(lawyer.name===selectLawyers2){
        feesInput.lawyers2=lawyer.name;
        return true;
      }
      else{
        return false;
      }
    });

    lawyers.filter((lawyer)=>{
      if(lawyer.name===selectLawyers3){
        feesInput.lawyers3=lawyer.name;
        return true;
      }
      else{
        return false;
      }
    });

    lawyers.filter((lawyer)=>{
      if(lawyer.name===selectLawyers4){
        feesInput.lawyers4=lawyer.name;
        return true;
      }
      else{
        return false;
      }
    });

    feesInput.value1= String((Number(inputPercentage1)/100)*Number(inputValue));
    feesInput.value2= String((Number(inputPercentage2)/100)*Number(inputValue));
    feesInput.value3= String((Number(inputPercentage3)/100)*Number(inputValue));
    feesInput.value4= String((Number(inputPercentage4)/100)*Number(inputValue));

    feesInput.status = selectStatus;

    try{
      await api.put('/fees/'+id,feesInput);
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
                   
          <Box>
            <Flex mb={"6"}>
            <Input  label='Parte contrária' error={errors.opposing_party} {...register("opposing_party")}/>
            <Input label="Valor da ação" type="number" onChange={event=>setInputValue(event.target.value)}/>
            </Flex>
            <Flex mb={"6"}>
              <FormControl mr='4'>
                <Select placeholder="Selecionar cliente" onChange={event=>setSelectClients(event.target.value)} >
                  {clients.map(client =>(
                    <option key={client.id}>
                      {client.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>        
            
            <Flex mb={"6"}>
              <Input label='Data de finalização' type='date' error={errors.endDate} {...register("endDate")} />
              <Input label='Data de pagamento'  type='date' error={errors.payment_date} {...register("payment_date")}/>
            </Flex>
        
            <Flex mb={"6"}>
              <FormControl mr='4' >
                <Select placeholder="Selecionar status" onChange={event=>setSelectStatus(event.target.value)} >
                  <option>Concluído</option>
                  <option>Andamento</option>
                  <option>Parado</option>
                </Select>
              </FormControl>
              <FormControl mr='4'>
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
           
          </Box>

          <Box>
            <Flex mb={"8"}>
              <FormControl mr={'4'} >
                <FormLabel>Adovogados</FormLabel> 
                <Select placeholder="Selecionar advogado" onChange={event=>setSelectLawyers1(event.target.value)} >
                {
                  lawyers.map(lawyer => (
                    <option key={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))
                }
                </Select>
              </FormControl>
              {/* <Input label="Valor" error={errors.value1} {...register("value1")}> */}
              <Flex width={"100%"}>
                <Input label="%" type="number" min="1" max="100" onChange={event=>setInputPercentage1(event.target.value)}/>
                <Box>
                  <Text mb={'2'}> Valor </Text>
                  <Flex
                    focusBorderColor="pink.500"
                    bgColor="gray.900"
                    variant="filled"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  <Text >R$ {((Number(inputPercentage1)/100)*Number(inputValue)).toLocaleString("pt-BR")}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            <Flex mb={"8"}>
              <FormControl mr={'4'} >
                <Select placeholder="Selecionar advogado" onChange={event=>setSelectLawyers2(event.target.value)} >
                {
                  lawyers.map(lawyer => (
                    <option key={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))
                }
                </Select>
              </FormControl>

              <Flex width={"100%"}>
                <Input  type="number" min="1" max="100" onChange={event=>setInputPercentage2(event.target.value)}/>
                <Box>
                  <Flex
                    focusBorderColor="pink.500"
                    bgColor="gray.900"
                    variant="filled"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  <Text >R$ {((Number(inputPercentage2)/100)*Number(inputValue)).toLocaleString("pt-BR")}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            <Flex mb={"8"}>
              <FormControl mr={'4'} >
                <Select placeholder="Selecionar advogado" onChange={event=>setSelectLawyers3(event.target.value)} >
                {
                  lawyers.map(lawyer => (
                    <option key={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))
                }
                </Select>
              </FormControl>
              <Flex width={"100%"}>
                <Input  type="number" min="1" max="100" onChange={event=>setInputPercentage3(event.target.value)}/>
                <Box>
                  
                  <Flex
                    focusBorderColor="pink.500"
                    bgColor="gray.900"
                    variant="filled"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  <Text >R$ {((Number(inputPercentage3)/100)*Number(inputValue)).toLocaleString("pt-BR")}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>

            <Flex mb={"8"}>
              <FormControl mr={'4'} >
                <Select placeholder="Selecionar advogado" onChange={event=>setSelectLawyers4(event.target.value)} >
                {
                  lawyers.map(lawyer => (
                    <option key={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))
                }
                </Select>
              </FormControl>

              <Flex width={"100%"}>
                <Input  type="number" min="1" max="100" onChange={event=>setInputPercentage4(event.target.value)}/>
                <Box>
                  
                  <Flex
                    focusBorderColor="pink.500"
                    bgColor="gray.900"
                    variant="filled"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  <Text >R$ {((Number(inputPercentage4)/100)*Number(inputValue)).toLocaleString("pt-BR")}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Box>  
          
        </SimpleGrid>
      </VStack>
        <Flex mt='2' mr={'4'} justify='flex-end' >
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