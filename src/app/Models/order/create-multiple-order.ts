export class CreateMultipleOrder {
    Code:string
    CountryId:number
    CountryName:string
    Country
    RegionId:number
    RegionName:string;
    Countrys:number[]
    AgentId:number
    AgentName:string
    OrderplacedId:number
    OrderplacedName:string
    Cost:number=0
    RecipientName:string 
    RecipientPhones:string
    ClientId:number
    ClientName:string
    CanEdit:boolean=false 
    showEditMessageCode:boolean=false 
    DeliveryCost:number=0
    Note:string
    Date:Date=new Date
}
