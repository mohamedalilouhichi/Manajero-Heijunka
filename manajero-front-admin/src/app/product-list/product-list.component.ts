import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ProductsComponent } from '../products/products.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from '../products/product.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  products: any[] = [];

  settings = {
    actions: {
      add: false,
      edit: true,
      delete: true,
    },
    columns: {
      productName: {
        title: 'Product Name',
        type: 'string',
        editable: true,
      },
      productCode: {
        title: 'Product Code',
        type: 'string',
        editable: true,
      },
      productCategory: {
        title: 'Category',
        type: 'string',
        editable: true,
      },
      productDate: {
        title: 'Product Date',
        type: 'date',
        editable: true,
        valuePrepareFunction: (date: Date) => {
          return this.datePipe.transform(date, 'fullDate');
        },
      },
      totalquantity: {
        title: 'Total Quantity',
        type: 'number',
        editable: true,
      },
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDeleteMessage: 'Are you sure you want to delete this product?',
    },
  };

  constructor(private dialogService: NbDialogService, private productService: ProductService,
              private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.source.load(this.products);
    });
  }

  openAddProductDialog() {
    const dialogConfig = {
      context: {
        title: 'Ajouter un Produit'}};
    this.dialogService.open(ProductsComponent);
  }

  onDeleteConfirm(event: any): void {

    if (window.confirm('Are you sure you want to delete this product?')) {
      if (event.data && event.data.idProduct) {
        const id = event.data.idProduct.toString();
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            console.log('Product deleted successfully');
            this.source.remove(event.data);
            event.confirm.resolve();
          },
          error: (error) => {
            console.error('Delete failed', error);
            event.confirm.reject();
          }});
      } else {
        console.error('ID is undefined or null');
        event.confirm.reject();
      }
    } else {
      event.confirm.reject();
    }
  }
  onEditConfirm(event: any): void {
    if (window.confirm('Are you sure you want to save these changes?')) {
      const updatedProductData = event.newData;

      // Call the service to update the product
      this.productService.updateProduct(updatedProductData.idProduct, updatedProductData).subscribe({
        next: (updatedProduct) => {
          console.log('Product updated successfully');
          event.confirm.resolve(updatedProduct); // Resolve the event to update the table
        },
        error: (error) => {
          console.error('Update failed', error);
          event.confirm.reject();
        },
      });
    } else {
      event.confirm.reject();
    }
  }


}
