import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service'; // Adjust the import path as needed

@Component({
  selector: 'ngx-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  pieChartData: any[] = [];
  barChartData: any[] = [];
  advancedPieChartData: any[] = [];
  advancedPieChartData2: any[] = [];
  totalWeeklyDemand: number = 0;
  ProductstotalQuantity: number = 0;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProductData();
  }

  loadProductData() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        const filteredProducts = products.filter((product) => !product.archived);
        this.preparePieChartData(filteredProducts);
        this.prepareBarChartData(filteredProducts);
        this.prepareAdvancedPieData(filteredProducts);
        this.prepareAdvancedPieData2(filteredProducts);
        this.calculateTotalQuantity(filteredProducts);
        this.calculateTotalWeeklyDemand(filteredProducts);

      },
      error: (error) => {
        console.error('Error loading products', error);
      },
    });
  }

  preparePieChartData(products: any[]) {
    const categoryCounts = products.reduce((acc, product) => {
      const category = product.productCategory;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {});

    this.pieChartData = Object.keys(categoryCounts).map((key) => ({
      name: key,
      value: categoryCounts[key],
    }));
  }
  prepareBarChartData(products: any[]) {
    const categoryTotals = products.reduce((acc, product) => {
      if (!acc[product.productCategory]) {
        acc[product.productCategory] = 0;
      }
      acc[product.productCategory] += product.totalquantity || 0;
      return acc;
    }, {});

    this.barChartData = Object.keys(categoryTotals).map((category) => ({
      name: category,
      value: categoryTotals[category],
    }));
  }
  calculateTotalWeeklyDemand(products: any[]) {
    this.totalWeeklyDemand = products.reduce((acc, product) => acc + (product.weeklyDemand || 0), 0);
  }
  calculateTotalQuantity(products: any[]) {
    this.ProductstotalQuantity = products.reduce((acc, product) => acc + (product.totalquantity || 0), 0);
  }
  prepareAdvancedPieData(products: any[]) {
    const demandTotals = products.reduce((acc, product) => {
      const category = product.productCategory;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += product.weeklyDemand || 0;
      return acc;
    }, {});

    this.advancedPieChartData = Object.keys(demandTotals).map((category) => ({
      name: category,
      value: demandTotals[category],
    }));
  }
  prepareAdvancedPieData2(products: any[]) {
    const demandTotals = products.reduce((acc, product) => {
      const category = product.productCategory;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += product.totalquantity || 0;
      return acc;
    }, {});

    this.advancedPieChartData2 = Object.keys(demandTotals).map((category) => ({
      name: category,
      value: demandTotals[category],
    }));
  }
}
