package heijunka.service;

import heijunka.entite.Product;
import heijunka.entite.ProductionPlan;
import heijunka.repository.ProductRepo;
import heijunka.repository.ProductionPlanRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
@AllArgsConstructor
public class ProductService implements IProductService {
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private final ProductRepo productRepo;
 private final ProductionPlanRepo productionPlanRepo;
    public Product createProduct(Product product) {
        return productRepo.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Optional<Product> getProductById(String id) {  // Changer Long à String
        return productRepo.findById(id);
    }

    public Product updateProduct(String id, Product product) {  // Changer Long à String
        if (productRepo.existsById(id)) {
            product.setIdproduct(id);
            return productRepo.save(product);
        }
        return null;
    }
    public Product updateProductTaktTime(String id, double taktTime) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setTakttime(taktTime);
        return productRepo.save(product);
    }

    public void deleteProduct(String id) {  // Changer Long à String
        productRepo.deleteById(id);
    }
    // ProductService.java
    @Scheduled(cron = "0 0 0 * * MON") // Run every Monday at 00:00
    public void resetWeeklyDemand() {
        List<Product> products = productRepo.findAll();
        products.forEach(product -> {
            product.setWeeklyDemand(0);
            productRepo.save(product);
        });
    }
    public Product calculateDailyProductionGoal(String id) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        double dailyProductionGoal = (double) product.getWeeklyDemand() / product.getProductionPlan().getWorkDays();
        product.setDailyProductionGoal(dailyProductionGoal);
        return productRepo.save(product);
    }
    public List<Product> updateProducts(List<Product> products) {
        List<Product> updatedProducts = new ArrayList<>();
        for (Product product : products) {
            if (product.getIdproduct() == null) {
                // If the product ID is null, try to find the product by name and code
                Product existingProduct = productRepo.findByProductNameAndProductCode(product.getProductName(), product.getProductCode());
                if (existingProduct != null) {
                    product.setIdproduct(existingProduct.getIdproduct());
                } else {
                    log.error("Id is null for product {} and no matching product found", product);
                    continue;
                }
            }
            log.info("Updating product with id {}", product.getIdproduct());
            if (productRepo.existsById(product.getIdproduct())) {
                log.info("Product exists, updating...");
                product = updateProduct(product.getIdproduct(), product);
                updatedProducts.add(product);
            } else {
                log.info("Product does not exist, skipping...");
            }
        }
        return updatedProducts;
    }}