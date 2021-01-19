import { Region } from "../Regions/region.model";

export class City {
    id:number;
    name:string;
    deliveryCost:number;
    canDelete:boolean;
    canDeleteWithRegion:boolean
    regions:Region[] =[];
}
