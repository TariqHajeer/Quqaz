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
  canChangeCost(element, MoenyPlaced, temporderscostindex?, page?) {
    if (element.order.orderplaced.id == OrderplacedEnum.PartialReturned) {
      element.canEditCount = false
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.InsideCompany)]
      if (element.MoenyPlaced.filter(o => o.id == element.order.monePlaced.id).length > 0)
        element.order.monePlaced = element.order.monePlaced
      else element.order.monePlaced = { ...element.MoenyPlaced[0] }
    }
    else if (element.order.orderplaced.id == OrderplacedEnum.Delivered) {
      if (page == "WithAgent") {
        element.canEditCount = false
        element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent)]
        if (element.MoenyPlaced.filter(o => o.id == element.order.monePlaced.id).length > 0)
          element.order.monePlaced = element.order.monePlaced
        else element.order.monePlaced = { ...element.MoenyPlaced[0] }
      }
      if (page == "Delivered") {
        element.canEditCount = false
        element.MoenyPlaced = [...MoenyPlaced.filter(m =>m.id == MoneyPalcedEnum.InsideCompany)]
        if (element.MoenyPlaced.filter(o => o.id == element.order.monePlaced.id).length > 0)
          element.order.monePlaced = element.order.monePlaced
        else element.order.monePlaced = { ...element.MoenyPlaced[0] }
      }
    }
    else {
      if (temporderscostindex) {
        element.order.cost = Object.assign(temporderscostindex, temporderscostindex);
      }
      element.canEditCount = true
    }
    if (temporderscostindex == element.order.cost) {
      this.isClientDiliverdMoney(element, MoenyPlaced, page)
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
  isClientDiliverdMoney(element, MoenyPlaced, page?) {
    if (element.order.isClientDiliverdMoney == true) {
      if (element.order.orderplaced.id == OrderplacedEnum.Delivered) {
        if (page == "WithAgent") {
          element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent)]
          element.order.monePlaced = { ...element.MoenyPlaced[0] }
          element.messageCost = ""
        }
        if (page == "Delivered") {
          element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.Delivered)]
          element.order.monePlaced = { ...element.MoenyPlaced[0] }
          element.messageCost = ""
        }
      }
      if (
        element.order.orderplaced.id == OrderplacedEnum.PartialReturned) {
        element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.Delivered)]
        element.order.monePlaced = { ...element.MoenyPlaced[0] }
        element.messageCost = ""
      }

      if (element.order.orderplaced.id == OrderplacedEnum.Unacceptable
        || element.order.orderplaced.id == OrderplacedEnum.CompletelyReturned) {
        element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.InsideCompany)]
        element.order.monePlaced = { ...element.MoenyPlaced[0] }
        element.messageCost = ""
      }
    }
  }
  //تم التسليم
  sentDeliveredHanded(element, MoenyPlaced, page?) {
    if (element.order.orderplaced.id == OrderplacedEnum.Delivered && element.order.isClientDiliverdMoney == false) {
      if (page == "WithAgent") {
        element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent)]
        element.order.monePlaced = { ...element.MoenyPlaced[0] }
        element.messageCost = ""
      }
      if (page == "Delivered") {
        element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.InsideCompany)]
        element.order.monePlaced = { ...element.MoenyPlaced[0] }
        element.messageCost = ""
      }
    }
  }
  Delayed(element, MoenyPlaced) {
    if (element.order.orderplaced.id == OrderplacedEnum.Delayed) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.InsideCompany)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
    }
  }
  changeDeliveryCost(element, tempdeliveryCost?, MoenyPlaced?, page?) {
    if (tempdeliveryCost == element.order.deliveryCost) {
      this.isClientDiliverdMoney(element, MoenyPlaced, page)
    } else {
      if (element.order.orderplaced.id == OrderplacedEnum.Delivered) {
        if (page == "WithAgent") {
          element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent)]
        }
        if (page == "Delivered") {
          element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.InsideCompany)]
        }
      }
    }
  }
  EditDeliveryCostAndAgentCost(element, tempdeliveryCost?, tempagentCost?) {
    if (element.order.orderplaced.id == OrderplacedEnum.Unacceptable || element.order.orderplaced.id == OrderplacedEnum.CompletelyReturned || element.order.orderplaced.id == OrderplacedEnum.Delayed) {
      element.order.deliveryCost = Object.assign(tempdeliveryCost, tempdeliveryCost);
      element.order.agentCost = Object.assign(tempagentCost, tempagentCost);
      element.canEditDeliveryCost = false
    } else {
      element.canEditDeliveryCost = true
      element.order.deliveryCost = Object.assign(tempdeliveryCost, tempdeliveryCost);
      element.order.agentCost = Object.assign(tempagentCost, tempagentCost);
    }
  }
  //monyPlaceArray
  ChangeOrderPlace(OrderplacedId, MoneyPalcedArray, page?) {
    if (OrderplacedId == OrderplacedEnum.Way) {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.OutSideCompany)
    }
    else if (OrderplacedId == OrderplacedEnum.Delivered && page == "Delivered") {
      MoneyPalcedArray = [{ id: 4, name: "تم تسليمها/داخل الشركة" }]
    }
    else if (OrderplacedId == OrderplacedEnum.Delivered && page == "WithAgent") {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.WithAgent)
    }
    else if (OrderplacedId == OrderplacedEnum.CompletelyReturned) {
      MoneyPalcedArray = MoneyPalcedArray.filter(m => m.id == MoneyPalcedEnum.InsideCompany)
    }
    else if (OrderplacedId == OrderplacedEnum.PartialReturned) {
      MoneyPalcedArray = [{ id: 2, name: "مندوب" }, { id: 4, name: "تم تسليمها/داخل الشركة" }]
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
  canEditCount: boolean = true
  MoenyPlaced: NameAndIdDto[]
  OrderPlaced: NameAndIdDto[]
  messageCost
  canEditDeliveryCost: boolean = true

}