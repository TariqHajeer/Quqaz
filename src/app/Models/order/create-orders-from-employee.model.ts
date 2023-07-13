import { Client } from 'src/app/views/app/client/client.model';
import { OrderLog } from './order-log.model'
import { City } from '../Cities/city.Model';
import { User } from '../user/user.model';
export class CreateOrdersFromEmployee {
    /**
     *
     */
    constructor() {
        this.OrderTypeDtos = [];
        this.RecipientPhones = [];

    }
    Id: number
    Code: string
    ClientId: number
    Client: Client = new Client();
    CountryId: number
    Country: City = new City();
    RegionId: any
    RegionName: string
    Address: string
    AgentId: number
    Agent:User
    OrderplacedId: number
    MoenyPlacedId: number
    Cost: number = 0
    RecipientName: string
    CreatedBy: string
    Amount: number
    Date: any = new Date
    DiliveryDate: any = new Date
    Note: string
    RecipientPhones: string[]
    OrderTypeDtos: OrderItem[]
    DeliveryCost: number = 0
    OldCost
    orderLogs: OrderLog[]
    printedTimes
    branchId: number;
    currentBranchId:number;
}
export class OrderItem {
    OrderTypeName: string
    OrderTypeId: number
    Count: number
    CanEdit: boolean = false
}
