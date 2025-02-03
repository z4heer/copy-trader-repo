import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.css'],
  providers: [ApiService]
})
export class ModifyOrderComponent implements OnInit {
  modifyOrderForm!: FormGroup;
  sampleData = {
    orderId: 'B1',
    newQuantity: 15
  };
  orderId: string | null = null;
  qty: string | null = null;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,
    private apiService: ApiService) {}

  ngOnInit() {
    // Retrieve the orderId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      this.qty=params['quantity'] || null;
      // If needed, you can also pre-fill the form with the order data based on the orderId
    });
    this.modifyOrderForm = this.fb.group({
      orderId: [this.orderId, Validators.required],
      newQuantity: [this.qty, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.modifyOrderForm.valid) {
      console.log('Modify Order Data:', this.modifyOrderForm.value);
      // Dynamic logic to update order goes here
      this.apiService.modifyOrder(this.modifyOrderForm.value.orderId, this.modifyOrderForm.value).subscribe(data => {
        console.log('Order modified successfully');
        this.router.navigate(['/list-orders']); // Redirect to List Orders page        
      }); 
    } else {
      console.log('Modify Order form is invalid');
    }
  }
} 