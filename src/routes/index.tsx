import { useContext, useState } from 'react';
import { Switch } from 'react-router-dom';
import { AuthUser } from '../App';
import { Home } from '../pages';
import { AuthPage } from '../pages/Auth';
import { General } from '../pages/Dashboard/general';
import { GroupActionGeneral } from '../pages/Dashboard/groupAction';
import { IndividualGeneral } from '../pages/Dashboard/individual';
import { Lawyers } from '../pages/Dashboard/lawyers';
import { CreateClients } from '../pages/List/clients/createClients';
import { ListClients } from '../pages/List/clients/listClients';
import { UpdateClients } from '../pages/List/clients/updateClients';
import { CreateFees } from '../pages/List/fees/createFees';
import { ListFees } from '../pages/List/fees/listFees';
import { UpdateFees } from '../pages/List/fees/updateFees';
import { CreateGroupAction } from '../pages/List/groupAction/createGroupAction';
import { ListGroupAction } from '../pages/List/groupAction/listGroupAction';
import { UpdateGroupAction } from '../pages/List/groupAction/updateGroupAction';
import { CreateLawyers } from '../pages/List/lawyers/createLawyers';
import { ListLawyers } from '../pages/List/lawyers/listLawyers';
import { UpdateLawyers } from '../pages/List/lawyers/updateLawyers';
import {Route} from './Route';

export function Routes() {
  const { isAuthenticated} = useContext(AuthUser);

  return(
    <Switch>
      <Route path="/" exact component={AuthPage} />
      {isAuthenticated===true &&
      <>
        <Route path="/Home" exact component={Home} />
        <Route path="/General" exact component={General} />
        <Route path="/individual" component={IndividualGeneral} />
        <Route path="/groupAction" component={GroupActionGeneral} />
        <Route path="/lawyers" component={Lawyers} />
        <Route path="/listFees" component={ListFees} />
        <Route path="/listLawyers" component={ListLawyers} />
        <Route path="/listGroupAction" component={ListGroupAction} />
        <Route path="/listClients" component={ListClients} />
        <Route path="/createClients" component={CreateClients} />
        <Route path="/createFees" component={CreateFees} />
        <Route path="/createLawyers" component={CreateLawyers} />
        <Route path="/createGroupAction" component={CreateGroupAction} /> 
        <Route path="/updateFees/:id" component={UpdateFees} /> 
        <Route path="/updateGroupAction/:id" component={UpdateGroupAction} /> 
        <Route path="/updateClients/:id" component={UpdateClients} /> 
        <Route path="/updateLawyers/:id" component={UpdateLawyers} />
      </>
    }
    </Switch>
  );
}