import { OrderFilter } from '../order-filter.model';
import { Paging } from '../paging';
import Driver from '../../Models/common/Driver';
export class SelectOrder {
    constructor() {
        this.IsSelectedAll = false;
        this.OrderFilter = new OrderFilter();
        this.Paging = new Paging();
        this.selectedIds = [];
        this.ExceptIds = [];
    }
    OrderFilter: OrderFilter;
    IsSelectedAll: any;
    selectedIds: any;
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
export class ReceiveOrdersToMyBranchDto{
    constructor() {
        this.selectedOrdersWithFitlerDto = new SelectOrder();
    }
    AgentId?:number;
    RegionId?:number;
    selectedOrdersWithFitlerDto:SelectOrder;
}