import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-factures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './factures.component.html',
  styleUrl: './factures.component.css'
})
export class FacturesComponent implements OnInit {
  invoices: any[] = [];
  selectedInvoice: any = null;
  invoiceForm: any = { customerId: null, amount: null, date: null }; // Unified form object

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.apiService.getInvoices().subscribe(
      (data) => {
        this.invoices = data;
      },
      (error) => {
        console.error('Error loading invoices:', error);
      }
    );
  }

  selectInvoice(invoice: any): void {
    this.selectedInvoice = { ...invoice }; // Create a copy for editing
    this.invoiceForm = { ...invoice }; // Populate form with selected invoice data
  }

  createInvoice(): void {
    this.apiService.createInvoice(this.invoiceForm).subscribe(
      () => {
        this.loadInvoices();
        this.resetForm();
      },
      (error) => {
        console.error('Error creating invoice:', error);
      }
    );
  }

  updateInvoice(): void {
    if (this.selectedInvoice) {
      this.apiService.updateInvoice(this.selectedInvoice.id, this.invoiceForm).subscribe(
        () => {
          this.loadInvoices();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating invoice:', error);
        }
      );
    }
  }

  deleteInvoice(id: number): void {
    this.apiService.deleteInvoice(id).subscribe(
      () => {
        this.loadInvoices();
      },
      (error) => {
        console.error('Error deleting invoice:', error);
      }
    );
  }

  resetForm(): void {
    this.selectedInvoice = null;
    this.invoiceForm = { customerId: null, amount: null, date: null }; // Reset form to initial state
  }
}
