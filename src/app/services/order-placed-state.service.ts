import { Injectable } from '@angular/core';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import{MoneyPalcedEnum} from '../Models/Enums/MoneyPalcedEnum';
import{OrderplacedEnum} from '../Models/Enums/OrderplacedEnum';
import{OrderStateEnum} from '../Models/Enums/OrderStateEnum';
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
    
    
    if (element.order.orderplaced.id == OrderplacedEnum.PartialReturned || element.order.orderplaced.id == OrderplacedEnum.Delivered) {
      element.canEditCount = false
      
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.InsideCompany)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
    } else {
      if (temporderscostindex) {
        element.order.cost = Object.assign(temporderscostindex, temporderscostindex);

      }
      element.canEditCount = true


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
    if (element.order.isClientDiliverdMoney == true && element.order.orderplaced.id == OrderplacedEnum.Delivered ){
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == MoneyPalcedEnum.WithAgent || m.id == MoneyPalcedEnum.Delivered)]
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
      element.messageCost = ""
      element.order.monePlaced = { ...element.MoenyPlaced[0] }
      //element.order.orderplaced = element.OrderPlaced[1]
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
  EditDeliveryCost(element, tempdeliveryCost?, tempagentCost?) {
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