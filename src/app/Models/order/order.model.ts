import { City } from '../Cities/city.Model'
import { Region } from '../Regions/region.model'
import { User } from '../user/user.model'
import { NameAndIdDto } from '../name-and-id-dto.model'
import { Client } from 'src/app/views/app/client/client.model'
export class Order {
      Id: number
      Code: string
      DeliveryCost: number
      Cost: number
      RecipientName: string
      RecipientPhones: string
      Address: string
      CreatedBy: string
      Date: Date
      DiliveryDate: Date
      Note: string
      Client: Client
      Country: City
      Region: Region
      MonePlaced: NameAndIdDto
      Orderplaced: NameAndIdDto
      Agent: User
}
export class OrderState {
      Id: number
      Cost: number
      MoenyPlacedId: number
      OrderplacedId: number
      DeliveryCost:number
      AgentCost:number
      Note

}
export class IdCost{
      Id
      Cost
      PayForClient
}
export class DateIdCost{
      Date
      IdCosts:IdCost[]
}