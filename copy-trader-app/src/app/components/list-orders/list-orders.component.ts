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

  constructor(private apiService: ApiService) {}
  orders: Order[] = [];
  ngOnInit(): void {
    console.log('dashboard component initialized');
    this.apiService.getOrders().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    });
  }
 
} 

