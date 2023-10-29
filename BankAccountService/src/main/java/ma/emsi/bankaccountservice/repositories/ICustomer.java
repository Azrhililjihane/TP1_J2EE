package ma.emsi.bankaccountservice.repositories;

import ma.emsi.bankaccountservice.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomer extends JpaRepository<Customer,Long> {
}
