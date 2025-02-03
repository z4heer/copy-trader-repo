import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list-holdings',
  imports: [CommonModule,RouterModule],
  templateUrl: './list-holdings.component.html',
  styleUrl: './list-holdings.component.css',
  providers: [ApiService]
})
export class ListHoldingsComponent {
  constructor(private apiService: ApiService) {}
  holdings: Holdings[] = [];
  ngOnInit(): void {
    if (this.apiService) {
      this.apiService.getNetHoldings().subscribe(data => {
        this.holdings = data;
        console.log(this.holdings);
      });
    }
  }
}
interface Holdings {
  orderId: string;
  symbol: string;
  quantity: number;
  pnl: number;
}


