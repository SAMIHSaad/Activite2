package ma.emsi.samih.orderservice.entities;

import ma.emsi.samih.orderservice.enums.OrderStatus;
import ma.emsi.samih.orderservice.model.Customer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;
import java.util.List;

@Projection(name = "fullOrder", types = Order.class)
public interface OrderProjectionFull {
    Long getId();
    Date getCreatedAt();
    OrderStatus getStatus();
    Long getCustomerId();

    @Value("#{@customerRestClientBean.getCustomer(target.customerId)}")
    Customer getCustomer();

    List<ProductItem> getProductItems();
}
