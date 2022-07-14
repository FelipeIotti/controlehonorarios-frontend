import React, { useEffect, useState } from 'react';

import { Table,Thead,Tbody,Tr,Th,Td,Icon,Button,Box,Flex} from "@chakra-ui/react"
import { ILawyersDTO } from '../../../../dtos/ILawyersDTO';
import api from "../../../../services/api";
import {Link} from 'react-router-dom';
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";

export function ListLawyers(){
  const [lawyers,setLawyers] = useState<ILawyersDTO[]>([]);


  async function handleDelete(value: string){
    await api.delete('/lawyers/'+value);
    await api.get('/lawyers').then(response => setLawyers(response.data));
  }

  
  useEffect( () => {
    api.get('/lawyers').then(response => setLawyers(response.data));
    // api.get('/company').then(response => setCompanys(response.data));
    // api.get('/units').then(response => setUnits(response.data));
  },[]); 

  return (
    <Flex direction='column'>
      <Flex>
        {/* <FormControl mr='10' >
          <FormLabel>Filtrar por empresa</FormLabel>
          <Select onChange={event=>handleSelect(event.target.value)}>
          {
            companys.map(company=>(
              <option>{company.name}</option>
            ))
          }
          </Select>
        </FormControl>
        <FormControl mr='10' >
          <FormLabel>Filtrar por unidade</FormLabel>
          <Select placeholder="Filtrar por Unidade" onChange={event=>setSelectUnit(event.target.value)} >
          {
          units.filter(unit=> unit.company_id=== companyId).map(filteredUser => (
              <option key={filteredUser.id}>
                {filteredUser.name}
              </option>
            ))
          }
          </Select>
        </FormControl> */}
        <Link to='/createLawyers'>
          <Button as='a' size='sm' fontSize='sm' colorScheme='green'  rightIcon={<Icon as={RiAddLine} fontSize='16' />} maxWidth='200'mt='8' >
            Adicionar advogado
          </Button>
        </Link> 
      </Flex>  
      <Box flex='1' borderRadius={8} bg='gray.800' p='4' mt='4' >
        <Table colorScheme='whiteAlpha' width= '100%'>
          <Thead >
            <Tr p='2'>
              <Th w='12%' p='2' pl='2'>Nome</Th>
              <Th w='8%' p='2' pl='2'>OAB</Th>
              <Th w='8%' p='2' pl='2'>Telefone</Th>
              <Th w='8%' p='2' pl='2'>E-mail</Th>
              <Th w='10%' p='2' pl='2' >Especialidade</Th>
              <Th w='5%' p='2' pl='2'textAlign='center'>CPF</Th>
              <Th w='1%' p='2' pl='2'textAlign='center'>Editar</Th>
              <Th w='1%' p='2' pl='2'textAlign='center'>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
            // selectCompany!=='' ?
            // (
            //   selectUnit!=='' ?
            //   (
                // actives
                // .filter(unit=>unit.company_id===(companys.filter(company=>company.name===selectCompany))[0].id)
                // .filter(unit=>unit.units_id===(units.filter(company=>company.name===selectUnit))[0].id)

                lawyers.map(lawyers=>(
                  <Tr key={lawyers.id} fontSize='sm' >
                    <Td  p='2' pl='2' >{lawyers.name}</Td>
                    <Td  p='2' pl='2' >{lawyers.oab}</Td>
                    <Td  p='2' pl='2'>{lawyers.phone}</Td>
                    <Td p='2' pl='2'>{lawyers.email}</Td>
                    <Td p='2' pl='2'>{lawyers.specialty}</Td>    
                    <Td p='2' pl='2'>{lawyers.cpf}</Td>
                    <Td p='2' pl='2'textAlign='center'>
                      <Link to={`/updateLawyers/${lawyers.id}`}>
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
                        onClick={() =>{handleDelete(lawyers.id)}}
                      />
                    </Td>
                </Tr>
                ))
            //   ):(actives.filter(unit=>unit.company_id===(companys.filter(company=>company.name===selectCompany))[0].id).map(active=>(
            //     <Tr key={active.id}>
            //       <Td>{active.name}</Td>
            //       <Td>{active.description}</Td>
            //       <Td>{active.responsible}</Td>
            //       <Td>
            //         <Button as='a' size='sm' fontSize='sm' colorScheme={statusColor(active.status)} >
            //           {active.status}
            //         </Button> 
            //       </Td>
  
            //       <Td>{active.health_level}</Td>
            //       <Td >
            //         <Link to={`/uactives/${active.id}`}>
            //           <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
            //             Editar
            //           </Button> 
            //         </Link>
            //       </Td>
            //       <Td >
                    
            //           <Button 
            //             as='a' 
            //             type='submit' 
            //             size='sm' 
            //             fontSize='sm' 
            //             colorScheme='red'  
            //             rightIcon={<Icon as={RiCloseLine} 
            //             fontSize='16' />} 
            //             onClick={() =>{handleDelete(active.id)}}
            //           >
            //             Deletar
            //           </Button> 
                    
            //       </Td>
            //   </Tr>)
            //   ))
            // ):(
            //   actives.map(active=>(
            //   <Tr key={active.id}>
            //     <Td>{active.name}</Td>
            //     <Td>{active.description}</Td>
            //     <Td>{active.responsible}</Td>
            //     <Td>
            //       <Button as='a' size='sm' fontSize='sm' colorScheme={statusColor(active.status)} >
            //         {active.status}
            //       </Button> 
            //     </Td>

            //     <Td>{active.health_level}</Td>
            //     <Td >
            //       <Link to={`/uactives/${active.id}`}>
            //         <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
            //           Editar
            //         </Button> 
            //       </Link>
            //     </Td>
            //     <Td >
                  
            //         <Button 
            //           as='a'
            //           type='submit' 
            //           size='sm' 
            //           fontSize='sm' 
            //           colorScheme='red'  
            //           rightIcon={<Icon as={RiCloseLine} 
            //           fontSize='16' />} 
            //           onClick={() =>{handleDelete(active.id)}}
            //         >
            //           Deletar
            //         </Button> 
                  
            //     </Td>
            // </Tr>
            //)))
            }
          </Tbody>
        </Table>
      </Box>
    </Flex>  
  );
}