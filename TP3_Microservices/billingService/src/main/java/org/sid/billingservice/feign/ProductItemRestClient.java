package org.sid.billingservice.feign;

import jakarta.ws.rs.QueryParam;
import org.sid.billingservice.models.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "PRODUCTSERVICE")
public interface ProductItemRestClient {
    @GetMapping(path = "/products")
    PagedModel<Product> pageProducts();
    @GetMapping(path = "/products/{id}")
    Product getProductById(@PathVariable Long id);
}
