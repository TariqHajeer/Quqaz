import { Region } from "../Regions/region.model";

export class City {
    id:number;
    name:string;
    deliveryCost:string;
    canDelete:boolean;
    CanDeleteWithRegion:boolean
    regions:Region[] =[];
}
