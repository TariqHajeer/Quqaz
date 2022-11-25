import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderFilter } from '../Models/order-filter.model';
import { DateFiter, Paging } from '../Models/paging';
import { OrderClientDontDiliverdMoney } from '../Models/order/order-client-dont-diliverd-money.model';
import { Resend } from '../Models/order/resend.model';
import { SelectOrder, TransferToSecondBranchDto } from '../Models/order/select-order.model';
import { PrintTransferOrder } from 'src/app/Models/order/print-transfer-order.model';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  controler = environment.baseUrl + 'api/Order/';
  selectOrder: SelectOrder = new SelectOrder();
  transferToSecondBranchDto: TransferToSecondBranchDto = new TransferToSecondBranchDto();
  constructor(public http: HttpClient) { }
  GetAll(filter: OrderFilter, paging: Paging) {
    let params = this.getHttpPramsFilteredForOrder(filter, paging);
    return this.http.get<any>(this.controler, { params: params });
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
  OrdersUnacceptable(filter, paging) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append('Code', filter.Code);
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append('ClientId', filter.ClientId);
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append('RowCount', paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append('Page', paging.Page);
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
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append('RowCount', paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append('Page', paging.Page);
    if (datefilter.FromDate != undefined || datefilter.FromDate != null)
      params = params.append('FromDate', datefilter.FromDate);
    if (datefilter.ToDate != undefined || datefilter.ToDate != null)
      params = params.append('ToDate', datefilter.ToDate);
    return this.http.get<any>(this.controler + 'GetEarnings', {
      params: params,
    });
  }
  ShipmentsNotReimbursedToTheClient(clientid) {
    return this.http.get<any>(
      this.controler + 'ShipmentsNotReimbursedToTheClient/' + clientid
    );
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
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append('RowCount', paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append('Page', paging.Page);
    if (number) params = params.append('number', number);
    if (code) params = params.append('code', code);
    if (client) params = params.append('clientName', client);
    return this.http.get<any>(this.controler + 'GetClientprint', {
      params: params,
    });
  }
  GetAgentPrint(paging, number, agent) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append('RowCount', paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append('Page', paging.Page);
    if (number) params = params.append('number', number);
    if (agent) params = params.append('agnetName', agent);
    return this.http.get<any>(this.controler + 'GetAgentPrint', {
      params: params,
    });
  }
  ClientDontDiliverdMoney(item: OrderClientDontDiliverdMoney) {
    let params = new HttpParams();

    if (item.ClientId != undefined || item.ClientId != null)
      params = params.append('ClientId', item.ClientId);
    if (item.ClientDoNotDeleviredMoney != undefined || item.ClientDoNotDeleviredMoney != null)
      params = params.append('ClientDoNotDeleviredMoney', item.ClientDoNotDeleviredMoney);
    if (item.IsClientDeleviredMoney != undefined || item.IsClientDeleviredMoney != null)
      params = params.append('IsClientDeleviredMoney', item.IsClientDeleviredMoney);
    if (item.OrderPlacedId.length != 0) {
      let index = 0;
      item.OrderPlacedId.forEach((element) => {
        var key = 'OrderPlacedId[' + index + ']';
        params = params.append(key, element);
        index++;
      });
    }
    return this.http.get<any>(this.controler + 'OrdersDontFinished', {
      params: params,
    });
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
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append('RowCount', paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append('Page', paging.Page);
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
  ReceiveOrdersToMyBranch(ids: any[]) {
    return this.http.put<any>(this.controler + 'ReceiveOrdersToMyBranch', ids);
  }
  GetOrderReturnedToSecondBranch(paging: Paging, destinationBranchId: any) {
    let params = new HttpParams();
    if (paging && paging.Page)
      params = params.append('Page', paging.Page);
    if (paging && paging.RowCount)
      params = params.append('RowCount', paging.RowCount);
    if (destinationBranchId)
      params = params.append('destinationBranchId', destinationBranchId);
    return this.http.get<any>(this.controler + 'GetOrdersReturnedToSecondBranch', { params: params });
  }
  SendOrdersReturnedToSecondBranch() {
    this.transferToSecondBranchDto.selectedOrdersWithFitlerDto = this.selectOrder;
    return this.http.put<any>(this.controler + 'SendOrdersReturnedToSecondBranch', this.transferToSecondBranchDto);
  }
  GetOrdersReturnedToMyBranch(filter: OrderFilter, paging: Paging) {
    let params = this.getHttpPramsFilteredForOrder(filter, paging);
    return this.http.get<any>(this.controler + 'GetOrdersReturnedToMyBranch', { params: params });
  }
  ReceiveReturnedToMyBranch(ids: any[]) {
    return this.http.put<any>(this.controler + 'ReceiveReturnedToMyBranch', ids);
  }
  GetPrintsTransferToSecondBranch(paging: Paging, destinationBranchId: any) {
    let params = new HttpParams();
    if (paging && paging.Page)
      params = params.append('Page', paging.Page);
    if (paging && paging.RowCount)
      params = params.append('RowCount', paging.RowCount);
    if (destinationBranchId)
      params = params.append('destinationBranchId', destinationBranchId);
    return this.http.get<any>(this.controler + 'GetPrintsTransferToSecondBranch', { params: params });
  }
  orderDetials: PrintTransferOrder = new PrintTransferOrder();
  GetPrintTransferToSecondBranchDetials(paging: Paging) {
    let params = new HttpParams();
    if (this.orderDetials.id)
      params = params.append('id', this.orderDetials.id);
    if (paging && paging.Page)
      params = params.append('Page', paging.Page);
    if (paging && paging.RowCount)
      params = params.append('RowCount', paging.RowCount);
    return this.http.get<any>(this.controler + 'GetPrintTransferToSecondBranchDetials', { params: params });
  }
  getHttpPramsFilteredForOrder(filter?: OrderFilter, paging?: Paging): HttpParams {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append('Code', filter.Code);
    if (filter.AgentId != undefined || filter.AgentId != null)
      params = params.append('AgentId', filter.AgentId);
    if (filter.Phone != undefined || filter.Phone != null)
      params = params.append('Phone', filter.Phone);
    if (filter.CountryId != undefined || filter.CountryId != null)
      params = params.append('CountryId', filter.CountryId);
    if (filter.RegionId != undefined || filter.RegionId != null)
      params = params.append('RegionId', filter.RegionId);
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append('ClientId', filter.ClientId);
    if (filter.Note != undefined || filter.Note != null)
      params = params.append('Note', filter.Note);
    if (filter.RecipientName != undefined || filter.RecipientName != null)
      params = params.append('RecipientName', filter.RecipientName);
    if (filter.MonePlacedId != undefined || filter.MonePlacedId != null)
      params = params.append('MonePlacedId', filter.MonePlacedId);
    if (filter.OrderplacedId != undefined || filter.OrderplacedId != null)
      params = params.append('OrderplacedId', filter.OrderplacedId);
    if (filter.CreatedBy != undefined || filter.CreatedBy != null)
      params = params.append('CreatedBy', filter.CreatedBy);
    if (filter.IsClientDiliverdMoney != undefined || filter.IsClientDiliverdMoney != null)
      params = params.append('IsClientDiliverdMoney', filter.IsClientDiliverdMoney);
    if (filter.CreatedDate != undefined || filter.CreatedDate != null)
      params = params.append('CreatedDate', filter.CreatedDate);
    if (filter.OrderState != undefined || filter.OrderState != null)
      params = params.append('OrderState', filter.OrderState);
    if (filter.AgentPrintStartDate != undefined || filter.AgentPrintStartDate != null)
      params = params.append('AgentPrintStartDate', filter.AgentPrintStartDate);
    if (filter.AgentPrintEndDate != undefined || filter.AgentPrintEndDate != null)
      params = params.append('AgentPrintEndDate', filter.AgentPrintEndDate);
    if (filter.AgentPrintNumber != undefined || filter.AgentPrintNumber != null)
      params = params.append('AgentPrintNumber', filter.AgentPrintNumber);
    if (filter.ClientPrintNumber != undefined || filter.ClientPrintNumber != null)
      params = params.append('ClientPrintNumber', filter.ClientPrintNumber);
    if (filter.createdDateRangeFilter.start)
      params = params.append('CreatedDateRangeFilter.start', String(filter.createdDateRangeFilter.start));
    if (filter.createdDateRangeFilter.end)
      params = params.append('CreatedDateRangeFilter.end', String(filter.createdDateRangeFilter.end));
    if (paging && paging.Page)
      params = params.append('Page', paging.Page);
    if (paging && paging.RowCount)
      params = params.append('RowCount', paging.RowCount);

    return params;
  }


}
