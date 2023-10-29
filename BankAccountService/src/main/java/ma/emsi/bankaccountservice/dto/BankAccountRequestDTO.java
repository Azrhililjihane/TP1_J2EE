package ma.emsi.bankaccountservice.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.emsi.bankaccountservice.enums.AccountType;

/** DTO will play the role of a messenger between the service and the repository **/
@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class BankAccountRequestDTO {
    /** To create a bank account we only need these information **/
    private Double balance;
    private String currency;
    private AccountType type;
}
