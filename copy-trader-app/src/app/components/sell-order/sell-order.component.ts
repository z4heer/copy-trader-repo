import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  orderId: string | null = null;
  qty: string | null = null;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Retrieve the orderId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      this.qty=params['quantity'] || null;
      console.log('Qty-->',this.qty);

      // If needed, you can also pre-fill the form with the order data based on the orderId
    });    
    this.sellOrderForm = this.fb.group({
      orderId: [this.orderId, Validators.required],
      sellQuantity: [this.qty, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.sellOrderForm.valid) {
      console.log('Sell Order Data:', this.sellOrderForm.value);
      // Dynamic logic to process sell order goes here
      this.apiService.sellOrder(this.sellOrderForm.value.orderId, this.sellOrderForm.value.sellQuantity).subscribe(data => {
        console.log('Sell Order placed successfully');
        this.router.navigate(['/net-positions']); // Redirect to List Orders pageprivate router: Router
      });
    } else {
      console.log('Sell Order form is invalid');
    }
  }
} 