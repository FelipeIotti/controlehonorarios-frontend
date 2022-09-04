import {BrowserRouter as Router} from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import {theme} from './styles/theme';


import { SideBarDrawerProvider } from './contexts/SidebarDrawerContext';

import { Home } from './pages';
import { createContext } from 'react';
import { AuthProvider } from './contexts/AuthContext';

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
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const userAuthenticate = {
  //   email: "financeiro@zagoadvogados.com.br",
  //   password: "Alexandra123"
  // }
  return (
    <ChakraProvider theme={theme} >
      <SideBarDrawerProvider>

      {/* <AuthUser.Provider value={{isAuthenticated, userAuthenticate,setIsAuthenticated}} > */}
      <AuthProvider>
        <Router>
          {/* <AuthPage/> */}
            <Home/>
          
        </Router>
      </AuthProvider>
        {/* </AuthUser.Provider>  */}
      </SideBarDrawerProvider>
    </ChakraProvider>
  );
}

export default App;
