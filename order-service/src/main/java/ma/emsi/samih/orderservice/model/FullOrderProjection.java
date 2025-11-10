package ma.emsi.samih.orderservice.model;

import ma.emsi.samih.orderservice.entities.Order;
import ma.emsi.samih.orderservice.entities.ProductItem;
import ma.emsi.samih.orderservice.enums.OrderStatus;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.List;

@Projection(name = "fullOrder", types = Order.class)
public interface FullOrderProjection {
    Long getId();
    Date getCreatedAt();
    OrderStatus getStatus();
    Long getCustomerId();
    Customer getCustomer();
    List<ProductItem> getProductItems();
}
