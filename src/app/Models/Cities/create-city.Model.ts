import { Region } from "../Regions/region.model";

export class CreateCity {
    name:String;
    deliveryCost:number;
    regions:Region[]=[];
}
