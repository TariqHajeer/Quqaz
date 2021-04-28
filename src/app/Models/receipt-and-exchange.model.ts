import { from } from "rxjs"
import { Client } from '../views/app/client/client.model';
export class ReceiptAndExchange {
    id:number
    Amount: number
    About: string
    createdby
    recipient: string
    Manager: string
    client: Client
    ClinetId:number
    date:Date
    Note:string
    //يعني اذا صرف او قبض
    IsPay: boolean
}
