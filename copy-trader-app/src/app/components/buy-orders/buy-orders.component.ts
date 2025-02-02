import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-buy-orders',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './buy-orders.component.html',
  styleUrls: ['./buy-orders.component.css'],
  providers: [ApiService]
})
export class BuyOrdersComponent implements OnInit {
  buyOrderForm!: FormGroup;
  
  // Sample data: You can pre-populate with defaults
  sampleData = {
    quantity: 10,
    orderType: 'market'
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buyOrderForm = this.fb.group({
      quantity: [this.sampleData.quantity, [Validators.required, Validators.min(1)]],
      orderType: [this.sampleData.orderType, Validators.required]
    });
  }

  onSubmit() {
    if (this.buyOrderForm.valid) {
      console.log('Buy Order Data:', this.buyOrderForm.value);
      // Update dynamic logic later
    } else {
      console.log('Buy Order form is invalid');
    }
  }
} 