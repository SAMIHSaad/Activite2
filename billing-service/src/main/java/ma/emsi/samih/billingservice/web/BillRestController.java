package ma.emsi.samih.billingservice.web;

import ma.emsi.samih.billingservice.entities.Bill;
import ma.emsi.samih.billingservice.feign.CustomerRestClient;
import ma.emsi.samih.billingservice.feign.ProductRestClient;
import ma.emsi.samih.billingservice.repositories.BillRepository;
import ma.emsi.samih.billingservice.repositories.ProductItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BillRestController {
    @Autowired
    private CustomerRestClient customerRestClient;
    @Autowired
    private ProductRestClient productRestClient;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private ProductItemRepository productItemRepository;


    @GetMapping(path = "/bills/{id}")
    public Bill getBill(@PathVariable Long id){
        Bill bill=billRepository.findById(id).get();
        bill.setCustomer(customerRestClient.findCustomerById(bill.getCustomerId()));
        bill.getProductItems().forEach(productItem->
                productItem.setProduct(productRestClient.findProductById(productItem.getProductId())));
        return bill;
    }
}
