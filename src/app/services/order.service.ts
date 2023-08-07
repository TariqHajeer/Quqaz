import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderFilter } from '../Models/order-filter.model';
import { DateFiter, Paging } from '../Models/paging';
import { OrderClientDontDiliverdMoney } from '../Models/order/order-client-dont-diliverd-money.model';
import { Resend } from '../Models/order/resend.model';
import { ReceiveOrdersToMyBranchDto, ReturnOrderToMainBranchDto, SelectOrder, TransferToSecondBranchDto } from '../Models/order/select-order.model';
import { PrintTransferOrder } from 'src/app/Models/order/print-transfer-order.model';
import { GetOrdersByAgentRegionAndCode } from '../Models/order/get-orders-by-agent-region-and-code.model';
import { DeleiverMoneyForClientDto } from '../Models/order/deleiver-money-for-client-dto.model';
import { IIdWithNote } from '../shared/interfaces/IIdWithNote';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  controler = environment.baseUrl + 'api/Order/';
  selectOrder: SelectOrder = new SelectOrder();
  transferToSecondBranchDto: TransferToSecondBranchDto = new TransferToSecondBranchDto();
  returnOrderToMainBranchDto: ReturnOrderToMainBranchDto = new ReturnOrderToMainBranchDto();
  deleiverMoneyForClientDto: DeleiverMoneyForClientDto = new DeleiverMoneyForClientDto();
  orderClientDontDiliverdMoney: OrderClientDontDiliverdMoney = new OrderClientDontDiliverdMoney();
  constructor(public http: HttpClient) { }
  GetAll(filter: OrderFilter, paging: Paging) {
    let params = this.getHttpPramsFilteredForOrder(filter, paging);
    return this.http.get<any>(this.controler, { params: params });
  }
  getInStockToTransferWithAgent(filter: OrderFilter, paging: Paging) {
    let params = this.getHttpPramsFilteredForOrder(filter, paging);
    return this.http.get<any>(this.controler + "GetInStockToTransferWithAgent", { params: params });
  }
  WithoutPaging(filter: OrderFilter) {
    let params = this.getHttpPramsFilteredForOrder(filter);
    return this.http.get<any>(this.controler + 'WithoutPaging', {
      params: params,
    });
  }
  GetById(id) {
    return this.http.get<any>(this.controler + id);
  }

  Creat(item) {
    return this.http.post(this.controler, item);
  }
  createMultiple(item) {
    return this.http.post(this.controler + 'createMultiple', item);
  }
  Update(item) {
    return this.http.patch(this.controler, item);
  }
  Delete(id) {
    return this.http.delete(this.controler + id);
  }
  chekcCode(code, ClientId) {
    let params = new HttpParams();
    params = params.append('code', code != null || code != undefined ? code : null);
    params = params.append('clientid', ClientId != null || ClientId != undefined ? ClientId : null);
    return this.http.get<any>(this.controler + 'chekcCode', { params: params });
  }
  CheckMulieCode(code, ClientId) {
    return this.http.post<any>(
      this.controler + 'CheckMulieCode/' + ClientId,
      code
    );
  }
  GetNewOrder() {
    return this.http.get<any>(this.controler + 'NewOrders');
  }
  NewOrderCount() {
    return this.http.get<any>(this.controler + 'NewOrdersCount');
  }
  NewOrdersDontSendCount() {
    return this.http.get<any>(this.controler + 'NewOrdersDontSendCount');
  }
  NewOrderDontSned() {
    return this.http.get<any>(this.controler + 'NewOrderDontSned');
  }
  Accept(id) {
    return this.http.put<any>(this.controler + 'Accept', id);
  }
  DisAccept(id) {
    return this.http.put<any>(this.controler + 'DisAccept', id);
  }
  Acceptmultiple(ids) {
    return this.http.put<number>(this.controler + 'Acceptmultiple', ids);
  }
  DisAcceptmultiple(ids) {
    return this.http.put<number>(this.controler + 'DisAcceptmultiple', ids);
  }
  MakeOrderInWay(ids) {
    let params = new FormData();
    params.append('ids', ids);
    return this.http.put<any>(this.controler + 'MakeOrderInWay', ids);
  }
  UpdateOrdersStatusFromAgent(orderstate) {
    return this.http.put<any>(
      this.controler + 'UpdateOrdersStatusFromAgent',
      orderstate
    );
  }
  ReceiptOfTheStatusOfTheReturnedShipment(orderstate) {
    return this.http.put<any>(
      this.controler + 'ReceiptOfTheStatusOfTheReturnedShipment',
      orderstate
    );
  }
  ReceiptOfTheStatusOfTheDeliveredShipment(orderstate) {
    return this.http.put<any>(
      this.controler + 'ReceiptOfTheStatusOfTheDeliveredShipment',
      orderstate
    );
  }
  DeleiverMoneyForClient(ids) {
    return this.http.put<any>(this.controler + 'DeleiverMoneyForClient', ids);
  }
  DeleiverMoneyForClient2() {
    return this.http.put<any>(this.controler + 'DeleiverMoneyForClient', this.deleiverMoneyForClientDto);
  }
  OrdersUnacceptable(filter, paging) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append('Code', filter.Code);
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append('ClientId', filter.ClientId);
    this.setPaging(paging, paging);
    return this.http.get<any>(this.controler + 'DisAccept', { params: params });
  }
  SetPrintNumber(number) {
    return this.http.post<any>(this.controler + 'SetPrintNumber', number);
  }
  GetOrderByAgent(orderCode) {
    return this.http.get(this.controler + 'GetOrderByAgent/' + orderCode);
  }
  GetEarning(paging: Paging, datefilter: DateFiter) {
    let params = new HttpParams();
    params = this.setPaging(params, paging);
    if (datefilter.FromDate != undefined || datefilter.FromDate != null)
      params = params.append('FromDate', datefilter.FromDate);
    if (datefilter.ToDate != undefined || datefilter.ToDate != null)
      params = params.append('ToDate', datefilter.ToDate);
    return this.http.get<any>(this.controler + 'GetEarnings', {
      params: params,
    });
  }
  ShortageOfCash(clientId) {
    let params = new HttpParams();
    params = params.append('clientId', clientId);
    return this.http.get<any>(this.controler + 'ShortageOfCash', {
      params: params,
    });
  }
  ReiveMoneyFromClient(ids) {
    return this.http.put<any>(this.controler + 'ReiveMoneyFromClient', ids);
  }
  GetOrderByAgnetPrintNumber(printNumber) {
    let params = new HttpParams();
    params = params.append('printNumber', printNumber);
    return this.http.get<any>(this.controler + 'GetOrderByAgnetPrintNumber', {
      params: params,
    });
  }
  GetOrderByClientPrintNumber(printnumber) {
    let params = new HttpParams();
    params = params.append('printNumber', printnumber);
    return this.http.get<any>(this.controler + 'GetOrderByClientPrintNumber', {
      params: params,
    });
  }

  GetClientprint(paging, number, client, code) {

    let params = this.getHttpParmasByPaging(paging);
    if (number) params = params.append('number', number);
    if (code) params = params.append('code', code);
    if (client) params = params.append('clientName', client);
    return this.http.get<any>(this.controler + 'GetClientprint', {
      params: params,
    });
  }
  GetAgentPrint(paging, number, agent, code) {
    let params = this.getHttpParmasByPaging(paging);
    if (number) params = params.append('number', number);
    if (agent) params = params.append('agnetName', agent);
    if (code) params = params.append('code', code);
    return this.http.get<any>(this.controler + 'GetAgentPrint', {
      params: params,
    });
  }
  OrdersDontFinished() {
    this.deleiverMoneyForClientDto.Filter = this.orderClientDontDiliverdMoney;
    return this.http.post<any>(this.controler + 'OrdersDontFinished', this.orderClientDontDiliverdMoney);
  }
  OrderVicdanAgent(AgentId) {
    return this.http.get(this.controler + 'OrderVicdanAgent/' + AgentId);
  }
  GetOrderToReciveFromAgent(code) {
    return this.http.get<any>(
      this.controler + 'GetOrderToReciveFromAgent/' + code
    );
  }
  OrderInCompany(ClientId, code) {
    return this.http.get(
      this.controler + 'GetOrderForPayBy/' + ClientId + '/' + code
    );
  }
  DeleiverMoneyForClientWithStatus(ids) {
    return this.http.put<any>(
      this.controler + 'DeleiverMoneyForClientWithStatus',
      ids
    );
  }
  ReSend(order) {
    return this.http.put<any>(this.controler + 'ReSend', order);
  }
  MakeStoreOrderCompletelyReturned(id) {
    return this.http.put<any>(
      this.controler + 'MakeStoreOrderCompletelyReturned',
      id
    );
  }
  TrakingOrder(agentid, cityid) {
    let params = new HttpParams();
    if (agentid) params = params.append('agentId', agentid);
    if (cityid) params = params.append('nextCountry', cityid);
    return this.http.get<any>(this.controler + 'TrakingOrder', {
      params: params,
    });
  }
  MoveToNextStep(ids) {
    return this.http.put(this.controler + 'MoveToNextStep', ids);
  }
  OrderAtClient(filter) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append('Code', filter.Code);
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append('ClientId', filter.ClientId);
    return this.http.get<any>(this.controler + 'OrderAtClient', {
      params: params,
    });
  }
  changeAgentOrders(moveOrder) {
    return this.http.put(
      this.controler + 'TransferOrderToAnotherAgnet',
      moveOrder
    );
  }
  AddPrintNumber(id) {
    return this.http.patch(this.controler + 'AddPrintNumber/' + id, id);
  }
  AddPrintNumberMultiple(ids) {
    return this.http.patch(this.controler + 'AddPrintNumberMultiple', ids);
  }
  OrderRequestEditState() {
    return this.http.get<any>(this.controler + 'OrderRequestEditState');
  }
  AproveOrderRequestEditStateCount(id) {
    return this.http.put<any>(
      this.controler + 'AproveOrderRequestEditState',
      id
    );
  }
  DisAproveOrderRequestEditStateCount(id) {
    return this.http.put<any>(
      this.controler + 'DisAproveOrderRequestEditState',
      id
    );
  }
  OrderRequestEditStateCount() {
    return this.http.get<any>(this.controler + 'OrderRequestEditStateCount');
  }
  ReceiptOfTheOrderStatu(id) {
    return this.http.get<any>(this.controler + 'ReceiptOfTheOrderStatus/' + id);
  }
  ReceiptOfTheOrderStatus(paging, code) {
    let params = this.getHttpParmasByPaging(paging);
    if (code) params = params.append('code', code);
    return this.http.get<any>(this.controler + 'ReceiptOfTheOrderStatus', {
      params: params,
    });
  }
  GetCreatedByNames() {
    return this.http.get<any>(this.controler + 'GetCreatedByNames');
  }

  GetInStockToTransferToSecondBranch() {
    return this.http.post<any>(this.controler + 'GetInStockToTransferToSecondBranch', this.selectOrder);
  }
  TransferToSecondBranch() {
    this.transferToSecondBranchDto.selectedOrdersWithFitlerDto = this.selectOrder;
    return this.http.put<any>(this.controler + 'TransferToSecondBranch', this.transferToSecondBranchDto);
  }
  PrintTransferToSecondBranch(printNumber) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(this.controler + 'PrintTransferToSecondBranch/' + printNumber, httpOptions);
  }
  GetReSendMultiple(code) {
    let params = new HttpParams();
    if (code != undefined || code != null) params = params.append('Code', code);
    return this.http.get<any>(this.controler + 'ReSendMultiple', {
      params: params,
    });
  }
  PutReSendMultiple(resendArr: Resend[]) {
    return this.http.put<any>(this.controler + 'ReSendMultiple', resendArr);
  }
  GetOrdersComeToMyBranch(filter: OrderFilter, paging: Paging) {
    let params = this.getHttpPramsFilteredForOrder(filter, paging);
    return this.http.get<any>(this.controler + 'GetOrdersComeToMyBranch', { params: params });
  }
  ReceiveOrdersToMyBranch(receiveOrdersToMyBranch: ReceiveOrdersToMyBranchDto) {
    return this.http.put<any>(this.controler + 'ReceiveOrdersToMyBranch', receiveOrdersToMyBranch);
  }
  DisApproveOrderComeToMyBranch(id: number) {
    return this.http.put(this.controler + 'DisApproveOrderComeToMyBranch', id);
  }
  getDisApproveOrdersReturnByBranch(paging: Paging): any {
    let params = this.getHttpParmasByPaging(paging);
    return this.http.get<any>(this.controler + "GetDisApproveOrdersReturnByBranch", { params: params });
  }
  GetOrderReturnedToSecondBranch() {
    return this.http.post<any>(this.controler + 'GetOrdersReturnedToSecondBranch', this.selectOrder);
  }
  SendOrdersReturnedToSecondBranch() {
    this.returnOrderToMainBranchDto.ExceptIds = this.selectOrder.ExceptIds;
    this.returnOrderToMainBranchDto.IsSelectedAll = this.selectOrder.IsSelectedAll;
    this.returnOrderToMainBranchDto.OrderFilter = this.selectOrder.OrderFilter;
    this.returnOrderToMainBranchDto.Paging = this.selectOrder.Paging;
    this.returnOrderToMainBranchDto.SelectedIds = this.selectOrder.SelectedIds;
    return this.http.put<any>(this.controler + 'SendOrdersReturnedToSecondBranch', this.returnOrderToMainBranchDto);
  }
  PrintSendOrdersReturnedToSecondBranchReport(printNumber) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(this.controler + 'PrintSendOrdersReturnedToSecondBranchReport/' + printNumber, httpOptions);
  }
  PrintDeleiverMoneyForClient(printNumber) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(this.controler + 'PrintDeleiverMoneyForClient/' + printNumber, httpOptions);
  }
  SetDisApproveOrdersReturnByBranchInStore() {
    this.transferToSecondBranchDto.selectedOrdersWithFitlerDto = this.selectOrder;
    return this.http.post<any>(this.controler + 'SetDisApproveOrdersReturnByBranchInStore', this.selectOrder);
  }
  GetOrdersReturnedToMyBranch(paging: Paging, currentBranchId: number) {
    let params = new HttpParams();
    params = this.setPaging(params, paging);
    params = params.append('currentBranchId', String(currentBranchId));
    return this.http.get<any>(this.controler + 'GetOrdersReturnedToMyBranch', { params: params });
  }
  DisApproveReturnedToMyBranch(idWithNote: IIdWithNote) {
    return this.http.put(this.controler + 'DisApproveReturnedToMyBranch', idWithNote);
  }
  ReceiveReturnedToMyBranch() {
    this.transferToSecondBranchDto.selectedOrdersWithFitlerDto = this.selectOrder;
    return this.http.post<any>(this.controler + 'ReceiveReturnedToMyBranch', this.selectOrder);
  }
  GetPrintsTransferToSecondBranch(paging: Paging, destinationBranchId: any) {
    let params = this.getHttpParmasByPaging(paging);
    if (destinationBranchId)
      params = params.append('destinationBranchId', destinationBranchId);
    return this.http.get<any>(this.controler + 'GetPrintsTransferToSecondBranch', { params: params });
  }
  orderDetials: PrintTransferOrder = new PrintTransferOrder();
  GetPrintTransferToSecondBranchDetials(paging: Paging, id) {
    let params = new HttpParams();
    if (id)
      params = params.append('id', id);
    params = this.setPaging(params, paging);
    return this.http.get<any>(this.controler + 'GetPrintTransferToSecondBranchDetials', { params: params });
  }
  GetOrdersByAgentRegionAndCode(getOrdersByAgentRegionAndCode: GetOrdersByAgentRegionAndCode) {
    let params = new HttpParams();
    if (getOrdersByAgentRegionAndCode.AgentId)
      params = params.append('AgentId', getOrdersByAgentRegionAndCode.AgentId);
    if (getOrdersByAgentRegionAndCode.CountryId)
      params = params.append('CountryId', getOrdersByAgentRegionAndCode.CountryId);
    if (getOrdersByAgentRegionAndCode.Code)
      params = params.append('Code', getOrdersByAgentRegionAndCode.Code);
    return this.http.get<any>(this.controler + 'GetOrdersByAgentRegionAndCode', {
      params: params,
    });
  }
  getHttpParmasByPaging(paging?: Paging): HttpParams {
    let p = new HttpParams;
    return p = this.setPaging(p, paging);
  }
  setPaging(params, paging?: Paging): HttpParams {

    if (paging && paging.Page)
      params = params.append('Page', paging.Page);
    if (paging && paging.RowCount)
      params = params.append('RowCount', paging.RowCount);
    return params;
  }
  getHttpPramsFilteredForOrder(filter?: OrderFilter, paging?: Paging): HttpParams {
    let params = new HttpParams();
    if (filter?.Code)
      params = params.append('Code', filter.Code);
    if (filter?.AgentId)
      params = params.append('AgentId', filter.AgentId.toString());
    if (filter?.Phone)
      params = params.append('Phone', filter.Phone);
    if (filter?.CountryId)
      params = params.append('CountryId', filter.CountryId.toString());
    if (filter?.RegionId)
      params = params.append('RegionId', filter.RegionId.toString());
    if (filter?.ClientId)
      params = params.append('ClientId', filter.ClientId.toString());
    if (filter?.Note)
      params = params.append('Note', filter.Note);
    if (filter?.RecipientName)
      params = params.append('RecipientName', filter.RecipientName);
    if (filter?.MoneyPalced)
      params = params.append('MoneyPalced', filter.MoneyPalced.toString());
    if (filter?.Orderplaced)
      params = params.append('Orderplaced', filter.Orderplaced.toString());
    if (filter?.CreatedBy)
      params = params.append('CreatedBy', filter.CreatedBy);
    if (filter?.IsClientDiliverdMoney)
      params = params.append('IsClientDiliverdMoney', filter.IsClientDiliverdMoney.toString());
    if (filter?.CreatedDate)
      params = params.append('CreatedDate', filter.CreatedDate);
    if (filter?.OrderState)
      params = params.append('OrderState', filter.OrderState.toString());
    if (filter?.AgentPrintStartDate)
      params = params.append('AgentPrintStartDate', filter.AgentPrintStartDate);
    if (filter?.AgentPrintEndDate)
      params = params.append('AgentPrintEndDate', filter.AgentPrintEndDate);
    if (filter?.AgentPrintNumber)
      params = params.append('AgentPrintNumber', filter.AgentPrintNumber.toString());
    if (filter?.ClientPrintNumber)
      params = params.append('ClientPrintNumber', filter.ClientPrintNumber.toString());
    if (filter?.OriginalBranchId)
      params = params.append('OriginalBranchId', filter.OriginalBranchId.toString());
    if (filter?.createdDateRangeFilter.start)
      params = params.append('createdDateRangeFilter.start', filter.createdDateRangeFilter.start.toString());
    if (filter?.createdDateRangeFilter.end)
      params = params.append('createdDateRangeFilter.end', filter.createdDateRangeFilter.end.toString());
    params = this.setPaging(params, paging);

    return params;
  }
  convertSelectOrderToFromData(formdata: FormData, selectOrder: SelectOrder): FormData {
    if (selectOrder.ExceptIds) {
      selectOrder.ExceptIds.forEach(s => {
        formdata.append('ExceptIds[]', s);
      });
    }
    if (selectOrder.IsSelectedAll)
      formdata.append('IsSelectedAll', selectOrder.IsSelectedAll);

    if (selectOrder.SelectedIds) {
      selectOrder.SelectedIds.forEach(s => {
        formdata.append('selectedIds[]', s);
      })
    }
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.AgentId)
      formdata.append('AgentId', selectOrder.OrderFilter.AgentId.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.AgentPrintEndDate)
      formdata.append('AgentPrintEndDate', selectOrder.OrderFilter.AgentPrintEndDate);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.AgentPrintNumber)
      formdata.append('AgentPrintNumber', selectOrder.OrderFilter.AgentPrintNumber.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.AgentPrintStartDate)
      formdata.append('AgentPrintStartDate', selectOrder.OrderFilter.AgentPrintStartDate);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.ClientId)
      formdata.append('ClientId', selectOrder.OrderFilter.ClientId.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.ClientPrintNumber)
      formdata.append('ClientPrintNumber', selectOrder.OrderFilter.ClientPrintNumber.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.Code)
      formdata.append('Code', selectOrder.OrderFilter.Code);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.CountryId)
      formdata.append('CountryId', selectOrder.OrderFilter.CountryId.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.CreatedBy)
      formdata.append('CreatedBy', selectOrder.OrderFilter.CreatedBy);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.CreatedDate)
      formdata.append('CreatedDate', selectOrder.OrderFilter.CreatedDate);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.IsClientDiliverdMoney)
      formdata.append('IsClientDiliverdMoney', `${selectOrder.OrderFilter.IsClientDiliverdMoney}`);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.MoneyPalced)
      formdata.append('MonePlaced', selectOrder.OrderFilter.MoneyPalced.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.Note)
      formdata.append('Note', selectOrder.OrderFilter.Note);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.OrderState)
      formdata.append('OrderState', selectOrder.OrderFilter.OrderState.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.Orderplaced)
      formdata.append('Orderplaced', selectOrder.OrderFilter.Orderplaced.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.OriginalBranchId)
      formdata.append('OriginalBranchId', selectOrder.OrderFilter.OriginalBranchId.toString());
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.Phone)
      formdata.append('Phone', selectOrder.OrderFilter.Phone);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.RecipientName)
      formdata.append('RecipientName', selectOrder.OrderFilter.RecipientName);
    if (selectOrder.OrderFilter && selectOrder.OrderFilter.RegionId)
      formdata.append('RegionId', selectOrder.OrderFilter.RegionId.toString());
    if (selectOrder.Paging && selectOrder.Paging.Page)
      formdata.append('Page', selectOrder.Paging.Page);
    if (selectOrder.Paging && selectOrder.Paging.RowCount)
      formdata.append('RowCount', selectOrder.Paging.RowCount);
    return formdata;
  }
  GetOrderInAllBranches(code: string) {
    let params = new HttpParams();
    if (code)
      params = params.append('code', code);
    return this.http.get<any>(this.controler + 'GetOrderInAllBranches', { params: params });
  }

}
