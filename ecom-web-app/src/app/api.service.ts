import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getApiUrl(): string {
    return this.apiUrl;
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${path}`);
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${path}`, body);
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${path}`);
  }

  // Invoice specific CRUD operations
  getInvoices(): Observable<any[]> {
    return this.get<any[]>('billing-service/api/invoices');
  }

  getInvoiceById(id: number): Observable<any> {
    return this.get<any>(`billing-service/api/invoices/${id}`);
  }

  createInvoice(invoice: any): Observable<any> {
    return this.post<any>('billing-service/api/invoices', invoice);
  }

  updateInvoice(id: number, invoice: any): Observable<any> {
    return this.put<any>(`billing-service/api/invoices/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.delete<any>(`billing-service/api/invoices/${id}`);
  }

  // Product specific CRUD operations
  getProducts(): Observable<any[]> {
    return this.get<any[]>('inventory-service/api/products?projection=fullProduct');
  }

  getProductById(id: number): Observable<any> {
    return this.get<any>(`inventory-service/api/products/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.post<any>('inventory-service/api/products', product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.put<any>(`inventory-service/api/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.delete<any>(`inventory-service/api/products/${id}`);
  }

  // Customer specific CRUD operations
  getCustomers(): Observable<any[]> {
    return this.get<any[]>('customer-service/api/customers?projection=fullCustomer');
  }

  getCustomerById(id: number): Observable<any> {
    return this.get<any>(`customer-service/api/customers/${id}`);
  }

  createCustomer(customer: any): Observable<any> {
    return this.post<any>('customer-service/api/customers', customer);
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    return this.put<any>(`customer-service/api/customers/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.delete<any>(`customer-service/api/customers/${id}`);
  }

  // Order specific CRUD operations
  getOrders(): Observable<any[]> {
    return this.get<any[]>('order-service/api/orders');
  }

  getOrdersByCustomerId(customerId: number): Observable<any[]> {
    return this.get<any[]>(`order-service/api/orders/search/byCustomerId?customerId=${customerId}&projection=fullOrder`);
  }

  getOrderById(id: number): Observable<any> {
    return this.get<any>(`order-service/api/orders/${id}`);
  }

  createOrder(order: any): Observable<any> {
    return this.post<any>('order-service/api/orders', order);
  }

  updateOrder(id: number, order: any): Observable<any> {
    return this.put<any>(`order-service/api/orders/${id}`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.delete<any>(`order-service/api/orders/${id}`);
  }
}
