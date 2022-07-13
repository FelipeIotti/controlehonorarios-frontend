import { Stack,Text,Icon, Flex } from "@chakra-ui/react";
import { NaviSection } from "./NaviSection";

import { Link} from 'react-router-dom';

import { RiAuctionFill, RiAuctionLine, RiDashboardFill, RiDashboardLine,  RiUser2Fill, RiUser2Line, RiUserSearchFill} from "react-icons/ri";

export function SideBarNavi() {
  return(
    <Stack spacing='12' align='flex-start'>
      <NaviSection title='Dashboard' >
        <Link to='/general'>
          <Flex align='center'>
            <Icon as={RiDashboardFill} fontSize='18' mr='2' />
            <Text  fontWeight='medium' >Geral</Text>
          </Flex>
        </Link>

        <Link to='/individual'>
          <Flex align='center'>
            <Icon as={RiUserSearchFill} fontSize='18' mr='2' />
            <Text  fontWeight='medium' >Individual</Text>
          </Flex>
        </Link>

        <Link to='/groupAction'>
          <Flex align='center'>
            <Icon as={RiAuctionLine} fontSize='18' mr='2' />
            <Text  fontWeight='medium' >Grupo de Ações</Text>
          </Flex>
        </Link>

        <Link to='/lawyers'>
          <Flex align='center'>
            <Icon as={RiUser2Fill} fontSize='18' mr='2' />
            <Text  fontWeight='medium' >Advogados</Text>
          </Flex>
        </Link>

      </NaviSection>

      <NaviSection title='Listagem' >

        <Link to='/listFees'>
          <Flex align='center'>
            <Icon as={RiDashboardLine} fontSize='18' mr='2' />
            <Text fontWeight='medium'>Honários</Text>
          </Flex>
        </Link>
        
        <Link to='/listLawyers'>
          <Flex align='center'>
            <Icon as={RiUser2Fill} fontSize='18' mr='2' />
            <Text fontWeight='medium'>Advogados</Text>
          </Flex>
        </Link>
        <Link to='/listClients'>
          <Flex align='center'>
            <Icon as={RiUser2Line} fontSize='18' mr='2' />
            <Text fontWeight='medium'>Clientes</Text>
          </Flex>
        </Link>

        <Link to='/listGroupAction'>
          <Flex align='center'>
            <Icon as={RiAuctionFill} fontSize='18' mr='2' />
            <Text fontWeight='medium'>Grupo de Ação</Text>
          </Flex>        
        </Link>
        
        
      </NaviSection>
    </Stack>
  );
}