import { from } from "rxjs"
import { Client } from '../views/app/client/client.model';
export class ReceiptAndExchange {
    id:number
    cost: number
    aboutas: string
    createdby
    recipient: string
    Manager: string
    client: Client
    date:Date
    note:string
    //يعني اذا صرف او قبض
    pay: boolean
}
