package ma.emsi.samih.orderservice.entities;

import jakarta.persistence.*;
import lombok.*;
import ma.emsi.samih.orderservice.model.Customer;
import ma.emsi.samih.orderservice.enums.OrderStatus;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Long customerId;
    @Transient
    private Customer customer;
    @OneToMany(mappedBy = "order")
    private List<ProductItem> productItems= new ArrayList<>();

    public double getTotal(){
        double somme=0;
        for (ProductItem productItem : productItems) {
            somme+=productItem.getAmount();
        }

        return somme;
    }
}
