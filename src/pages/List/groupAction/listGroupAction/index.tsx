import React, { useEffect, useState } from 'react';

import { Table,Thead,Tbody,Tr,Th,Td,Icon,Button,Box,Flex} from "@chakra-ui/react"
import { IGroupActionDTO } from '../../../../dtos/IGroupActionDTO';
import api from "../../../../services/api";
import {Link} from 'react-router-dom';
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";

export function ListGroupAction(){
  const [groupAction,setGroupAction] = useState<IGroupActionDTO[]>([]);


  async function handleDelete(value: string){
    await api.delete('/groupAction/'+value);
    await api.get('/groupAction').then(response => setGroupAction(response.data));
  }

  useEffect( () => {
    api.get('/groupAction').then(response => setGroupAction(response.data));
  },[]); 

  return (
    <Flex direction='column'>
      <Flex>
        
        <Link to='/createGroupAction'>
          <Button as='a' size='sm' fontSize='sm' colorScheme='green'  rightIcon={<Icon as={RiAddLine} fontSize='16' />} maxWidth='200'mt='8' >
            Adicionar Ativo
          </Button>
        </Link> 
      </Flex>  
      <Box flex='1' borderRadius={8} bg='gray.800' p='4' mt='4' >
        <Table colorScheme='whiteAlpha' width= '100%'>
          <Thead >
            <Tr p='2'>
              <Th w='90%' p='2' pl='2'>Nome</Th>
              <Th w='1%' p='2' pl='2'textAlign='center'>Editar</Th>
              <Th w='1%' p='2' pl='2'textAlign='center'>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groupAction.map(groupAction=>(
              <Tr key={groupAction.id} fontSize='sm' >
                <Td  p='2' pl='2' >{groupAction.name}</Td>
                <Td p='2' pl='2'textAlign='center'>
                  <Link to={`/updateGroupAction/${groupAction.id}`}>
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
                    onClick={() =>{handleDelete(groupAction.id)}}
                  />
                </Td>
              </Tr>
                ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>  
  );
}