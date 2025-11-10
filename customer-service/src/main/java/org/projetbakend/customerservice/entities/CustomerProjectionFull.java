package org.projetbakend.customerservice.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "fullCustomer", types = Customer.class)
public interface CustomerProjectionFull {
    Long getId();
    String getName();
    String getEmail();
}
