package ma.emsi.samih.orderservice.feign;

import ma.emsi.samih.orderservice.model.Customer;
import org.springframework.stereotype.Component;

@Component("customerRestClientBean")
public class CustomerRestClientBean {
    private final CustomerRestClient customerRestClient;

    public CustomerRestClientBean(CustomerRestClient customerRestClient) {
        this.customerRestClient = customerRestClient;
    }

    public Customer getCustomer(Long customerId) {
        return customerRestClient.findCustomerById(customerId);
    }
}
