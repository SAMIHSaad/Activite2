package ma.emsi.samih.orderservice.model;

import ma.emsi.samih.orderservice.entities.Order;
import ma.emsi.samih.orderservice.feign.CustomerRestClient;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;
import org.springframework.hateoas.EntityModel;

@Component
public class OrderRepresentationModelProcessor implements RepresentationModelProcessor<EntityModel<Order>> {

    private final CustomerRestClient customerRestClient;

    public OrderRepresentationModelProcessor(CustomerRestClient customerRestClient) {
        this.customerRestClient = customerRestClient;
    }

    @Override
    public EntityModel<Order> process(EntityModel<Order> model) {
        Order order = model.getContent();
        if (order != null) {
            order.setCustomer(customerRestClient.findCustomerById(order.getCustomerId()));
        }
        return model;
    }
}
