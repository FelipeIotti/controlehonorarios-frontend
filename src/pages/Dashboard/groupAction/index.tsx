import React, { useEffect, useState } from 'react';

import { Table,Thead,Tbody,Tr,Th,Td,Box,Flex} from "@chakra-ui/react"
import { IGroupActionDTO } from '../../../dtos/IGroupActionDTO';
import { api } from '../../../services/apiClient';

interface GeneralProps {
  data: IGroupActionDTO;
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
  total: number;
}

export function GroupActionGeneral(){
  const [general, setGeneral] = useState<GeneralProps[]>([]);

  useEffect( () => {
    api.get('/groupAction/general').then(response => setGeneral(response.data));
    // api.get('/fees').then(response => setFees(response.data));
    // api.get('/units').then(response => setUnits(response.data));
  },[]); 

  return (
    <Flex direction='column'> 
      <Box flex='1' borderRadius={8} bg='gray.800' p='4' mt='4' >
        <Table colorScheme='whiteAlpha' width= '100%'>
          <Thead >
            <Tr p='2'>
              <Th w='10%' p='2' pl='2' >Grupo de Ações</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>janeiro</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>fevereiro</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>março</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>abril</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>maio</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>junho</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>julho</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>agosto</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>setembro</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>outubro</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>novembro</Th>
              <Th w='4%' p='2' pl='2'textAlign='center'>dezembro</Th>
              <Th w='8%' p='2' pl='2'textAlign='center'>Total</Th>
            </Tr>
          </Thead>
          <Tbody>{
            general &&
            general.map(general=>(
              <Tr key={general.data.id} fontSize='sm' >
                <Td p='2' pl='2' >{general.data.name}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.january.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.february.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.march.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.april.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.may.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.june.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.july.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.august.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.september.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.october.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.november.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' > {general.december.toLocaleString("pt-BR")}</Td>
                <Td p='2' pl='2' textAlign='center' >R$ {general.total.toLocaleString("pt-BR")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>  
  );
}