import React, { useEffect, useState } from 'react';

import { Table,Thead,Tbody,Tr,Th,Td,Icon,Button,Box,Flex,} from "@chakra-ui/react"
import { IFeesDTO } from '../../../../dtos/IFeesDTO';
import api from "../../../../services/api";
import {Link} from 'react-router-dom';
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";

export function ListFees(){
  const [fees,setFees] = useState<IFeesDTO[]>([]);

  function statusColor (value: string){
    if(value === 'Concluído'){
      return 'green';
    }
    else if(value === 'Andamento'){
      return 'yellow';
    }
    else if(value === 'Parado'){
      return 'red';
    }
  }

  async function handleDelete(value: string){
    await api.delete('/fees/'+value)
  }

  useEffect( () => {
    api.get('/fees').then(response => setFees(response.data));
    // api.get('/company').then(response => setCompanys(response.data));
    // api.get('/units').then(response => setUnits(response.data));
  },[handleDelete]); 

  return (
    <Flex direction='column'>
      <Flex>
        
        <Link to='/createFees'>
          <Button as='a' size='sm' fontSize='sm' colorScheme='green'  rightIcon={<Icon as={RiAddLine} fontSize='16' />} maxWidth='200'mt='8' >
            Adicionar Honorário
          </Button>
        </Link> 
      </Flex>  
      <Box flex='1' borderRadius={8} bg='gray.800' p='4' mt='4' >
        <Table colorScheme='whiteAlpha' width= '100%'>
          <Thead >
            <Tr p='2'>
              <Th w='12%' p='2' pl='2'>Advogados</Th>
              <Th w='12%' p='2' pl='2'>Clientes</Th>
              <Th w='13%' p='2' pl='2'>Grupo de Ação</Th>
              <Th w='12%' p='2' pl='2'>Parte oposta</Th>
              <Th w='7%' p='2' pl='2' >Valor</Th>
              <Th w='2%' p='2' pl='2'textAlign='center'>Status</Th>
              <Th w='2%' p='2' pl='2'textAlign='center'>Término</Th>
              <Th w='2%' p='2' pl='2'textAlign='center'>pagamento</Th>
              <Th w='1%' p='2' pl='2'textAlign='center'>Editar</Th>
              <Th w='1%' p='2' pl='2'textAlign='center'>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              fees.map(fees=>(
                <Tr key={fees.id} fontSize='sm' >
                  <Td  p='2' pl='2' >{fees.lawyers}</Td>
                  <Td  p='2' pl='2' >{fees.clients}</Td>
                  <Td  p='2' pl='2'>{fees.group_action}</Td>
                  <Td p='2' pl='2'>{fees.opposing_party}</Td>
                  <Td p='2' pl='2'>R$ {Number(fees.value).toLocaleString("pt-BR")}</Td>
                  <Td p='2' pl='2' textAlign='center'>
                    <Button as='a' size='sm' fontSize='sm' colorScheme={statusColor(fees.status)} >
                      {fees.status}
                    </Button> 
                  </Td>
  
                  <Td p='2' pl='2'>{new Intl.DateTimeFormat('pt-BR').format(new Date(fees.endDate))}</Td>
                  <Td p='2' pl='2'>{new Intl.DateTimeFormat('pt-BR').format(new Date(fees.payment_date))}</Td>
                  <Td p='2' pl='2'textAlign='center'>
                    <Link to={`/updateFees/${fees.id}`}>
                      <Button  as='a' size='sm' colorScheme='purple' pl='1' pr='2.5' rightIcon={<Icon as={RiPencilLine} fontSize='16' />} />
                    </Link>
                  </Td>
                  <Td p='2' pl='2' textAlign='center'>
                    <Button 
                      pl='0.7' 
                      pr='2.5'
                      as='a' 
                      type='submit' 
                      size='sm' 
                      fontSize='sm' 
                      colorScheme='red'  
                      rightIcon={<Icon as={RiCloseLine} fontSize='16' />} 
                      onClick={() =>{handleDelete(fees.id)}}
                    />
                  </Td>
              </Tr>
              ))
          
            }
          </Tbody>
        </Table>
      </Box>
    </Flex>  
  );
}