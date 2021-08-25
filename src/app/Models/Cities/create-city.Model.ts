import { Region } from "../Regions/region.model";

export class CreateCity {
    id
    name:String;
    deliveryCost:number;
    regions:Region[]=[];
    mediatorId
    points:number
}
