package ma.emsi.bankaccountservice.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.emsi.bankaccountservice.dto.BankAccountRequestDTO;
import ma.emsi.bankaccountservice.dto.BankAccountResponseDTO;
import ma.emsi.bankaccountservice.entities.BankAccount;
import ma.emsi.bankaccountservice.entities.Customer;
import ma.emsi.bankaccountservice.repositories.IBankAccount;
import ma.emsi.bankaccountservice.repositories.ICustomer;
import ma.emsi.bankaccountservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class BankAccountGraphQLController {
    @Autowired
    private IBankAccount bankAccountRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private ICustomer customerRepo;

    @QueryMapping
    public List<BankAccount> accountsList(){
        return bankAccountRepo.findAll();
    }
    @QueryMapping
    public BankAccount bankAccountById(@Argument String id){
        return bankAccountRepo.findById(id)
                .orElseThrow(()-> new RuntimeException(String.format("Account %s not found",id)));
    }
    @MutationMapping
    public BankAccountResponseDTO addAccount(@Argument BankAccountRequestDTO bankAccount){
        return accountService.addAccount(bankAccount);
    }
    @MutationMapping
    public BankAccountResponseDTO updateAccount(@Argument String id, @Argument BankAccountRequestDTO bankAccount){
        return accountService.updateAccount(id,bankAccount);
    }
    @MutationMapping
    public void deleteAccount(@Argument String id){
        bankAccountRepo.deleteById(id);
    }
    @QueryMapping
    public List<Customer> customers(){
        return customerRepo.findAll();
    }

}
/*record BankAccountDTO(Double balance, String type, String currency){
}*/
