import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { AddMulitpleOrdersWithRegionComponent } from './add-mulitple-orders-with-region/add-mulitple-orders-with-region.component';
import { AddMultipulOrdersAgentWithRegionComponent } from './add-multipul-orders-agent-with-region/add-multipul-orders-agent-with-region.component';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { CreateMulitpleOrderComponent } from './create-mulitple-order/create-mulitple-order.component';
import { CreateMultiOrderAgentAndClientComponent } from './create-multi-order-agent-and-client/create-multi-order-agent-and-client.component';
import { CreatemultipleOrderFromClientComponent } from './createmultiple-order-from-client/createmultiple-order-from-client.component';
import { CreatemultipulorderagentComponent } from './createmultipulorderagent/createmultipulorderagent.component';
import { EditClientOrdersComponent } from './edit-client-orders/edit-client-orders.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { MoveOrdersToAgentByCodeComponent } from './move-orders-to-agent-by-code/move-orders-to-agent-by-code.component';
import { MoveOrdersComponent } from './move-orders/move-orders.component';
import { NewOrdersDontSendComponent } from './new-orders-dont-send/new-orders-dont-send.component';
import { OrdersWithClientComponent } from './orders-with-client/orders-with-client.component';
import { ProfitsOfOrdersComponent } from './profits-of-orders/profits-of-orders.component';
import { ReSendOrdersComponent } from './re-send-orders/re-send-orders.component';
import { ReceiptNewOrdersComponent } from './receipt-new-orders/receipt-new-orders.component';
import { ReceiptsNewOrdersComponent } from './receipts-new-orders/receipts-new-orders.component';
import { ShipmentReceivedByAgentComponent } from './shipment-received-by-agent/shipment-received-by-agent.component';
import { ShipmentReceivedByDeliveredComponent } from './shipment-received-by-delivered/shipment-received-by-delivered.component';
import { ShipmentReceivedByReturnedComponent } from './shipment-received-by-returned/shipment-received-by-returned.component';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


const routes: Routes = [
  {
    path: '',
    component: ViewOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder, UserPermission.AddOrder] }
  },
  {
    path: 'addorder',
    component: AddOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder] }
  },
  {
    path: 'addMulitpleOrders',
    component: CreateMulitpleOrderComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder] }
  },
  {
    path: 'addMulitpleOrdersWithRegion',
    component: AddMulitpleOrdersWithRegionComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder] }
  },
  {
    path: 'addMulitpleOrdersAgentWithRegion',
    component: AddMultipulOrdersAgentWithRegionComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder] }
  },
  {
    path: 'addMulitpleOrdersfromClient',
    component: CreatemultipleOrderFromClientComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder] }
  },
  {
    path: 'addMulitpleOrdersfromAgent',
    component: CreatemultipulorderagentComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder] }
  },
  {
    path: 'addMulitpleOrdersfromClientandAgent',
    component: CreateMultiOrderAgentAndClientComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder] }
  },
  {
    path: 'editorder/:id',
    component: EditOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.UpdateOrder] }
  },
  {
    path: 'neworders',
    component: ViewNewOrderComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'receiptNeworder',
    component: ReceiptNewOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'ProfitsOfOrders',
    component: ProfitsOfOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'editclientorders',
    component: EditClientOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'moveorder',
    component: MoveOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'orderswithclient',
    component: OrdersWithClientComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'newordersdonotsend',
    component: NewOrdersDontSendComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'newordersprint',
    component: ReceiptsNewOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'resend',
    component: ReSendOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'shipmentReceivedByAgent',
    component: ShipmentReceivedByAgentComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'shipmentReceivedByDelivered',
    component: ShipmentReceivedByDeliveredComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'shipmentReceivedByReturned',
    component: ShipmentReceivedByReturnedComponent, canActivate: [AuthGuard],
  },
  {
    path: 'moveOrdersToAgentByCode',
    component: MoveOrdersToAgentByCodeComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
