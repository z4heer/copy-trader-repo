import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './buy-orders.component.html',
  styleUrls: ['./buy-orders.component.css'],
  providers: [ApiService]
})
export class BuyOrdersComponent implements OnInit {
  buyOrderForm!: FormGroup;
  
  // Sample data: You can pre-populate with defaults
  sampleData = {
    symbol: 'INFY',
    quantity: 0,
    orderType: 'market',
    price: 0
  };

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.buyOrderForm = this.fb.group({
      symbol: [this.sampleData.symbol, Validators.required],    
      quantity: [this.sampleData.quantity, [Validators.required, Validators.min(1)]],
      orderType: [this.sampleData.orderType, Validators.required],
      price: [this.sampleData.price, Validators.required]
    });
  }

  onSubmit() {
    if (this.buyOrderForm.valid) {
      const formData = this.buyOrderForm.value;
      console.log('Buy Order Data:', formData);
      // Call the API service to submit the form data
      this.apiService.placeBuyOrder(formData).subscribe(
        data => {
          console.log('Buy Order placed successfully:', data);
          this.router.navigate(['/list-orders']); // Redirect to List Orders page 
        },
        error => {
          console.error('Error placing Buy Order:', error);
        }
      );
    } else {
      console.log('Buy Order form is invalid');
    }
  } 
    
} 