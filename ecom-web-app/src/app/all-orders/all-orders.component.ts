import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: any[] = [];
  customers: any[] = [];
  products: any[] = []; // New property for products
  selectedOrder: any = null;
  orderForm: any = { createdAt: null, status: null, customerId: null, orderItems: [] }; // Added orderItems
  orderStatuses: string[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  // For adding new order items
  newOrderItem: any = { productId: null, quantity: null };

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadCustomers();
    this.loadProducts(); // Load products on init
  }

  loadOrders(): void {
    this.apiService.getOrders().subscribe({
      next: (data: any) => { this.orders = data._embedded.orders; },
      error: (err) => { console.log(err) }
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
    this.apiService.createOrder(this.orderForm).subscribe(
      () => {
        this.loadOrders();
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
          this.loadOrders();
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
        this.loadOrders();
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
    this.orderForm = { createdAt: null, status: null, customerId: null, orderItems: [] };
    this.newOrderItem = { productId: null, quantity: null };
  }

  getOrderDetails(o: any) {
    this.router.navigateByUrl("/orders-details/" + o.id);
  }
}
