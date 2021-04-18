import { Region } from 'src/app/Models/Regions/region.model';

export class Client {
  constructor(){
    this.phones=[]
  }
  id?:any;
  name:any;
  userName:any;
  password:any;
  Countryid:number
  regionId?:number;
  region?:Region
  address?:any;
  firstDate:any=new Date;
  note?:any;
  canDelete?:any;
  phones?:any[]
}
export class Account
    {
        ClinetId 
        Amount
    }