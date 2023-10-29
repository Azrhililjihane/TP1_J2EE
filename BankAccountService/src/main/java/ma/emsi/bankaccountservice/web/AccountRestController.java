package ma.emsi.bankaccountservice.web;

import ma.emsi.bankaccountservice.dto.BankAccountRequestDTO;
import ma.emsi.bankaccountservice.dto.BankAccountResponseDTO;
import ma.emsi.bankaccountservice.entities.BankAccount;
import ma.emsi.bankaccountservice.mappers.AccountMapper;
import ma.emsi.bankaccountservice.repositories.IBankAccount;
import ma.emsi.bankaccountservice.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

/***    Creating a Rest API
 *
 * if you are using data-rest (annotation: @RepositoryRestResource) then there is no need
 * to create all of this below because it's already generated automatically
 * ***/

@RestController
@RequestMapping("/api")
public class AccountRestController {
    @Autowired
    private IBankAccount bankAccountRepo;
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountMapper accountMapper;

    @GetMapping("/bankAccounts")
    public List<BankAccount> bankAccounts(){
        return bankAccountRepo.findAll();
    }
    @GetMapping("/bankAccounts/{id}")
    public BankAccount bankAccount(@PathVariable String id){
        return bankAccountRepo.findById(id)
                .orElseThrow(()->new RuntimeException(String.format("Account %s not found",id)));
    }
    @PostMapping("/bankAccounts")
    public BankAccountResponseDTO save(@RequestBody BankAccountRequestDTO bankAccount){
        return accountService.addAccount(bankAccount);
    }
    @PutMapping("/bankAccounts/{id}")
    public BankAccount update(@PathVariable String id,@RequestBody BankAccount bankAccount){
        BankAccount bankAccount1=bankAccountRepo.findById(id).orElseThrow();
        if(bankAccount.getBalance()!=null)
            bankAccount1.setBalance(bankAccount.getBalance());
        if(bankAccount.getCurrency()!=null) bankAccount1.setCurrency(bankAccount.getCurrency());
        if(bankAccount.getCreatedAt()!=null) bankAccount1.setCreatedAt(new Date());
        if(bankAccount.getType()!=null) bankAccount1.setType(bankAccount.getType());
        return bankAccountRepo.save(bankAccount1);
    }
    @DeleteMapping("/bankAccounts/{id}")
    public void delete(@PathVariable String id){
         bankAccountRepo.deleteById(id);
    }
}
