import { Client } from "src/app/views/app/client/client.model"
import { Paging } from "../paging";

export class OrderClientDontDiliverdMoney {
    ClientId
    Client: Client = new Client();
    OrderPlacedId
    OrderPlaced
    IsClientDeleviredMoney
    ClientDoNotDeleviredMoney
    tableSelection: TableSelection = new TableSelection();
    paging: Paging = new Paging();
}
export class TableSelection {
    isSelectedAll: boolean;
    selectedIds: number[] = [];
    exceptIds:number[]=[];
}
