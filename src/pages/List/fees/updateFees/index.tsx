import React from 'react';
import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,FormControl,Select, FormLabel, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Text} from "@chakra-ui/react";
import {Input} from '../../../../components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory, useParams} from 'react-router-dom';
import { api } from '../../../../services/apiClient';
import { useEffect, useState } from "react";
import { IClientsDTO} from '../../../../dtos/IClientsDTO';
import { IGroupActionDTO } from '../../../../dtos/IGroupActionDTO';
import { ILawyersDTO } from '../../../../dtos/ILawyersDTO';
import { IFeesDTO } from '../../../../dtos/IFeesDTO';

const createFeesFormSchema = yup.object().shape({
  // opposing_party: yup.string().required('Nome obrigatório'),
  // value: yup.number().required('Valor obrigatória'),
  // endDate: yup.string().required('Data obrigatória'),
  // payment_date: yup.string().required('Data obrigatória'),
  });

interface updateId {
  id: string;
}

interface UpdateFeesProps  {
  id?: string;

  lawyers1?: string;
  lawyers2?: string;
  lawyers3?: string;
  lawyers4?: string;

  clients?: string;

  group_action?: string;

  opposing_party?: string;

  value1?: string;
  value2?: string;
  value3?: string;
  value4?: string;

  status?: string;

  endDate?: String;

  payment_date?: String;
  totalValue?: number;
}

export function UpdateFees(){
  const [clients, setClients] = useState<IClientsDTO[]>([]);
  const [groupAction, setGroupAction] = useState<IGroupActionDTO[]>([]);
  const [lawyers, setLawyers] = useState<ILawyersDTO[]>([]);
  const [fees, setFees] = useState<UpdateFeesProps>({} as UpdateFeesProps);

  const [selectClients, setSelectClients] = useState('');
  const [selectGroupAction, setSelectGroupAction] = useState('');
  
  const [selectLawyers1, setSelectLawyers1] = useState('');
  const [selectLawyers2, setSelectLawyers2] = useState('');
  const [selectLawyers3, setSelectLawyers3] = useState('');
  const [selectLawyers4, setSelectLawyers4] = useState('');

  const [selectStatus, setSelectStatus] = useState('');

  const [lawyersQuantity,setLawyersQuantity] = useState(1);
  const[inputPercentage1, setInputPercentage1] = useState('');
  const[inputPercentage2, setInputPercentage2] = useState('');
  const[inputPercentage3, setInputPercentage3] = useState('');
  const[inputPercentage4, setInputPercentage4] = useState('');

  const {id} = useParams<updateId>();

  const [error,setError] = useState<any>();
  const history = useHistory();

  useEffect( () => {
    api.get('/fees').then(response => setFees(response.data.find((f:UpdateFeesProps)=> f.id===id)));
    api.get('/clients').then(response => setClients(response.data));
    api.get('/groupAction').then(response => setGroupAction(response.data));
    api.get('/lawyers').then(response => setLawyers(response.data));

    setInputPercentage1(String((Number(fees.value1)/Number(fees.totalValue))*100));
    setInputPercentage2(String((Number(fees.value2)/Number(fees.totalValue))*100));
    setInputPercentage3(String((Number(fees.value3)/Number(fees.totalValue))*100));
    setInputPercentage4(String((Number(fees.value4)/Number(fees.totalValue))*100));
  
  },[id, fees.value1,fees.value2,fees.value3,fees.value4,fees.totalValue]);



  async function createFees (feesInput:IFeesDTO){
    
    clients.filter((client)=>{
      if(client.name===selectClients){
        feesInput.clients=client.name;
        return true;
      }
      
      else{
        feesInput.clients= String(fees.clients)
        return false;
      }
    });

    groupAction.filter((groupAction)=>{
      if(groupAction.name===selectGroupAction){
        feesInput.group_action=groupAction.name;
        return true;
      }
      else{
        feesInput.group_action= String(fees.group_action);
        return false;
      }
    });
    

    lawyers.filter((lawyer)=>{
      if(lawyer.name===selectLawyers1){
        feesInput.lawyers1=lawyer.name;
        return true;
      }
      else{
        feesInput.lawyers1= String(fees.lawyers1);
        return false;
      }
    });

    lawyers.filter((lawyer)=>{
      if(lawyer.name===selectLawyers2){
        feesInput.lawyers2=lawyer.name;
        return true;
      }
      else if(selectLawyers2!=='undefined' && lawyer.name!==selectLawyers2){
        feesInput.lawyers2= String(fees.lawyers2);
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
      else if(selectLawyers3!=='undefined' && lawyer.name!==selectLawyers3){
        feesInput.lawyers3= String(fees.lawyers3);
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
      else if(selectLawyers4!=='undefined' && lawyer.name!==selectLawyers4){
        feesInput.lawyers4= String(fees.lawyers4);
        return true;
      }
      else{
        return false;
      }
    });

    feesInput.value1= String((Number(inputPercentage1)/100)*Number(fees.totalValue));
    
    feesInput.value3= String((Number(inputPercentage3)/100)*Number(fees.totalValue));
    feesInput.value2= String((Number(inputPercentage2)/100)*Number(fees.totalValue));
    feesInput.value4= String((Number(inputPercentage4)/100)*Number(fees.totalValue));

    if(selectStatus){
      feesInput.status = selectStatus;
    }
    else{
      feesInput.status = String(fees.status);
    }

    if(!feesInput.endDate){
      feesInput.endDate = new Date(String(fees.endDate));
    }

    if(!feesInput.payment_date){
      feesInput.payment_date = new Date(String(fees.payment_date));
    }

    if(!feesInput.opposing_party){
      feesInput.opposing_party = String(fees.opposing_party);
    }

    //console.log('op')
    try{
      await api.put('/fees/'+id,feesInput);
      console.log(feesInput);
      history.push("/listFees");
    }
    
    catch(err){
      setError(err);
      //console.log(err)
    }

  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<IFeesDTO>({resolver: yupResolver(createFeesFormSchema),});

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createFees)} >

      <Heading size='lg' fontWeight='normal'>Editar Honorário</Heading>

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
            <Input 
              label='Parte contrária' 
              type='text' 
              value={fees.opposing_party} 
              error={errors.opposing_party} 
              {...register("opposing_party")} 
              onChange={event=>{
                setFees(prevState=>{
                  return { ...prevState, opposing_party:event.target.value }
                });
              }}
            />
            <Input 
              label="Valor da ação" 
              type='number' value={fees.totalValue}   
              onChange={event=>{
                setFees(prevState=>{
                  return{...prevState,totalValue:Number(event.target.value)}
                });
              }}
            />
            </Flex>
            <Flex mb={"6"}>
              <FormControl mr='4'>
                <Select  value={fees.clients} onChange={event=>setSelectClients(event.target.value)} >
                  {clients.map(client =>(
                    <option key={client.id}>
                      {client.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>        
            
            <Flex mb={"6"}>
              <Input 
                label='Data de finalização' 
                value={String(fees.endDate)} 
                type='date' 
                error={errors.endDate} 
                {...register("endDate")} 
                onChange={event=>{
                  setFees(prevState=>{
                    return { ...prevState, endDate:event.target.value}
                  });
                }}
                
              />
              <Input 
                label='Data de pagamento' 
                value={String(fees.payment_date)} 
                type='date' error={errors.payment_date} 
                {...register("payment_date")}
                onChange={event=>{
                  setFees(prevState=>{
                    return { ...prevState, payment_date:event.target.value }
                  });
                }}
              />
            </Flex>
        
            <Flex mb={"6"}>
              <FormControl mr='4' >
                <Select  defaultValue={String(fees.status)} onChange={event=>setSelectStatus(event.target.value)} >
                  <option>Concluído</option>
                  <option>Andamento</option>
                  <option>Parado</option>
                </Select>
              </FormControl>
              <FormControl mr='4'>
              <Select  defaultValue={fees.group_action} onChange={event=>setSelectGroupAction(event.target.value)} >
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
                <Select  value={String(fees.lawyers1)} onChange={event=>setSelectLawyers1(event.target.value)} >
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
                <Input 
                  label="%" 
                  type="number" 
                  min="1" 
                  max="100" 
                  value={inputPercentage1} 
                  onChange={event=>
                    setInputPercentage1(event.target.value)
                  }
                />
                <Box>
                  <Text mb={'2'}> Valor </Text>
                  <Flex
                    bgColor="gray.900"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  
                  <Text >R$ {((Number(inputPercentage1)/100)*Number(fees.totalValue)).toLocaleString("pt-BR")}</Text>
                  
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            {lawyersQuantity>1 && 
            <Flex mb={"8"}>
              <FormControl mr={'4'} >
                <Select  value={String(fees.lawyers2)} onChange={event=>setSelectLawyers2(event.target.value)} >
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
                <Input  
                type="number" 
                min="1" 
                max="100" 
                value={inputPercentage2} 
                onChange={event=>setInputPercentage2(event.target.value)}/>
                <Box>
                  <Flex
                    bgColor="gray.900"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  <Text >R$ {((Number(inputPercentage2)/100)*Number(fees.totalValue)).toLocaleString("pt-BR")}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            }
            {lawyersQuantity>2 && 
            <Flex mb={"8"}>
              <FormControl mr={'4'} >
                <Select  value={String(fees.lawyers3)}  onChange={event=>setSelectLawyers3(event.target.value)} >
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
                <Input  
                type="number" 
                min="1" 
                max="100" 
                value={inputPercentage3} 
                onChange={event=>setInputPercentage3(event.target.value)}/>
                <Box>
                  
                  <Flex
                    bgColor="gray.900"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  <Text >R$ {((Number(inputPercentage3)/100)*Number(fees.totalValue)).toLocaleString("pt-BR")}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
}
            {lawyersQuantity>3 && 
            <Flex mb={"8"}>
              <FormControl mr={'4'} >
                <Select  value={String(fees.lawyers4)} onChange={event=>setSelectLawyers4(event.target.value)} >
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
                <Input  
                type="number" 
                min="1" 
                max="100" 
                value={inputPercentage4} 
                onChange={event=>setInputPercentage4(event.target.value)}/>
                <Box>
                  
                  <Flex
                    bgColor="gray.900"
                    minWidth={'28'}
                    minHeight={'12'}
                    borderRadius={'10%'}
                    alignItems= {"center"}
                    justifyContent={'center'}
                    mr={"4"}
                  >
                  <Text >R$ {((Number(inputPercentage4)/100)*Number(fees.totalValue)).toLocaleString("pt-BR")}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
            }
            {lawyersQuantity<4 &&
            <Button bgColor='green.400' mr={4} width={'23%'} onClick={()=>setLawyersQuantity(lawyersQuantity+1)} >
              Adicionar +
            </Button>
            }
            {lawyersQuantity>1 &&
            <Button bgColor='red.400' width={'23%'} onClick={()=>setLawyersQuantity(lawyersQuantity-1)}>
              Remover -
            </Button>
            }          
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