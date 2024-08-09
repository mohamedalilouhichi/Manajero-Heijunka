import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Product} from "./product";
import {ProductService} from "./product.service";
import {Orders} from "../algorithm/Orders";
import {ProductionPlan} from "../planning/productionplan";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, protected dialogRef: NbDialogRef<ProductsComponent>
              ,private productService: ProductService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      productCategory: ['', Validators.required],
      productDate: [new Date(), Validators.required],    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      // Format the date properly before sending the request
      const formattedDate = new Date(this.productForm.value.productDate).toISOString();
      const productData = {
        ...this.productForm.value,
        productDate: formattedDate
      };

      this.http.post('http://localhost:8089/Heijunka/products', productData)
        .subscribe({
          next: (response) => {
            console.log('Product created successfully', response);
          },
          error: (error) => {
            console.error('Error creating product:', error);
          }
        });
    } else {
      console.error('Form is invalid');
    }
  }
  close() {
    this.dialogRef.close();
  }
}
