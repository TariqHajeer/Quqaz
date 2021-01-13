import { Region } from "../Regions/region.model";

export class City {
    id:number;
    name:string;
    deliveryCost:string;
    canDelete:boolean;
    canDeleteWithRegion:boolean
    regions:Region[] =[];
}
