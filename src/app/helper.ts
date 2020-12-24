import { UserPermission } from './shared/auth.roles';

export class Helper {

  public static permissions=JSON.parse(localStorage.getItem('permissions'));
    
    public  static  isHasPermission(per:string): boolean{
        let bool=false;
        bool=this.permissions.some(permission=>UserPermission.AllPermissions==permission.name);
        if(bool)
        return bool;
        bool=this.permissions.some(permission=>per==permission.name);
        return bool;
    }
    
}