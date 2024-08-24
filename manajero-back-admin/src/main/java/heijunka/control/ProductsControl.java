package heijunka.control;

import heijunka.entite.Product;
import heijunka.repository.ProductRepo;
import heijunka.service.ProductService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/products")
public class ProductsControl {
    private static final Logger logger = LoggerFactory.getLogger(ProductsControl.class);

    @Autowired
    private ProductService productService;
    private final ProductRepo productRepository;
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.createProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Product>> getProductById(@PathVariable String id) {  // Changer Long à String
        Optional<Product> product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {  // Changer Long à String
        Product updatedProduct = productService.updateProduct(id, product);
        return updatedProduct != null ? ResponseEntity.ok(updatedProduct) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") String id) {
        try {
            productService.deleteProduct(id); // Perform delete operation with String ID
            return ResponseEntity.noContent().build(); // Success response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Error response
        }
    }

    @PutMapping("/{id}/takt-time")
    public ResponseEntity<Product> updateProductTaktTime(@PathVariable String id, @RequestBody double taktTime) {
        Product updatedProduct = productService.updateProductTaktTime(id, taktTime);
        return ResponseEntity.ok(updatedProduct);
    }
    @PatchMapping("/{id}/daily-production-goal")
    public ResponseEntity<Product> updateDailyProductionGoal(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product product = productOptional.get();

        if (updates.containsKey("dailyProductionGoal")) {
            // Ensure the value is a Double before casting
            Object dailyProductionGoal = updates.get("dailyProductionGoal");
            if (dailyProductionGoal instanceof Number) {
                double newDailyProductionGoal = ((Number) dailyProductionGoal).doubleValue();
                if (newDailyProductionGoal > 0) {
                    product.setDailyProductionGoal(newDailyProductionGoal);
                    logger.info("Updated daily production goal for product with ID {}: {}", id, newDailyProductionGoal);

                }
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        }

        productRepository.save(product);

        return ResponseEntity.ok(product);
    }



    @GetMapping("/{id}/daily-production-goal")
    public ResponseEntity<Product> calculateDailyProductionGoal(@PathVariable String id) {
        Product product = productService.calculateDailyProductionGoal(id);
        return ResponseEntity.ok(product);
    }
    @PutMapping
    public ResponseEntity<List<Product>> updateProducts(@RequestBody List<Product> products) {
        List<Product> updatedProducts = productService.updateProducts(products);
        return ResponseEntity.ok(updatedProducts);
    }
    @PatchMapping("/{id}/archive")
    public ResponseEntity<Product> archiveProduct(@PathVariable String id) {
        Product archivedProduct = productService.archiveProduct(id);
        return archivedProduct != null ? ResponseEntity.ok(archivedProduct) : ResponseEntity.notFound().build();
    }



    @GetMapping("/archived")
    public ResponseEntity<List<Product>> getArchivedProducts() {
        List<Product> archivedProducts = productService.getArchivedProducts();
        return ResponseEntity.ok(archivedProducts);
    }
    @PatchMapping("/{id}/restore")
    public ResponseEntity<Product> restoreProduct(@PathVariable String id) {
        try {
            Product restoredProduct = productService.restoreProduct(id);
            return restoredProduct != null ? ResponseEntity.ok(restoredProduct) : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}