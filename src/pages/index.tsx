import { Flex, SimpleGrid } from '@chakra-ui/react';
import { Header } from '../components/Header/index.tsx';
import { SideBar } from '../components/Sidebar';
import { Routes } from '../routes';


export function Home(){
  return (  
    <Flex direction='column' h='100vh' >
      <Header />
      <Flex w='100%' my='6' justifyContent='flex-start' align='start' px='6' >
        <SideBar/>
          <SimpleGrid flex='1' minChildWidth='380px' align='flex-start'  > 
              
            <Routes/>
          
          </SimpleGrid>
      </Flex>
    </Flex>
  );
}