import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products : any[] = [];
  selectedProduct: any = null;
  productForm: any = { name: null, price: null, quantity: null };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next:(data: any)=>{this.products=data._embedded.products;},
      error:(err)=>{console.log(err)}
    });
  }

  selectProduct(product: any): void {
    this.selectedProduct = { ...product };
    this.productForm = { ...product };
  }

  createProduct(): void {
    this.apiService.createProduct(this.productForm).subscribe(
      () => {
        this.loadProducts();
        this.resetForm();
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.apiService.updateProduct(this.selectedProduct.id, this.productForm).subscribe(
        () => {
          this.loadProducts();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  deleteProduct(id: number): void {
    this.apiService.deleteProduct(id).subscribe(
      () => {
        this.loadProducts();
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  resetForm(): void {
    this.selectedProduct = null;
    this.productForm = { name: null, price: null, quantity: null };
  }
}
