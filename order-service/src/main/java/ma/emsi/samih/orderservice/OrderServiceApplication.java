package ma.emsi.samih.orderservice;

import ma.emsi.samih.orderservice.entities.Order;
import ma.emsi.samih.orderservice.entities.ProductItem;
import ma.emsi.samih.orderservice.enums.OrderStatus;
import ma.emsi.samih.orderservice.feign.CustomerRestClient;
import ma.emsi.samih.orderservice.feign.ProductRestClient;
import ma.emsi.samih.orderservice.model.Customer;
import ma.emsi.samih.orderservice.model.Product;
import ma.emsi.samih.orderservice.repositories.OrderRepository;
import ma.emsi.samih.orderservice.repositories.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class OrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }

    // @Bean
    // CommandLineRunner commandLineRunner(OrderRepository orderRepository,
    //                                     ProductItemRepository productItemRepository,
    //                                     ProductRestClient productRestClient,
    //                                     CustomerRestClient customerRestClient) {
    //
    //     return args -> {
    //         try {
    //             Collection<Customer> customers = customerRestClient.getAllCustomers().getContent();
    //             Collection<Product> products = productRestClient.getAllProdcuts().getContent();
    //             OrderStatus[] statuses = OrderStatus.values();
    //
    //             customers.forEach(customer -> {
    //                 Order order = Order.builder()
    //                         .createdAt(new Date())
    //                         .customerId(customer.getId())
    //                         .status(statuses[new Random().nextInt(statuses.length)])
    //                         .build();
    //                 orderRepository.save(order);
    //                 products.forEach(product -> {
    //                     if (product.getId() == null || product.getId().isEmpty()) {
    //                         System.err.println("Skipping product with null or empty ID: " + product.getName());
    //                         return; // Skip this product if ID is null or empty
    //                     }
    //                     System.out.println("Seeding ProductItem for product ID: " + product.getId());
    //                     ProductItem productItem = ProductItem.builder()
    //                             .order(order)
    //                             .productId(product.getId())
    //                             .quantity(1 + new Random().nextInt(10))
    //                             .price(product.getPrice())
    //                             .build();
    //                     productItemRepository.save(productItem);
    //                 });
    //             });
    //         } catch (Exception e) {
    //             System.err.println("Failed to seed data: " + e.getMessage());
    //             // Continue with application startup
    //         }
    //     };
    // }

}
