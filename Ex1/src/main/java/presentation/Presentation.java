package presentation;
import metier.IMetier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Presentation {
    public static void main(String[] args){

        ApplicationContext context= new AnnotationConfigApplicationContext("dao","metier");
        IMetier metier= context.getBean(IMetier.class);
        System.out.println("Résultat est: "+ metier.calcul() );
    }
}
