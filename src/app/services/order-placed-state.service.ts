import { Injectable } from '@angular/core';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';

@Injectable({
  providedIn: 'root'
})
export class OrderPlacedStateService {

  constructor() { }
  //على الطريق
  onWay(element,MoenyPlaced) {
    if (element.order.orderplaced.id == 3) {
      element.MoenyPlaced=MoenyPlaced.filter(m => m.id == 1)
      element.order.monePlaced=element.MoenyPlaced[0]
    }
    return element
  }
  //مرتجع جزئي
  canChangeCost(element,MoenyPlaced,temporderscostindex?){
    if (element.order.orderplaced.id == 6) {
      element.canEditCount = false
      element.MoenyPlaced = MoenyPlaced.filter(m => m.id == 2 || m.id == 3)
    }else{
      if(temporderscostindex){
        element.canEditCount = true
        element.order.cost = Object.assign(temporderscostindex, temporderscostindex);
        
      }
      
    }
  }
  //مرفوض, مرتجع كلي 
  unacceptable(element,MoenyPlaced){
    if (element.order.orderplaced.id == 7||element.order.orderplaced.id == 5) {
      element.MoenyPlaced=MoenyPlaced.filter(m => m.id == 1)
      element.order.monePlaced=element.MoenyPlaced[0]
    }
   
    return element
  }
  isClientDiliverdMoney(element,MoenyPlaced){
    if (element.order.isClientDiliverdMoney == true&&element.order.orderplaced.id == 4 ) {
      element.MoenyPlaced = MoenyPlaced.filter(m => m.id == 2||m.id == 3)
     // element.order.monePlaced = element.MoenyPlaced[0]
      //element.order.orderplaced = element.OrderPlaced[1]
    }
  }
  //تم التسليم
  sentDeliveredHanded(element,MoenyPlaced,tempordersmonePlacedindex?,tempisClientDiliverdMoneyindex?){
    if (element.order.orderplaced.id == 4){
      element.MoenyPlaced = MoenyPlaced.filter(m => m.id == 2||m.id == 4)
      element.order.monePlaced = element.MoenyPlaced[0]
      //element.order.isClientDiliverdMoney = true
    }else{
      if(tempordersmonePlacedindex&&tempisClientDiliverdMoneyindex){
        element.MoenyPlaced = MoenyPlaced
        element.order.monePlaced = Object.assign(tempordersmonePlacedindex, tempordersmonePlacedindex);
      //  element.order.isClientDiliverdMoney = Object.assign(tempisClientDiliverdMoneyindex, tempisClientDiliverdMoneyindex);
     
      }
     }
  }
 
}
export class GetOrder {
  constructor() {
    this.MoenyPlaced = []
    this.OrderPlaced = []
  }
  order
  canEditCount:boolean=true
  MoenyPlaced: NameAndIdDto[]
  OrderPlaced: NameAndIdDto[]

}