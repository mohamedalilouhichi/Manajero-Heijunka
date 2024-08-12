import {Component, EventEmitter, Output} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from './product.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productForm: FormGroup;
  @Output() productAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private http: HttpClient, protected dialogRef: NbDialogRef<ProductsComponent>
              , private productService: ProductService) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      productCategory: ['', Validators.required],
      productDate: [new Date(), Validators.required] });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = {
        ...this.productForm.value,
        productDate: new Date(this.productForm.value.productDate).toISOString(),
      };

      this.productService.createProduct(productData)
        .subscribe({
          next: (response) => {
            console.log('Product created successfully', response);
            this.productAdded.emit(); // Notify parent component

          },
          error: (error) => {
            console.error('Error creating product:', error);
          }});
      this.dialogRef.close();
    } else {
      console.error('Form is invalid');
    }
  }  close() {
    this.dialogRef.close();
  }
}
