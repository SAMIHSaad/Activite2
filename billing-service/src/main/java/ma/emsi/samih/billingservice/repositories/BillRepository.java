package ma.emsi.samih.billingservice.repositories;

import ma.emsi.samih.billingservice.entities.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
}
