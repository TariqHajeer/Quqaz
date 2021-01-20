export class CreateOrdersFromEmployee {
    Code:string
    ClientId:number
    CountryId:number
    RegionId:number
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
    name
    OrderTypeId:number
    Count:number
}
