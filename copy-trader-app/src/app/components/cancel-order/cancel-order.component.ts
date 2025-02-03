import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cancel-order',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './cancel-order.component.html',
  styleUrl: './cancel-order.component.css',
  providers: [ApiService]
} )
export class CancelOrderComponent implements OnInit {
  cancelOrderForm!: FormGroup;
  sampleData = {
    orderId: 'B1',
    newQuantity: 15
  };
  orderId: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // Retrieve the orderId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      // If needed, you can also pre-fill the form with the order data based on the orderId
    });
    this.cancelOrderForm = this.fb.group({
      orderId: [this.sampleData.orderId, Validators.required],
      newQuantity: [this.sampleData.newQuantity, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.cancelOrderForm.valid) {
      console.log('Cancel Order Data:', this.cancelOrderForm.value);
      // Dynamic logic to update order goes here
      console.log('Order canceled for orderid= ',this.orderId);
      this.apiService.cancelOrder(this.cancelOrderForm.value.orderId).subscribe(data => {
      console.log('Order canceled successfully');
      this.router.navigate(['/list-orders']); // Redirect to List Orders page
      }); 
    } else {
      console.log('Cancel Order form is invalid');
    }
  }
}
