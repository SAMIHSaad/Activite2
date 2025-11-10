import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf,DatePipe,NgFor ,DecimalPipe} from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order-details',
  imports: [NgIf,DatePipe,NgFor,DecimalPipe],  
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any;
  orderId!: number;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private apiService: ApiService) { 
    this.orderId = this.route.snapshot.params['orderId'];
  }  

  ngOnInit(): void {
    this.http.get(`${this.apiService.getApiUrl()}/order-service/api/orders/${this.orderId}?projection=fullOrder`).subscribe({
      next: (data: any) => { 
        this.orderDetails = data;
        this.orderDetails.total = 0;
        let productsFetchedCount = 0;
        this.orderDetails.productItems.forEach((pi: any) => {
          this.http.get(`${this.apiService.getApiUrl()}/inventory-service/api/products/${pi.productId}`).subscribe({
            next: (productData: any) => {
              console.log(`Fetched product for ID ${pi.productId}:`, productData);
              pi.product = productData;
              this.orderDetails.total += pi.amount;
              productsFetchedCount++;
              // If all products are fetched, then the total is complete
              if (productsFetchedCount === this.orderDetails.productItems.length) {
                // Any further actions that depend on the total can be placed here
              }
            },
            error: (err) => {
              console.error(`Error fetching product for ID ${pi.productId}:`, err);
              productsFetchedCount++;
              if (productsFetchedCount === this.orderDetails.productItems.length) {
                // Handle cases where some product fetches failed but total still needs to be finalized
              }
            }
          });
        });
      },
      error: (err) => { console.log(err) }
    });
  }

  getOrdersDetails(order: any) {
    this.router.navigateByUrl("/order-details/" + order.id);  
  }
}
