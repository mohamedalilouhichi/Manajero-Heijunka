import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ProductsComponent } from '../products/products.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from '../products/product.service';
import {DatePipe} from '@angular/common';
import 'eva-icons';

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
      delete: true,
      edit: true,
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
    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="fa fa-archive fa-xs"></i>',
      confirmDeleteMessage: 'Are you sure you want to delete this product?',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
  };

  constructor(private dialogService: NbDialogService, private productService: ProductService,
              private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log('Fetched Products:', products); // Log the fetched products
        this.products = products.filter((product) => !product.archived);
        console.log('Filtered Products:', this.products); // Log filtered products
        this.source.load(this.products);
      },
      error: (error) => {
        console.error('Error loading products', error);
      },
    });
  }


  openAddProductDialog() {
    const dialogRef = this.dialogService.open(ProductsComponent);

    // Subscribe to the productAdded event from the dialog
    dialogRef.componentRef.instance.productAdded.subscribe(() => {
      this.loadProducts(); // Reload products when a new product is added
    });

    // Ensure products are reloaded when the dialog is closed, even if no product is added
    dialogRef.onClose.subscribe(() => {
      this.loadProducts();
    });
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log('Fetched Products:', products);
        this.products = products.filter((product) => !product.archived);
        console.log('Filtered Products:', this.products);
        this.source.load(this.products);
      },
      error: (error) => {
        console.error('Error loading products', error);
      },
    });
  }

  onDeleteConfirm(event: any): void {
    if (window.confirm('Are you sure you want to archive this product?')) {
      if (event.data && event.data.idProduct) {
        console.log('Archiving product with ID:', event.data.idProduct);
        const id = event.data.idProduct.toString();
        this.productService.archiveProduct(id).subscribe({
          next: (archivedProduct) => {
            console.log('Product archived successfully');
            this.source.remove(event.data);
            this.productService.getAllProducts().subscribe({
              next: (products) => {
                console.log('Fetched Products:', products);
                this.products = products.filter((product) => !product.archived);
                console.log('Filtered Products:', this.products);
                this.source.load(this.products);
              },
              error: (error) => {
                console.error('Error loading products', error);
              },
            });
            event.confirm.resolve(archivedProduct); // Resolve the event to update the table
          },
          error: (error) => {
            console.error('Archiving failed', error);
            event.confirm.reject();
          },
        });
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
