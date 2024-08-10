import {Component, ViewChild, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import {NbStepperComponent, NbTabComponent, NbTabsetComponent} from '@nebular/theme';
import { Product } from '../products/product';
import { ProductService } from '../products/product.service';
import {ProductionPlan} from '../Planning/productionplan';
import {ProductionPlanService} from '../Planning/production-plan.service';
import {Orders} from './Orders';
import {OrderService} from './order.service';
import {HeijunkaboxService} from '../LatestHeijunkaBox/heijunkabox.service';
import {HeijunkaBox} from '../LatestHeijunkaBox/HeijunkaBox';
import {Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'ngx-algorithm',
  templateUrl: './algorithm.component.html',
  styleUrls: ['./algorithm.component.scss'],
})
export class AlgorithmComponent implements OnInit {
  @ViewChild('stepper', { static: false }) stepper: NbStepperComponent | undefined;
  @ViewChild(NbTabsetComponent) tabset: NbTabsetComponent;


  schedule: { Day: string, Product: string, ProductionQuantity: number, TimeSlot: string }[] = [];

  selectedRows: any[] = [];
  selectedProduct: Product | null = null;
  selectedProductId: string | null = null;  workDaysNumber: number = 0;
  workHoursPerDay: number = 0;
  availableTime: number = 0;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  productOrdersMap: Map<number, FormArray> = new Map();
  selectionMessage: string = '';
  isCalculated: boolean = false;
  showTaktTime: boolean = false;
  totalDemand: number = 0;
  DailyProductionGoal: number | null = null;
  products: Product[] = []; // Array to store the products fetched from the backend
  productionPlan: ProductionPlan | null = null; // To store the production plan
  title: string = '';
  notes: string = '';
  ordersAddedSuccessfully: boolean = false;
  dailyProductionGoals: number[] = [];
  workDays = Array.from({length: 7}, (_, i) => i + 1);
  workHours = Array.from({length: 12}, (_, i) => i + 1);
  showHeijunka = true;
  showCards = false;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    selectMode: 'multi',
    columns: {
      idProduct: {
        title: 'ID',
        type: 'string',
        editable: false,
      },
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
      totalquantity: {
        title: 'Total Quantity',
        type: 'number',
        editable: false,
      },
    },
  };
  secondSettings = {
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
      weeklyDemand: {
        title: 'Weekly Demand',
        type: 'number',
        editable: false,
      },
      takttime: {
        title: 'Takt Time',
        type: 'number',
        valuePrepareFunction: (value) => `${value.toFixed(2)} hours`,
        editable: false,
      },
      DailyProductionGoal: {
        title: 'Daily Production Goal',
        type: 'number',
        valuePrepareFunction: (value) => this.decimalPipe.transform(value, '1.0-0'),
        editable: false,
      }}};
  secondSource: LocalDataSource = new LocalDataSource();

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private router: Router,
  private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private heijunkaService: HeijunkaboxService,
    private decimalPipe: DecimalPipe,
    private productionPlanService: ProductionPlanService) {
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondForm = this.fb.group({
      secondCtrl: [0, Validators.required], // Ensure default value is a number
    });
    this.thirdForm = this.fb.group({
      selectedProduct: ['', Validators.required],
      orders: this.fb.array([]),
      takttime: [{ value: null, disabled: true }],
      totalQuantity: [{ value: 0, disabled: true }],
    });
    this.fourthForm = this.fb.group({
      selectedProduct: ['', Validators.required],
      title: ['', Validators.required],
      notes: [''],
      totalquantity: [{ value: null, disabled: true }],
      DailyProductionGoal: [{ value: null, disabled: true }],
    });
    this.workDaysNumber = +this.workDaysNumber; // Convert to number
    this.workHoursPerDay = +this.workHoursPerDay; // Convert to number
    const newPlan: ProductionPlan = {
      idPlan: new Date().getTime().toString(),
      WorkDays: parseFloat(this.workDaysNumber.toString()),
      WorkHours: parseFloat(this.workHoursPerDay.toString()),
      AvailableTime: parseFloat(this.availableTime.toString()),
    };

    const mappedData = this.products.map((product, index) => ({
      productName: product.productName,
      weeklyDemand: product.weeklyDemand,
      takttime: product.takttime,
      DailyProductionGoal: this.dailyProductionGoals[index],
    }));
    this.secondSource.load(mappedData);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.formAdd();

  }
  toggleComponent() {
    this.showHeijunka = !this.showHeijunka;
    this.showCards = !this.showCards;
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.source.load(this.products);

        // Map over products here
        const mappedData = this.products.map((product, index) => ({
          productName: product.productName,
          weeklyDemand: product.weeklyDemand,
          takttime: product.takttime,
          DailyProductionGoal: this.dailyProductionGoals[index],
        }));
        console.log('Mapped data:', mappedData);
        this.secondSource.load(mappedData);
      },
      (error) => {
        console.error('Error fetching products', error);
      });
  }
  onFirstSubmit() {
    if (this.selectedRows.length === 0) {
      this.selectionMessage = 'Please select at least one product.';
      return;
    } else {
      this.selectionMessage = '';
    }
    if (this.stepper) {
      this.stepper.next();
    }
  }

  onSecondSubmit() {
    this.selectionMessage = '';
    if (this.isCalculated) {
      if (this.stepper) {
        this.stepper.next();
      }
    } else {
      this.selectionMessage = 'Please calculate available time before proceeding.';
    }
  }

  onThirdSubmit() {
    if (this.thirdForm.valid) {
      // Perform actions for the third step form submission
    }
  }

  onFourthSubmit(): void {
    const title = this.fourthForm.get('title').value;
    const notes = this.fourthForm.get('notes').value;

    console.log('Title:', title);
    console.log('Notes:', notes);
this.title = this.fourthForm.get('title').value;
    this.notes = this.fourthForm.get('notes').value;
    // Call your generateSchedule function here if needed
  }


  calculateAvailableTime() {
    const workDays = this.workDaysNumber;
    const workHours = this.workHoursPerDay;

    if (workDays && workHours) {
      this.availableTime = this.workDaysNumber * this.workHoursPerDay;
      this.isCalculated = true;
      // console.log('Calculated Available Time:', this.availableTime);
      // console.log('Work Days Number:', workDays);
      // console.log('Work Hours Per Day:', workHours);
      this.createProductionPlan();
    } else {
      this.availableTime = null;
      this.isCalculated = false;
    }

  }


  createProductionPlan() {
    const newPlan: ProductionPlan = {
      idPlan: new Date().getTime().toString(),
      WorkDays: this.workDaysNumber,
      WorkHours: this.workHoursPerDay,
      AvailableTime: this.availableTime,
    };

    this.productionPlanService.createProductionPlan(newPlan).subscribe(
      createdPlan => {
        this.productionPlan = createdPlan;
      },
      error => {
        console.error('Error creating production plan', error);
      },
    );
  }

  onRowSelect(event: any) {
    this.selectedRows = event.selected;
  }

  getOrdersForSelectedProduct(): FormArray {
    if (!this.selectedProduct) {
      return this.fb.array([]);
    }
    const productId = Number(this.selectedProduct.idProduct);
    if (!this.productOrdersMap.has(productId)) {
      this.productOrdersMap.set(productId, this.fb.array([]));
    }
    return this.productOrdersMap.get(productId) as FormArray;
  }


  addOrders() {
    if (this.selectedProduct) {
      const productId = this.selectedProduct.idProduct;
      const orders = this.getOrdersForSelectedProduct();

      // Collect all orders to be sent in one request
      const ordersToSave = orders.controls.map((orderGroup) => ({
        orderName: orderGroup.get('orderName')?.value,
        quantity: orderGroup.get('quantity')?.value,
      }));

      // Fetch existing orders to avoid duplication
      this.orderService.getOrdersByProductId(productId).subscribe(
        (existingOrders: Orders[]) => {
          const existingOrderSet = new Set(existingOrders.map(order => `${order.orderName}-${order.quantity}`));

          // Filter new orders
          const newOrders = ordersToSave.filter(order => {
            return order.orderName && order.quantity && !existingOrderSet.has(`${order.orderName}-${order.quantity}`);
          });

          // Send new orders to backend
          if (newOrders.length > 0) {
            this.orderService.createOrders(productId, newOrders).subscribe(
              (savedOrders: Orders[]) => {
                console.log('Orders saved:', savedOrders);

                // Update the orders property of the selectedProduct
                this.selectedProduct.orders = savedOrders;

                // Clear existing orders in the form array
                const orderFormArray = this.getOrdersForSelectedProduct();
                const lastIndex = orderFormArray.length - 1;
                orderFormArray.removeAt(lastIndex); // Remove the last order

                // Add saved orders to the form array
                savedOrders.forEach(savedOrder => {
                  const formGroup = this.fb.group({
                    orderName: [savedOrder.orderName, Validators.required],
                    quantity: [savedOrder.quantity, [Validators.required, Validators.min(1)]],
                    orderId: [savedOrder.orderId], // Include the generated orderId
                  });
                  orderFormArray.push(formGroup);
                });
this.calculateTaktTime();
              },
              (error) => {
                console.error('Error saving orders', error);
              },
            );
          } else {
            console.log('No new orders to save.');
          }
        },
        (error) => {
          console.error('Error fetching existing orders', error);
        },
      );
    } else {
      console.error('No product selected.');
    }
  }

  calculateTaktTime() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.source.load(this.products);
        this.calculateTotalDemand();
        this.calculateDailyProductionGoal();

        // Create a new array of objects with updated attributes
        const productsWithTaktTime = this.products.map((product) => {
          console.log('product:', product);
          console.log('product.totalquantity:', product.totalquantity);
          console.log('availableTime:', this.availableTime);

          const takttime = product.totalquantity > 0 && this.availableTime > 0
            ? this.availableTime / product.totalquantity
            : null;
          console.log('takttime:', takttime);
          this.thirdForm.get('takttime')?.setValue(takttime);
          this.showTaktTime = true;

          return {
            productName: product.productName,
            weeklyDemand: product.weeklyDemand,
            takttime: takttime,
            DailyProductionGoal: this.dailyProductionGoals.find((goal, index) =>
              index === this.products.indexOf(product)),
            productCode: product.productCode,
            productCategory: product.productCategory,
            productDate: product.productDate,
            idProduct: product.idProduct,
            totalquantity: product.totalquantity,
          };
        });

        console.log('productsWithTaktTime:', productsWithTaktTime);
        this.products = productsWithTaktTime;

        // Update the second source with the new array of objects
        this.secondSource.load(productsWithTaktTime);
        this.productService.updateProducts(productsWithTaktTime).subscribe(
          (updatedProducts) => {
            console.log('Products updated:', updatedProducts);
          },
          (error) => {
            console.error('Error updating products', error);
          },
        );
      },
      (error) => {
        console.error('Error getting products', error);
      },
    );
  }

  removeOrder(index: number) {
    this.products = this.products.filter((product) => product.idProduct !== this.selectedProduct?.idProduct);
    const orders = this.getOrdersForSelectedProduct();
    const order = orders.at(index).value;
    const orderId = order.orderId;

    console.log('Removing order:', order); // Log order details
    console.log('Order ID:', orderId); // Log order ID

    if (!orderId) {
      // If orderId is null, simply remove the order from the form array
      orders.removeAt(index);
      this.thirdForm.setControl('orders', orders);
      return;
    }

    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        orders.removeAt(index);
        this.thirdForm.setControl('orders', orders);
        this.refreshDatabase(); // Call function to refresh database
      },
      (error) => {
        console.error('Error deleting order', error);
      });
this.calculateTaktTime();
  }

  refreshDatabase() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      console.log('Database refreshed:', products);
    });

  }



  onProductChange() {
    this.selectedProduct = this.thirdForm.get('selectedProduct')?.value;
    this.selectedProductId = this.selectedProduct?.idProduct || null;

    if (this.selectedProduct) {
      // Fetch and update orders for the newly selected product
      this.orderService.getOrdersByProductId(this.selectedProductId).subscribe(
        (orders: Orders[]) => {
          const orderFormArray = this.getOrdersForSelectedProduct();
          orderFormArray.clear(); // Clear existing orders

          // Populate form array with fetched orders
          orders.forEach(order => {
            orderFormArray.push(this.fb.group({
              orderName: [order.orderName, Validators.required],
              quantity: [order.quantity, [Validators.required, Validators.min(1)]],
              orderId: [order.orderId], // Ensure orderId is included
            }));
          });

          this.thirdForm.setControl('orders', orderFormArray);

          // Recalculate total demand after updating orders
          this.calculateTotalDemand();
        },
        (error) => {
          console.error('Error fetching orders', error);
        });
    } else {
      this.thirdForm.setControl('orders', this.fb.array([]));
      this.totalDemand = 0; // Reset total demand if no product is selected
    }
  }

  calculateDailyProductionGoal() {
    if (!this.productionPlan || !this.products) {
      console.error('Production plan or selected products are not defined.');
      return;
    }

    this.dailyProductionGoals = this.products.map(product => {
      const weeklyDemand = product.weeklyDemand;
      const DailyProductionGoal = weeklyDemand / this.productionPlan.WorkDays;
      const payload = {
        idProduct: product.idProduct,
        DailyProductionGoal: DailyProductionGoal,
      };
      this.productService.updateDailyProductionGoal(payload).subscribe(
        (response) => {
          console.log('Daily production goal updated successfully:', response);
        },
        (error) => {
          console.error('Error updating daily production goal:', error);
        },
      );
      product.DailyProductionGoal = DailyProductionGoal;

      return DailyProductionGoal;

    });
    const updatedProducts = this.products.map((product) => ({
      productName: product.productName,
      weeklyDemand: product.weeklyDemand,
      DailyProductionGoal: this.dailyProductionGoals.find((goal, index) => index === this.products.indexOf(product)),
    }));

    this.secondSource.load(updatedProducts);
  }

  calculateTotalDemand() {
    if (!this.selectedProduct) return;

    const orders = this.getOrdersForSelectedProduct();
    let totalDemand = 0;

    orders.controls.forEach((order) => {
      totalDemand += order.get('quantity')?.value || 0;
    });

    this.thirdForm.get('totalQuantity').setValue(totalDemand);
  }

  formAdd() {
    const orders = this.getOrdersForSelectedProduct();
    orders.push(
      this.fb.group({
        orderName: ['', Validators.required],
        quantity: [0, [Validators.required, Validators.min(1)]],
        orderId: [null],
      }));
    this.thirdForm.setControl('orders', orders);
  }









  generateSchedule() {
    console.log('Title:', this.title);
    console.log('Notes:', this.notes);
    if (!this.productionPlan || !this.selectedRows || this.selectedRows.length === 0) {
      console.error('Production plan or selected products are not defined.');
      return;
    }

    const workDays = this.productionPlan.WorkDays;
    const workHours = this.productionPlan.WorkHours;
    const timeSlots = Array.from({ length: workHours }, (_, i) => `${i + 8}:00-${i + 9}:00`);

    this.schedule = [];

    this.selectedRows.forEach((product, index) => {
      const DailyProductionGoal = this.dailyProductionGoals[index];
      const productionQuantityPerTimeSlot = Math.round(DailyProductionGoal / workHours);

      for (let day = 1; day <= workDays; day++) {
        let remainingQuantity = DailyProductionGoal;

        for (let i = 0; i < timeSlots.length; i++) {
          const timeSlot = timeSlots[i];

          if (remainingQuantity > 0) {
            const quantityToAssign = Math.round(Math.min(remainingQuantity, productionQuantityPerTimeSlot));

            this.schedule.push({
              Day: `Day ${day}`,
              Product: product.productName,
              ProductionQuantity: quantityToAssign,
              TimeSlot: timeSlot,
            });

            remainingQuantity -= quantityToAssign;
          }
        }
      }
    });

    const newHeijunkaBox: HeijunkaBox = {
      idBox: undefined,
      title: this.fourthForm.get('title').value,
      productionPlan: this.productionPlan,
      products: this.selectedRows,
      schedule: this.schedule,
      timestamp: new Date(),
      notes: this.fourthForm.get('notes').value,
    };

    this.heijunkaService.addHeijunkaBox(newHeijunkaBox)
      .subscribe({
        next: (addedBox) => {
          console.log('Heijunka Box added successfully:', addedBox);
          // Select the Production Planning tab
          const productionPlanningTab: NbTabComponent = this.tabset.tabs.find((tab) => tab.tabTitle === 'Production Planning');
          if (productionPlanningTab) {
            this.tabset.selectTab(productionPlanningTab);
          }
        },
        error: (err) => {
          console.error('Error adding Heijunka Box:', err);
        }});

  }
  }


