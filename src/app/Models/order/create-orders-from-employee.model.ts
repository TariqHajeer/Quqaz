export class CreateOrdersFromEmployee {
    /**
     *
     */
    constructor() {
        this.OrderTypeDtos = [];
        this.RecipientPhones = [];
        
    }
    Code:string
    ClientId:number
    CountryId:number
    RegionId:any 
    RegionName:string
    Address:string
    AgentId:number
    OrderplacedId:number
    MoenyPlacedId:number
    Cost:number
    RecipientName:string
    CreatedBy:string
    Amount:number
    Date:Date
    DiliveryDate:Date
    Note:string
    RecipientPhones:string[]
    OrderTypeDtos:OrderItem[]
}
export class OrderItem{
    OrderTypeName:string
    OrderTypeId:number
    Count:number
    CanEdit:boolean=false
}
