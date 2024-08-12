import {Component, OnInit} from '@angular/core';
import {HeijunkaBox} from '../LatestHeijunkaBox/HeijunkaBox';
import {HeijunkaboxService} from '../LatestHeijunkaBox/heijunkabox.service';
import {DatePipe} from '@angular/common';
import {ProductService} from '../products/product.service';
import {Product} from '../products/product';
import {LocalDataSource} from 'ng2-smart-table';
import {RestoreButtonComponent} from './restore-button.component';

@Component({
  selector: 'ngx-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
})
export class ArchiveComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  archivedHeijunkaBoxes: HeijunkaBox[] = [];
  archivedProducts: Product[] = [];
  products: Product[] = [];

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      productName: {
        title: 'Product Name',
        type: 'string',
        editable: false,
      },
      productCode: {
        title: 'Product Code',
        type: 'string',
        editable: false,
      },
      productCategory: {
        title: 'Category',
        type: 'string',
        editable: false,
      },
      productDate: {
        title: 'Product Date',
        type: 'date',
        editable: false,
        valuePrepareFunction: (date: Date) => {
          return this.datePipe.transform(date, 'fullDate');
        },
      },
      restore: {
        title: 'Restore',
        type: 'custom',
        renderComponent: RestoreButtonComponent,
        onComponentInitFunction: (instance: any) => {
          instance.restoreProduct = this.restoreProduct.bind(this);
        },
        filter: false,
      },

    },
  };
  constructor(private heijunkaboxService: HeijunkaboxService, private datePipe: DatePipe,
              private productService: ProductService) { }

  ngOnInit(): void {
    this.heijunkaboxService.getArchivedHeijunkaBoxes().subscribe((boxes) => {
      this.archivedHeijunkaBoxes = boxes;
    });
    this.productService.getArchivedProducts().subscribe((products) => {
      this.archivedProducts = products;
      this.source.load(this.archivedProducts); // Load data into the source
    });
  }
  restoreHeijunkaBox(idBox: string, event: Event) {
    if (confirm('Are you sure you want to restore this Heijunka Box?')) {
      event.stopPropagation(); // Prevent triggering the card's click event
      this.heijunkaboxService.restoreHeijunkaBox(idBox).subscribe(() => {
        this.source.load(this.archivedProducts);
        this.archivedHeijunkaBoxes = this.archivedHeijunkaBoxes.filter(box => box.idBox !== idBox);
      });
    }
  }
  getFormattedTimestamp(box: HeijunkaBox): string {
    return this.datePipe.transform(box.timestamp, 'on EEE, yyyy MMM d \'at\' h:mm a') || '';
  }
  restoreProduct(idProduct: string) {
    if (confirm('Are you sure you want to restore this Heijunka Box?')) {
      if (!idProduct) {
        console.error('Product ID is undefined or null');
        return;
      }
      this.productService.restoreProduct(idProduct).subscribe(
        restoredProduct => {
          this.archivedProducts = this.archivedProducts.filter(product => product.idProduct !== idProduct);
          this.products.push(restoredProduct);
          this.source.load(this.archivedProducts);
        },
        error => {
          console.error('Failed to restore product:', error);
        });
    }
  }



}
