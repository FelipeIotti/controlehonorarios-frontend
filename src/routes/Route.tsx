import React from 'react';
import { RouteProps as ReactDOMRouterProps, Route as ReactDOMRoute,} from 'react-router-dom';

interface RouteProps extends ReactDOMRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

export function Route ({isPrivate=false, component:Component,...rest}:RouteProps){
  //const{user} = useAuth();

  return(
     <ReactDOMRoute {...rest} render={()=>{return<Component/>} }/>
    // <ReactDOMRoute {...rest} render={({location})=>{
    //   return isPrivate === !!user ? (<Component/>) :( <Redirect to={{
    //     pathname: isPrivate ? '/' : '/dashboard',
    //     state: {from:location},
    //   }} /> )
    // }}/>
  );
}
