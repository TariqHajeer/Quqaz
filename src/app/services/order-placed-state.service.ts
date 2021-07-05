import { Injectable } from '@angular/core';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';

@Injectable({
  providedIn: 'root'
})
export class OrderPlacedStateService {

  constructor() { }
  //على الطريق
  onWay(element, MoenyPlaced) {
    if (element.order.orderplaced.id == 3) {
      element.messageCost = ""
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == 1)]
       element.order.monePlaced = {...element.MoenyPlaced[0]}
    }

  }
  //تم التسليم و مرتجع جزئي
  canChangeCost(element, MoenyPlaced, temporderscostindex?) {
    console.log(element)
    if (element.order.orderplaced.id == 6 || element.order.orderplaced.id == 4) {
      element.canEditCount = false
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == 2 || m.id == 3)]
       element.order.monePlaced = {...element.MoenyPlaced[0]}
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
    if (element.order.orderplaced.id == 7 || element.order.orderplaced.id == 5) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == 3)]
       element.order.monePlaced = {...element.MoenyPlaced[0]}
      element.messageCost = ""
    }

    return element
  }
  isClientDiliverdMoney(element, MoenyPlaced) {
    if (element.order.isClientDiliverdMoney == true && element.order.orderplaced.id == 4) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m =>m.id == 2 || m.id == 4)]
       element.order.monePlaced ={ ...element.MoenyPlaced[0]}
      element.messageCost = ""
       element.order.monePlaced = {...element.MoenyPlaced[0]}
      //element.order.orderplaced = element.OrderPlaced[1]
    }
  }
  //تم التسليم
  sentDeliveredHanded(element, MoenyPlaced, tempordersmonePlacedindex?, tempisClientDiliverdMoneyindex?) {
    if (element.order.orderplaced.id == 4 && element.order.isClientDiliverdMoney == false) {
      element.MoenyPlaced = [...MoenyPlaced.filter(m => m.id == 2 || m.id == 3)]
      element.order.monePlaced ={... element.MoenyPlaced[0]}

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
    if (element.order.orderplaced.id == 7 || element.order.orderplaced.id == 5 || element.order.orderplaced.id == 8) {
      if (element.order.orderplaced.id == 5) {
        element.order.deliveryCost = 0
        element.order.agentCost = 0
      } else {
        element.order.deliveryCost = Object.assign(tempdeliveryCost, tempdeliveryCost);
        element.order.agentCost = Object.assign(tempagentCost, tempagentCost);
      }
      element.canEditDeliveryCost = false
    } else {
      element.canEditDeliveryCost = true
      element.order.deliveryCost=Object.assign(tempdeliveryCost, tempdeliveryCost);
      element.order.agentCost=Object.assign(tempagentCost, tempagentCost);
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