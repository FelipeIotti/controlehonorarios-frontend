import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "../services/apiClient";

type User = {
  email: string;
  permission: boolean;
  name: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn:(credentials:SignInCredentials)=> Promise<boolean | any>;
  signOut:() => void;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'feesControlAuth.token');
  destroyCookie(undefined, 'feesControlAuth.refreshToken');
  

  authChannel.postMessage('signOut');
}

export function AuthProvider ({children}: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
 
  const[ isAuthenticated, setIsAuthenticated]= useState(false);


  useEffect(() => {
    authChannel =  new BroadcastChannel('auth');

    authChannel.onmessage =(message) => {
      switch (message.data) {
        case 'signOut':        
          signOut();
          break;
        default:
          break;
      }
    }
  },[])

  useEffect(()=>{
    const {'feesControlAuth.token': token} = parseCookies();
    if(token) {
      api.get('/sessions').then(response =>{
        const {email, name, isAdmin} = response.data;
        setUser({email, name, permission: isAdmin});
        if(isAdmin==="true"){
          setIsAuthenticated(true);
        }
      }).catch(() => {
        signOut();
      });
      
    }
  },[])
  async function signIn({email, password}: SignInCredentials){
    try {
      const response = await api.post('/sessions',{
        email,
        password,
      });
      
      const { token,refresh_token,user } = response.data;
      
    
      setCookie(undefined, 'feesControlAuth.token', token,{
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      setCookie(undefined, 'feesControlAuth.refreshToken', refresh_token,{
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });

      setUser({
        email,
        permission: user.permission,
        name: user.name,
      });

      if(user.permission==="true"){
        setIsAuthenticated(true);
      }

      
      api.defaults.headers['Authorization'] =`Bearer ${token}`;
      
      
      return isAuthenticated;
    }
    catch(err) {
      return err;
    }
  }

  return(
    <AuthContext.Provider value={{signIn,isAuthenticated,user,signOut}}>
      {children}
    </AuthContext.Provider>
  );
}