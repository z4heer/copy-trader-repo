import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface NetPosition {
  positionId: string;
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
  netPositions: NetPosition[] = [
    { positionId: 'NP1', symbol: 'AAPL', quantity: 50, pnl: 120.5 },
    { positionId: 'NP2', symbol: 'GOOGL', quantity: 30, pnl: -50.0 },
    { positionId: 'NP3', symbol: 'MSFT', quantity: 40, pnl: 75.2 }
  ];
}
