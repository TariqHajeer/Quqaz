import { Region } from 'src/app/Models/Regions/region.model';

export interface Client {
  id?:any;
  name:any;
  userName:any;
  password:any;
  regionId?:number;
  region?:Region
  address?:any;
  firstDate?:any;
  note?:any;
  canDelete?:any;
  phones?:any[]
}
