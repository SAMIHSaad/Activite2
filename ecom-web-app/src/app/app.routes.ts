import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { FacturesComponent } from './factures/factures.component';

export const routes: Routes = [
    {
        path:"products",component:ProductsComponent
    },
    {
        path:"customers",component:CustomersComponent
    },
    {
        path:"orders",component:AllOrdersComponent
    },
    {
        path:"orders/:customerId",component:OrdersComponent
    },
    {
        path:"orders-details/:orderId",component:OrderDetailsComponent
    },
    {
        path:"factures",component:FacturesComponent
    }
];
