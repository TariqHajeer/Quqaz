import { PointSetting } from 'src/app/Models/pointSettings/point-setting.model';
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
  mail
  points:PointSetting[]
}
export class Account
    {
        ClinetId 
        Amount
    }