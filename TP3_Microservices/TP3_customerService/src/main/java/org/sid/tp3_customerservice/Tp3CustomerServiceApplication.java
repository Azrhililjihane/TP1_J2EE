package org.sid.tp3_customerservice;

import org.apache.hc.core5.reactor.Command;
import org.sid.tp3_customerservice.entities.Customer;
import org.sid.tp3_customerservice.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class Tp3CustomerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(Tp3CustomerServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(CustomerRepository customerRepository, RepositoryRestConfiguration restConfiguration){
        restConfiguration.exposeIdsFor(Customer.class);
        return args -> {
            customerRepository.save(new Customer(null,"Jihane","jihane@gmail.com"));
            customerRepository.save(new Customer(null,"Rayan","rayan@gmail.com"));
            customerRepository.save(new Customer(null,"Paul","paul@gmail.com"));
            customerRepository.save(new Customer(null,"marwa","marwa@gmail.com"));
            customerRepository.findAll().forEach(c->{
                System.out.println(c.toString());
            });
        };
    }
}
