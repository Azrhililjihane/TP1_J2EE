package ma.emsi.bankaccountservice.mappers;

import ma.emsi.bankaccountservice.dto.BankAccountRequestDTO;
import ma.emsi.bankaccountservice.dto.BankAccountResponseDTO;
import ma.emsi.bankaccountservice.entities.BankAccount;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

@Component
public class AccountMapper {
    public BankAccountResponseDTO fromBankAccount(BankAccount bankAccount){
        BankAccountResponseDTO bankAccountResponseDTO=new BankAccountResponseDTO();
        BeanUtils.copyProperties(bankAccount,bankAccountResponseDTO); // convert the object BankAccount to a BankAccountResponseDTO
        return bankAccountResponseDTO;
    }
    public BankAccount saveBankAccount(BankAccountRequestDTO bankAccountRequestDTO){
        BankAccount bankAccount=BankAccount.builder()
                .id(UUID.randomUUID().toString())
                .createdAt(new Date())
                .balance(bankAccountRequestDTO.getBalance())
                .type(bankAccountRequestDTO.getType())
                .currency(bankAccountRequestDTO.getCurrency())
                .build();
        return bankAccount;
    }
}
