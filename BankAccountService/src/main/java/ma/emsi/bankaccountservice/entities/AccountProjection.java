package ma.emsi.bankaccountservice.entities;

import ma.emsi.bankaccountservice.enums.AccountType;
import org.springframework.data.rest.core.config.Projection;

/*** When I want to consult an account I want just the Id and the type to be shown ***/
@Projection(types = BankAccount.class, name="p1")
public interface AccountProjection {
    public String getId();
    public AccountType getType();
    public Double getBalance();
}
