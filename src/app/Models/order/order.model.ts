import { City } from '../Cities/city.Model'
import { Region } from '../Regions/region.model'
import { User } from '../user/user.model'
import { NameAndIdDto } from '../name-and-id-dto.model'
import { Client } from 'src/app/views/app/client/client.model'
export class Order {
      id: number
      code: string
      deliveryCost: number
      cost: number
      recipientName: string
      recipientPhones
      address: string
      createdBy: string
      date: Date
      diliveryDate: Date
      note: string
      client: Client
      country: City
      region: Region
      monePlaced: NameAndIdDto
      orderplaced: NameAndIdDto
      agent: User
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