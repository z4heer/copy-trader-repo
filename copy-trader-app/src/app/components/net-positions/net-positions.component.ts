import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface NetPosition {
  orderId: string;
  symbol: string;
  quantity: number;
  pnl: number;
}

@Component({
  selector: 'app-net-positions',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './net-positions.component.html',
  styleUrls: ['./net-positions.component.css'],
  providers: [ApiService]
})
export class NetPositionsComponent {
  constructor(private apiService: ApiService) {}
  netPositions: NetPosition[] = [];
  ngOnInit(): void {
    if (this.apiService) {
      this.apiService.getNetPositions().subscribe(data => {
        this.netPositions = data;
        console.log(this.netPositions);
      });
    }
  }
} 
