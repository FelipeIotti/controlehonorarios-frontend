import { Flex, SimpleGrid } from '@chakra-ui/react';
import { useContext } from 'react';
import { Header } from '../components/Header/index.tsx';
import { SideBar } from '../components/Sidebar';
import { AuthContext } from '../contexts/AuthContext';
import { Routes } from '../routes';


export function Home(){
  const {isAuthenticated} = useContext(AuthContext);
  return (  
    <Flex direction='column' h='100vh' >
      <Header />
      <Flex w='100%' my='6' justifyContent='flex-start' align='start' px='6' >
        {isAuthenticated &&
        <SideBar/>
        }
          <SimpleGrid flex='1' minChildWidth='380px' alignItems='flex-start'  > 
              
            <Routes/>
          
          </SimpleGrid>
      </Flex>
    </Flex>
  );
}