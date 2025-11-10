package ma.emsi.samih.orderservice.model;

import ma.emsi.samih.orderservice.entities.ProductItem;
import ma.emsi.samih.orderservice.feign.ProductRestClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;

@Component
public class ProductItemRepresentationModelProcessor implements RepresentationModelProcessor<EntityModel<ProductItem>> {

    private static final Logger log = LoggerFactory.getLogger(ProductItemRepresentationModelProcessor.class);

    private final ProductRestClient productRestClient;

    public ProductItemRepresentationModelProcessor(ProductRestClient productRestClient) {
        this.productRestClient = productRestClient;
    }

    @Override
    public EntityModel<ProductItem> process(EntityModel<ProductItem> model) {
        ProductItem productItem = model.getContent();
        if (productItem != null) {
            log.info("Processing ProductItem with ID: {}", productItem.getId());
            log.info("Fetching product for productId: {}", productItem.getProductId());
            Product product = productRestClient.findProductById(productItem.getProductId());
            if (product != null) {
                log.info("Product found: {}", product.getName());
                productItem.setProduct(product);
            } else {
                log.warn("Product not found for productId: {}", productItem.getProductId());
            }
        }
        return model;
    }
}
