import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ProductsComponent } from '../products/products.component';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductService } from '../products/product.service';

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
      edit: false,
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
      },
      totalquantity: {
        title: 'Total Quantity',
        type: 'number',
        editable: true,
      },
    },

    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
  };

  constructor(private dialogService: NbDialogService, private productService: ProductService) {}

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

  editProduct(product: any, index: number) {
  }
}
