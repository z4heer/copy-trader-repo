import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modify-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the orderId from the query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'] || null;
      // If needed, you can also pre-fill the form with the order data based on the orderId
    });
    this.modifyOrderForm = this.fb.group({
      orderId: [this.sampleData.orderId, Validators.required],
      newQuantity: [this.sampleData.newQuantity, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.modifyOrderForm.valid) {
      console.log('Modify Order Data:', this.modifyOrderForm.value);
      // Dynamic logic to update order goes here
    } else {
      console.log('Modify Order form is invalid');
    }
  }
}
