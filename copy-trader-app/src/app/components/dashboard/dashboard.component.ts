import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})
export class DashboardComponent {
  activeUsers: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    console.log('dashboard component initialized');
    this.apiService.getActiveUsers().subscribe(data => {
      this.activeUsers = data;
      console.log(this.activeUsers);
    });
  }
}