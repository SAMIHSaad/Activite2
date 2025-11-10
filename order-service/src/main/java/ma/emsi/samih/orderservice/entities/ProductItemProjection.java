package ma.emsi.samih.orderservice.entities;

import ma.emsi.samih.orderservice.model.Product;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "fullProductItem", types = ProductItem.class)
public interface ProductItemProjection {
    Long getId();
    String getProductId();
    double getPrice();
    int getQuantity();
    double getDiscount();

    @Value("#{@productRestClientBean.getProduct(target.productId)}")
    Product getProduct();
}
