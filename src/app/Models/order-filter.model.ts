import { DateRangeFilter } from '../Models/common/DateRangeFilter';
export class OrderFilter {
  constructor() {
    this.createdDateRangeFilter = new DateRangeFilter();
  }
  Code:string;
  Phone:string;
  CountryId:number;
  RegionId:number;
  ClientId:number;
  RecipientName:string;
  MoneyPalced:number;
  Orderplaced:number;
  AgentId:number;
  IsClientDiliverdMoney:boolean;
  AgentPrintNumber:number;
  ClientPrintNumber:number;
  CreatedDate;
  createdDateRangeFilter: DateRangeFilter;
  Note:string;
  AgentPrintStartDate;
  AgentPrintEndDate;
  CreatedBy:string;
  OrderState:number;
  OriginalBranchId:number;
  nextBranchId:number;
  nextBranchName:string;
}
