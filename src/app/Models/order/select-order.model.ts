import { OrderFilter } from '../order-filter.model';
import { Paging } from '../paging';
import Driver from '../../Models/common/Driver';
export class SelectOrder {
    constructor() {
        this.IsSelectedAll = false;
        this.OrderFilter = new OrderFilter();
        this.Paging = new Paging();
        this.SelectedIds = [];
        this.ExceptIds = [];
    }
    OrderFilter: OrderFilter;
    IsSelectedAll: any;
    SelectedIds: any;
    ExceptIds: any;
    Paging: Paging;
}
export class TransferToSecondBranchDto {
    constructor() {
        this.selectedOrdersWithFitlerDto = new SelectOrder();
        this.Driver = new Driver();
    }
    selectedOrdersWithFitlerDto: SelectOrder;
    DriverName: string;
    DriverId: any;
    Driver: Driver;
}