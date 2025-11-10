import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import {DatePipe} from '@angular/common';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  
  orders:any[] = [];
  customers: any[] = [];
  products: any[] = []; // New property for products
  customerId!:number;
  selectedOrder: any = null;
  orderForm: any = { createdAt: null, status: null, customerId: null, orderItems: [] }; // Added orderItems
  orderStatuses: string[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  // For adding new order items
  newOrderItem: any = { productId: null, quantity: null };

  constructor (private router: Router, private route: ActivatedRoute, private apiService: ApiService) { 
    this.customerId=this.route.snapshot.params['customerId'];
  }  

  ngOnInit(): void {
    this.loadOrdersByCustomerId();
    this.loadCustomers();
    this.loadProducts(); // Load products on init
  }

  loadOrdersByCustomerId(): void {
    this.apiService.getOrdersByCustomerId(this.customerId).subscribe({
      next:(data: any)=>{this.orders=data._embedded.orders;},
      error:(err)=>{console.log(err)}
    });
  }

  loadCustomers(): void {
    this.apiService.getCustomers().subscribe({
      next: (data: any) => { this.customers = data._embedded.customers; },
      error: (err) => { console.log('Error loading customers:', err) }
    });
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (data: any) => { this.products = data._embedded.products; },
      error: (err) => { console.log('Error loading products:', err) }
    });
  }

  selectOrder(order: any): void {
    this.selectedOrder = { ...order };
    // Assuming order.orderItems exists and is an array
    this.orderForm = { ...order, orderItems: order.orderItems ? [...order.orderItems] : [] };
  }

  createOrder(): void {
    this.orderForm.customerId = this.customerId; // Assign current customerId to new order
    this.apiService.createOrder(this.orderForm).subscribe(
      () => {
        this.loadOrdersByCustomerId();
        this.resetForm();
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
  }

  updateOrder(): void {
    if (this.selectedOrder) {
      this.apiService.updateOrder(this.selectedOrder.id, this.orderForm).subscribe(
        () => {
          this.loadOrdersByCustomerId();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating order:', error);
        }
      );
    }
  }

  deleteOrder(id: number): void {
    this.apiService.deleteOrder(id).subscribe(
      () => {
        this.loadOrdersByCustomerId();
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );
  }

  addOrderItem(): void {
    if (this.newOrderItem.productId && this.newOrderItem.quantity > 0) {
      const product = this.products.find(p => p.id === this.newOrderItem.productId);
      if (product) {
        this.orderForm.orderItems.push({
          productId: this.newOrderItem.productId,
          productName: product.name, // For display purposes
          quantity: this.newOrderItem.quantity
        });
        this.newOrderItem = { productId: null, quantity: null }; // Reset for next item
      }
    }
  }

  removeOrderItem(index: number): void {
    this.orderForm.orderItems.splice(index, 1);
  }

  resetForm(): void {
    this.selectedOrder = null;
    this.orderForm = { createdAt: null, status: null, customerId: this.customerId, orderItems: [] }; // Reset form with current customerId
    this.newOrderItem = { productId: null, quantity: null };
  }

  getOrdersDetails(order:any){
    this.router.navigateByUrl("/orders-details/"+order.id);  
  }
}
