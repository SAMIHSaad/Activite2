package ma.emsi.samih.orderservice.feign;

import ma.emsi.samih.orderservice.model.Product;
import org.springframework.stereotype.Component;

@Component("productRestClientBean")
public class ProductRestClientBean {
    private final ProductRestClient productRestClient;

    public ProductRestClientBean(ProductRestClient productRestClient) {
        this.productRestClient = productRestClient;
    }

    public Product getProduct(String productId) {
        return productRestClient.findProductById(productId);
    }
}
