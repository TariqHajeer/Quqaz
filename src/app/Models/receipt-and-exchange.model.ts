import { from } from "rxjs"
import { Client } from '../views/app/client/client.model';
export class ReceiptAndExchange {
    id:number
    cost: number
    aboutas: string
    Prepare: string
    recipient: string
    Manager: string
    client: Client
    //يعني اذا صرف او قبض
    pay: boolean
}
