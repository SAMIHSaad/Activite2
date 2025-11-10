import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports:[ CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  customers:any[] = [];
  selectedCustomer: any = null;
  customerForm: any = { name: null, email: null };

  constructor (private router: Router, private apiService: ApiService) { }  

  ngOnInit(): void {
    this.loadCustomers();
  }
  
  loadCustomers(): void {
    this.apiService.getCustomers().subscribe({
      next:(data: any)=>{this.customers=data._embedded.customers;},
      error:(err)=>{console.log(err)}
    });
  }

  selectCustomer(customer: any): void {
    this.selectedCustomer = { ...customer };
    this.customerForm = { ...customer };
  }

  createCustomer(): void {
    this.apiService.createCustomer(this.customerForm).subscribe(
      () => {
        this.loadCustomers();
        this.resetForm();
      },
      (error) => {
        console.error('Error creating customer:', error);
      }
    );
  }

  updateCustomer(): void {
    if (this.selectedCustomer) {
      this.apiService.updateCustomer(this.selectedCustomer.id, this.customerForm).subscribe(
        () => {
          this.loadCustomers();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating customer:', error);
        }
      );
    }
  }

  deleteCustomer(id: number): void {
    this.apiService.deleteCustomer(id).subscribe(
      () => {
        this.loadCustomers();
      },
      (error) => {
        console.error('Error deleting customer:', error);
      }
    );
  }

  resetForm(): void {
    this.selectedCustomer = null;
    this.customerForm = { name: null, email: null };
  }

  getOrders(c:any){
    this.router.navigateByUrl("/orders/"+c.id);  
  }
}