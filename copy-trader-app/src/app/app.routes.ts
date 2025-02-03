import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BuyOrdersComponent } from './components/buy-orders/buy-orders.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { ModifyOrderComponent } from './components/modify-order/modify-order.component';
import { NetPositionsComponent } from './components/net-positions/net-positions.component';
import { SellOrderComponent } from './components/sell-order/sell-order.component';
import { CancelOrderComponent } from './components/cancel-order/cancel-order.component';
import { ListHoldingsComponent } from './list-holdings/list-holdings.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'buy-orders', component: BuyOrdersComponent },
  { path: 'list-orders', component: ListOrdersComponent },
  { path: 'modify-order', component: ModifyOrderComponent },
  { path: 'cancel-order', component: CancelOrderComponent },
  { path: 'net-positions', component: NetPositionsComponent },
  { path: 'sell-order', component: SellOrderComponent },
  { path: 'list-holdings', component: ListHoldingsComponent }  
];