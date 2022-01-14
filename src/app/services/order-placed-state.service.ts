import { Injectable } from '@angular/core';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { MoneyPalcedEnum } from '../Models/Enums/MoneyPalcedEnum';
import { OrderplacedEnum } from '../Models/Enums/OrderplacedEnum';
import { OrderStateEnum } from '../Models/Enums/OrderStateEnum';
@Injectable({
  providedIn: 'root'
})
export class OrderPlacedStateService {

  constructor() { }
  //على الطريق
  onWay(element, MoenyPlaced) {

    if (element.order.orderplaced.id == OrderplacedEnum.Way) {
      element.messageCost = ""
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.OutSideCompany)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
    }

  }
  //تم التسليم و مرتجع جزئي
  canChangeCost(element, MoenyPlaced, temporderscostindex?) {
    if (element.order.orderplaced.id == OrderplacedEnum.PartialReturned
      || element.order.orderplaced.id == OrderplacedEnum.Delivered) {
      element.canEditCost = true
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.InsideCompany)]
      if (element.MoenyPlaced.some(o => o.id == element.order.monePlaced.id))
        element.order.monePlaced = element.order.monePlaced
      else element.order.monePlaced = { ...element.MoenyPlaced[0] }
    } else {
      if (temporderscostindex) {
        element.order.cost = Object.assign(temporderscostindex, temporderscostindex);

      }
      element.canEditCost = false
    }
    if (temporderscostindex == element.order.cost) {
      this.isClientDiliverdMoney(element, MoenyPlaced)
    }
  }
  rangeCost(element, temporderscostindex): boolean {
    if (element.order.cost <= temporderscostindex) {
      return true
    }
    else return false
  }
  //مرفوض, مرتجع كلي 
  unacceptable(element, MoenyPlaced) {

    if (element.order.orderplaced.id == OrderplacedEnum.Unacceptable || element.order.orderplaced.id == OrderplacedEnum.CompletelyReturned) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.InsideCompany)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
      element.messageCost = ""
    }

    return element
  }
  isClientDiliverdMoney(element, MoenyPlaced) {
    if (element.order.isClientDiliverdMoney == true && element.order.orderplaced.id == OrderplacedEnum.Delivered) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.Delivered)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
      element.messageCost = ""
      //element.order.orderplaced = element.OrderPlaced[1]
    }
    if (element.order.isClientDiliverdMoney == true && (element.order.orderplaced.id == OrderplacedEnum.PartialReturned
      || element.order.orderplaced.id == OrderplacedEnum.Unacceptable
      || element.order.orderplaced.id == OrderplacedEnum.CompletelyReturned)) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.InsideCompany)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
      element.messageCost = ""
    }
  }
  //تم التسليم
  sentDeliveredHanded(element, MoenyPlaced, tempordersmonePlacedindex?, tempisClientDiliverdMoneyindex?) {
    if (element.order.orderplaced.id == OrderplacedEnum.Delivered && element.order.isClientDiliverdMoney == false) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.InsideCompany)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }

      element.messageCost = ""
      //element.order.isClientDiliverdMoney = true
      // }else{
      //   if(tempordersmonePlacedindex&&tempisClientDiliverdMoneyindex){
      //     element.MoenyPlaced = MoenyPlaced
      //   //  element.order.monePlaced = Object.assign(tempordersmonePlacedindex, tempordersmonePlacedindex);
      //   //  element.order.isClientDiliverdMoney = Object.assign(tempisClientDiliverdMoneyindex, tempisClientDiliverdMoneyindex);

      //   }
    }
  }
  changeDeliveryCost(element, tempdeliveryCost?, MoenyPlaced?) {
    if (tempdeliveryCost == element.order.deliveryCost) {
      this.isClientDiliverdMoney(element, MoenyPlaced)
    } else {
      if (element.order.orderplaced.id == OrderplacedEnum.Delivered) {
        element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.InsideCompany)]
        element.order.monePlaced = { ...element.MoenyPlaced[0] }
      }
    }
  }
  EditDeliveryCostAndAgentCost(element, tempdeliveryCost?, tempagentCost?) {

    if (element.order.orderplaced.id == OrderplacedEnum.Unacceptable || element.order.orderplaced.id == OrderplacedEnum.CompletelyReturned || element.order.orderplaced.id == OrderplacedEnum.Delayed) {
      // if (element.order.orderplaced.id == 5) {
      //   element.order.deliveryCost = 0
      //   element.order.agentCost = 0
      // } else {
      //   element.order.deliveryCost = Object.assign(tempdeliveryCost, tempdeliveryCost);
      //   element.order.agentCost = Object.assign(tempagentCost, tempagentCost);
      // }
      //////////
      element.order.deliveryCost = Object.assign(tempdeliveryCost, tempdeliveryCost);
      element.order.agentCost = Object.assign(tempagentCost, tempagentCost);
      //////////
      element.canEditDeliveryCost = false
    } else {
      element.canEditDeliveryCost = true

      element.order.deliveryCost = Object.assign(tempdeliveryCost, tempdeliveryCost);
      element.order.agentCost = Object.assign(tempagentCost, tempagentCost);

    }
  }
  //monyPlaceArray
  ChangeOrderPlace(OrderplacedId, MoneyPalcedArray) {
    if (OrderplacedId == OrderplacedEnum.Way) {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.OutSideCompany)
    }
    else if (OrderplacedId == OrderplacedEnum.Delivered) {
      MoneyPalcedArray = [{ id: 2, name: "مندوب" }, { id: 4, name: "تم تسليمها/داخل الشركة" }]
    }
    else if (OrderplacedId == OrderplacedEnum.CompletelyReturned) {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.InsideCompany)
    }
    else if (OrderplacedId == OrderplacedEnum.PartialReturned) {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.InsideCompany || m.id == MoneyPalcedEnum.WithAgent)
    }
    else if (OrderplacedId == OrderplacedEnum.Unacceptable) {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.InsideCompany)
    }
    else if (OrderplacedId == OrderplacedEnum.Delayed) {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.InsideCompany)
    }
    return MoneyPalcedArray
  }
}
export class GetOrder {
  constructor() {
    this.MoenyPlaced = []
    this.OrderPlaced = []
  }
  order
  canEditCost: boolean;
  canEditOrder: boolean;
  MoenyPlaced: NameAndIdDto[];
  OrderPlaced: NameAndIdDto[];
  messageCost: string;
  canEditDeliveryCost: boolean = true;

}