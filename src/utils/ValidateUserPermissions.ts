type User = {
  name: string;
  permission: boolean;
  email: string;
}

type ValidateUserPermissionsParams = {
  user: User;
}

export function validateUserPermissions({user}: ValidateUserPermissionsParams){
    if(user.permission===true){
    return true;
    }
    else {
      return false;
    }    
}