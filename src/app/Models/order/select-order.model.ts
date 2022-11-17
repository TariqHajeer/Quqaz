import { OrderFilter } from '../order-filter.model';
import { Paging } from '../paging';

export class SelectOrder {
    constructor() {
        this.IsSelectedAll = false;
        this.OrderFilter = new OrderFilter();
        this.Paging = new Paging();
        this.SelectedIds = [];
        this.ExceptIds = [];
    }
    OrderFilter: OrderFilter;
    IsSelectedAll: boolean;
    SelectedIds: number[];
    ExceptIds: number[];
    Paging: Paging;
}
export class TransferToSecondBranchDto {
    constructor() {
        this.selectedOrdersWithFitlerDto = new SelectOrder();
    }
    selectedOrdersWithFitlerDto: SelectOrder;
    DriverName: string;
}