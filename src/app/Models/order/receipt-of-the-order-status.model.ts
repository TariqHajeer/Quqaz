import { Client } from 'src/app/views/app/client/client.model';
import { NameAndIdDto } from '../name-and-id-dto.model';
import { User } from '../user/user.model';
export class ReceiptOfTheOrderStatus {
  id: number;
  createdOn: Date;
  receiptOfTheOrderStatusDetalis: ReceiptOfTheOrderStatusDetalis[];
  reciverName: string;
}
export class ReceiptOfTheOrderStatusDetalis {
  id: number;
  orderCode: string;
  clientId: number;
  client: Client;
  cost: number;
  agentCost: number;
  agentId: number;
  agent: User;
  moneyPlacedId: number;
  moneyPlaced: NameAndIdDto;
  receiptOfTheOrderStatusId: number;
  orderPlacedId: number;
  orderPlaced: NameAndIdDto;
}
