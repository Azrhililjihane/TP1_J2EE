package ma.emsi.bankaccountservice;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import ma.emsi.bankaccountservice.entities.BankAccount;
import ma.emsi.bankaccountservice.entities.Customer;
import ma.emsi.bankaccountservice.enums.AccountType;
import ma.emsi.bankaccountservice.repositories.IBankAccount;
import ma.emsi.bankaccountservice.repositories.ICustomer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Stream;


@SpringBootApplication
public class BankAccountServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankAccountServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(IBankAccount bankAccountRepo, ICustomer customerRepo){
        return args -> {
            Stream.of("Mohamed","Yassine","Imane").forEach(c->{
                Customer customer=Customer.builder()
                        .name(c)
                        .build();
                customerRepo.save(customer);
            });
            // For each customer we will create an account
            customerRepo.findAll().forEach(customer -> {
                for (int i=0;i<13;i++){
                    BankAccount bankAccount=BankAccount.builder()
                            .id(UUID.randomUUID().toString())
                            .type(Math.random()>0.5? AccountType.CURRENT_ACCOUNT:AccountType.SAVING_ACCOUNT)
                            .balance(10000+Math.random()*90000)
                            .createdAt(new Date())
                            .currency("MAD")
                            .customer(customer)
                            .build();
                    bankAccountRepo.save(bankAccount);
                }
            });

        };
    }
}
