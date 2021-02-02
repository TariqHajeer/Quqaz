import{OrderItem} from './create-orders-from-employee.model'

export class CreateOrderFromClient {
    constructor() {
        this.OrderItem = [];
        this.RecipientPhones = [];
        
    }
    Code:string
    CountryId:number
    CountryName:string
    RegionId:any 
    RegionName:string
    Address:string
    Cost:number
    RecipientName:string 
    ClientNote:string
    RecipientPhones:string[]
    OrderItem:OrderItem[]
    CanEdit:boolean=false
}
