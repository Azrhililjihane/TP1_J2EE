package ma.emsi.bankaccountservice.repositories;

import ma.emsi.bankaccountservice.entities.BankAccount;
import ma.emsi.bankaccountservice.enums.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;


/** l'annotation veut dire: démarre moi un web service Restful qui permet de gérer
 *  une entité de type BankAccount. GET POST PUT DELETE seront automatiquement générées*/
@RepositoryRestResource
public interface IBankAccount extends JpaRepository<BankAccount,String> {
    @RestResource(path = "/byType")  // After applying this, inside the request we will be calling the function by byType rather than by the name of the function
    List<BankAccount> findByType(@Param("t") AccountType type);
}
