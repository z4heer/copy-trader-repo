import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface Order {
  orderId: string;
  type: string;
  quantity: number;
  status: string;
}

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
  providers: [ApiService]
})
export class ListOrdersComponent {
  // Sample order data
  orders: Order[] = [
    { orderId: 'B1', type: 'Buy', quantity: 10, status: 'pending' },
    { orderId: 'B2', type: 'Buy', quantity: 20, status: 'completed' },
    { orderId: 'M1', type: 'Modify', quantity: 15, status: 'pending' }
  ];
} 