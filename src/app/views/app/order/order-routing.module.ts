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
import { GetOrdersComeToMyBranchComponent } from './get-orders-come-to-my-branch/get-orders-come-to-my-branch.component';
import { GetOrderReturnedToSecondBranchComponent } from './get-order-returned-to-second-branch/get-order-returned-to-second-branch.component';
import { MoveOrdersComponent } from './move-orders/move-orders.component';
import { NewOrdersDontSendComponent } from './new-orders-dont-send/new-orders-dont-send.component';
import { OrdersWithClientComponent } from './orders-with-client/orders-with-client.component';
import { ProfitsOfOrdersComponent } from './profits-of-orders/profits-of-orders.component';
import { ReSendOrdersComponent } from './re-send-orders/re-send-orders.component';
import { ReceiptNewOrdersComponent } from './receipt-new-orders/receipt-new-orders.component';
import { ReceiptsNewOrdersComponent } from './receipts-new-orders/receipts-new-orders.component';
import { TransferToSecondBranchComponent } from './transfer-to-second-branch/transfer-to-second-branch.component';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { GetOrdersReturnedToMyBranchComponent } from './get-orders-returned-to-my-branch/get-orders-returned-to-my-branch.component';

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
    path: 'transferToSecondBranch',
    component: TransferToSecondBranchComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  }
  , {
    path: 'resend',
    component: ReSendOrdersComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: "getOrdersComeToMyBranch",
    component: GetOrdersComeToMyBranchComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  }
  ,{
    path: 'GetOrderReturnedToSecondBranch',
    component: GetOrderReturnedToSecondBranchComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
  {
    path: 'GetOrdersReturnedToMyBranch',
    component: GetOrdersReturnedToMyBranchComponent, canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
