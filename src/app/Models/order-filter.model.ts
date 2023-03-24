import { DateRangeFilter } from '../Models/common/DateRangeFilter';
export class OrderFilter {
  constructor() {
    this.createdDateRangeFilter = new DateRangeFilter();
  }
  Code;
  Phone;
  CountryId;
  RegionId;
  ClientId;
  RecipientName;
  MonePlacedId;
  OrderplacedId;
  AgentId;
  IsClientDiliverdMoney;
  AgentPrintNumber;
  ClientPrintNumber;
  CreatedDate;
  createdDateRangeFilter: DateRangeFilter;
  Note;
  AgentPrintStartDate;
  AgentPrintEndDate;
  CreatedBy;
  OrderState;
  OriginalBranchId;
  nextBranchId;
  nextBranchName;
}
