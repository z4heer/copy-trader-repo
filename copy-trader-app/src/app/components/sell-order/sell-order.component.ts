import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sell-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sell-order.component.html',
  styleUrls: ['./sell-order.component.css'],
  providers: [ApiService]
})
export class SellOrderComponent implements OnInit {
  sellOrderForm!: FormGroup;
  sampleData = {
    orderId: 'NP1',
    sellQuantity: 10
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.sellOrderForm = this.fb.group({
      orderId: [this.sampleData.orderId, Validators.required],
      sellQuantity: [this.sampleData.sellQuantity, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.sellOrderForm.valid) {
      console.log('Sell Order Data:', this.sellOrderForm.value);
      // Dynamic logic to process sell order goes here
    } else {
      console.log('Sell Order form is invalid');
    }
  }
} 