import {BrowserRouter as Router} from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import {theme} from './styles/theme';


import { SideBarDrawerProvider } from './contexts/SidebarDrawerContext';

import { Home } from './pages';
import { createContext, useState } from 'react';

interface loginProps {
  email: string;
  password: string;
}

interface AuthUserProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value:boolean) => void;
  userAuthenticate: loginProps;
}
export const AuthUser = createContext({} as AuthUserProps);

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userAuthenticate = {
    email: "financeiro@zagoadvogados.com.br",
    password: "Alexandra123"
  }
  return (
    <ChakraProvider theme={theme} >
      <SideBarDrawerProvider>

      <AuthUser.Provider value={{isAuthenticated, userAuthenticate,setIsAuthenticated}} >
        <Router>
          {/* <AuthPage/> */}
            <Home/>
          
        </Router>
        </AuthUser.Provider> 
      </SideBarDrawerProvider>
    </ChakraProvider>
  );
}

export default App;
