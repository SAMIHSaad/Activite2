package org.projetbakend.inventoryservice.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "fullProduct", types = Product.class)
public interface ProductProjectionFull {
    String getId();
    String getName();
    double getPrice();
    int getQuantity();
}
