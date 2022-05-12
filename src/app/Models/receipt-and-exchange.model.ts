import { from } from "rxjs"
import { Client } from '../views/app/client/client.model';
export class CreateReceiptAndExchange {
    id:number
    Amount: number
    About: string
    createdby
    recipient: string
    Manager: string
    client: Client
    ClinetId:number
    clientName
    date
    Note:string
    //يعني اذا صرف او قبض
    IsPay: boolean
}
export class ReceiptAndExchange {
    id:number
    amount: number
    about: string
    createdby
    recipient: string
    manager: string
    client: Client
    clinetId:number
    clientName
    date
    Note:string
    //يعني اذا صرف او قبض
    isPay: boolean
}
