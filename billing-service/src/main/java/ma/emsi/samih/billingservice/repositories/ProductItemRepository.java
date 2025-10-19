package ma.emsi.samih.billingservice.repositories;

import ma.emsi.samih.billingservice.entities.Bill;
import ma.emsi.samih.billingservice.entities.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
}
