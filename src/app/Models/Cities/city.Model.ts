import { Region } from "../Regions/region.model";

export class City {
    id:number;
    name:string;
    mediator:City
    deliveryCost:number;
    canDelete:boolean;
    canDeleteWithRegion:boolean
    regions:Region[] =[];
    isMain:boolean
    points
    agnets
    branchesIds:number[]
    requiredAgent
}
