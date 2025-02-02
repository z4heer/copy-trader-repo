import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Update with your backend URL, e.g., 'http://localhost:5000'
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  // Dashboard
  getActiveUsers(): Observable<any> {
    console.log('getActiveUsers');
    return this.http.get(`${this.baseUrl}/active-users`);
  }

  // Buy Orders: For all active users
  placeBuyOrder(): Observable<any> 
  {
    console.log('placeBuyOrder');
    return this.http.post(`${this.baseUrl}/buy-order`, {});
  }

  // List Orders
  getOrders(): Observable<any> {
    console.log('getOrders');
    return this.http.get(`${this.baseUrl}/orders`);
  }

  // Modify Order
  modifyOrder(orderId: string, updateData: any): Observable<any> {
    console.log('modifyOrder, orderId: ', orderId);
    return this.http.put(`${this.baseUrl}/modify-order/${orderId}`, updateData);
  }

  // Cancel Order
  cancelOrder(orderId: string): Observable<any> {
    console.log("cancelOrder, orderId: ", orderId);
    return this.http.delete(`${this.baseUrl}/cancel-order/${orderId}`);
  }

  // Net Positions
  getNetPositions(): Observable<any> {
    console.log("getNetPositions");
    return this.http.get(`${this.baseUrl}/net-positions`);
  }

  // Sell Order
  sellOrder(orderId: string): Observable<any> {
    console.log("sellOrder, orderId: ", orderId);
    return this.http.post(`${this.baseUrl}/sell-order`, { orderId });
  }
} 