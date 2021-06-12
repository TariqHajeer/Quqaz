export class CreateMultipleOrder {
    Code:string
    CountryId:number
    CountryName:string
    Country
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
   // Amount:number
    CanEdit:boolean=false 
    showEditMessageCode:boolean=false 
    DeliveryCost:number
    Note:string
    Date:Date=new Date
}
