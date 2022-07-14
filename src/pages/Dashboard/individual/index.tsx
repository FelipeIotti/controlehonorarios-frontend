import React, { useEffect, useState } from 'react';

import { Table,Text,Thead,Tbody,Tr,Th,Td,Box,Flex,FormControl,Select} from "@chakra-ui/react"
import { IGroupActionDTO } from '../../../dtos/IGroupActionDTO';
import api from "../../../services/api";

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

interface GeneralPropsTotal {
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
  total: string;
}


export function IndividualGeneral(){
  const [general, setGeneral] = useState<GeneralProps[]>([]);
  const [generalQuantity, setGeneralQuantity] = useState<GeneralProps[]>([]);
  const [generalStatus, setGeneralStatus] = useState<GeneralProps[]>([]);

  const [selectedGeneral, setSelectedGeneral] = useState<GeneralProps>({} as GeneralProps);
  const [selectedGeneralQuantity, setSelectedGeneralQuantity] = useState<GeneralProps>({} as GeneralProps);
  const [selectedGeneralStatus, setSelectedGeneralStatus] = useState<GeneralProps>({} as GeneralProps);

  const [selectedGeneralTotal, setSelectedGeneralTotal] = useState<GeneralPropsTotal>({} as GeneralPropsTotal);
  const [selectedGeneralQuantityTotal, setSelectedGeneralQuantityTotal] = useState<GeneralPropsTotal>({} as GeneralPropsTotal);
  const [selectedGeneralStatusTotal, setSelectedGeneralStatusTotal] = useState<GeneralPropsTotal>({} as GeneralPropsTotal);

  function handleSelect(event: string) {
    const selectGeneral = general.filter(generaL=> {
      if(generaL.data.name === event){
        return generaL;
      }
      else{
        return false;
      }
    })[0];

    setSelectedGeneral(selectGeneral);

    const selectGeneralQuantity = generalQuantity.filter(generaL=> {
      if(generaL.data.name === event){
        return generaL;
      }
      else{
        return false;
      }
    })[0];

    setSelectedGeneralQuantity(selectGeneralQuantity);

    const selectGeneralStatus = generalStatus.filter(generaL=> {
      if(generaL.data.name === event){
        return generaL
      }
      else{
        return false;
      }
    })[0];

    setSelectedGeneralStatus(selectGeneralStatus);
    
    const generalQuantityTotal = CalculateTotalQuantity(generalQuantity);
    setSelectedGeneralQuantityTotal(generalQuantityTotal);

    const generalStatusTotal = CalculateTotalQuantity(generalStatus);
    setSelectedGeneralStatusTotal(generalStatusTotal);

    const generalFeesTotal = CalculateTotalQuantity(general);
    setSelectedGeneralTotal(generalFeesTotal);

  }

  function CalculateTotalQuantity (object: GeneralProps[]){
    const januaryT = object.reduce((total, object) => total + object.january, 0);
    const februaryT = object.reduce((total, object) => total + object.february, 0);
    const marchT = object.reduce((total, object) => total + object.march, 0);
    const aprilT = object.reduce((total, object) => total + object.april, 0);
    const mayT = object.reduce((total, object) => total + object.may, 0);
    const juneT = object.reduce((total, object) => total + object.june, 0);
    const julyT = object.reduce((total, object) => total + object.july, 0);
    const augustT = object.reduce((total, object) => total + object.august, 0);
    const septemberT = object.reduce((total, object) => total + object.september, 0);
    const octoberT = object.reduce((total, object) => total + object.october, 0);
    const novemberT = object.reduce((total, object) => total + object.november, 0);
    const decemberT = object.reduce((total, object) => total + object.december, 0);
    const totalT = object.reduce((total, object) => total + object.total, 0);

    const generalTotal = {
      january: januaryT.toLocaleString('pt-BR'),
      february: februaryT.toLocaleString('pt-BR'),
      march: marchT.toLocaleString('pt-BR'),
      april: aprilT.toLocaleString('pt-BR'),
      may: mayT.toLocaleString('pt-BR'),
      june: juneT.toLocaleString('pt-BR'),
      july: julyT.toLocaleString('pt-BR'),
      august: augustT.toLocaleString('pt-BR'),
      september: septemberT.toLocaleString('pt-BR'),
      october: octoberT.toLocaleString('pt-BR'),
      november: novemberT.toLocaleString('pt-BR'),
      december: decemberT.toLocaleString('pt-BR'),
      total: totalT.toLocaleString('pt-BR'),
    }

    return generalTotal;
  }


  useEffect( () => {
    api.get('/lawyers/general').then(response => setGeneral(response.data));
    api.get('/lawyers/generalQuantity').then(response => setGeneralQuantity(response.data))
    api.get('/lawyers/generalStatus').then(response => setGeneralStatus(response.data))
  },[]); 

  return (
    <Flex direction='column'> 
      <FormControl mr='5' w='30%' >
        <Select placeholder="Selecionar Advogado" onChange={event=>handleSelect(event.target.value)} >
          {general.map(general =>(
            <option key={general.data.id}>
              {general.data.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <Box flex='1' borderRadius={8} bg='gray.800' p='4' mt='4' >
        <Table colorScheme='whiteAlpha' width= '100%'>
          <Thead >
            <Tr p='2'>
              <Th w='10%' p='2' pl='2' ></Th>
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
          
            
          {selectedGeneral !== undefined ? ( 
            <Tbody>
              <Tr fontSize='sm' >
                <Td p='2' pl='2' >Quantidade de ações</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.january}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.february}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.march}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.april}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.may}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.june}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.july}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.august}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.september}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.october}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.november}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.december}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantity.total}</Td>
              </Tr>

              <Tr fontSize='sm' >
                <Td p='2' pl='2' >Ações concluídas</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.january}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.february}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.march}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.april}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.may}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.june}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.july}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.august}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.september}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.october}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.november}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.december}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatus.total}</Td>
              </Tr>
              
               <Tr fontSize='sm' >
                <Td p='2' pl='2' >Honários</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.january)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.february)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.march)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.april)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.may)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.june)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.july)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.august)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.september)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.october)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.november)}</Td>
                <Td p='2' pl='2' textAlign='center' > {new Intl.NumberFormat('pt-BR').format(selectedGeneral.december)}</Td>
                <Td p='2' pl='2' textAlign='center' >R$ {new Intl.NumberFormat('pt-BR').format(selectedGeneral.total)}</Td>
              </Tr>  
            </Tbody>
          ):" " }
        </Table>    
      </Box>
      <Text mt='4' ml='1'>Valores Totais</Text>
      <Box flex='1' borderRadius={8} bg='gray.800' p='4' mt='4' >
        <Table colorScheme='whiteAlpha' width= '100%'>
          <Thead >
            <Tr p='2'>
              <Th w='10%' p='2' pl='2' ></Th>
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
          
            
          {selectedGeneral !== undefined ? ( 
            <Tbody>
              <Tr fontSize='sm' >
                <Td p='2' pl='2' >Quantidade de ações</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.january}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.february}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.march}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.april}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.may}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.june}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.july}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.august}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.september}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.october}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.november}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.december}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralQuantityTotal.total}</Td>
              </Tr>

              <Tr fontSize='sm' >
                <Td p='2' pl='2' >Ações concluídas</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.january}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.february}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.march}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.april}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.may}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.june}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.july}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.august}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.september}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.october}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.november}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.december}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralStatusTotal.total}</Td>
              </Tr>
              
                <Tr fontSize='sm' >
                <Td p='2' pl='2' >Honários</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.january}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.february}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.march}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.april}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.may}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.june}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.july}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.august}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.september}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.october}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.november}</Td>
                <Td p='2' pl='2' textAlign='center' > {selectedGeneralTotal.december}</Td>
                <Td p='2' pl='2' textAlign='center' >R$ {selectedGeneralTotal.total}</Td>
              </Tr>  
            </Tbody>
          ):" " }
        </Table>
      </Box>
    </Flex>  
  );
}