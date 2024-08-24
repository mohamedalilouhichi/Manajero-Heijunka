package heijunka.service;

import heijunka.entite.Product;
import heijunka.entite.ProductionPlan;
import heijunka.repository.ProductRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest

public class ProductIntegrationTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepo productRepo;

    private Product product;

    @BeforeEach
    public void setup() {
        product = new Product();
        product.setIdproduct("product1");
        product.setTotalquantity(100);
        product.setWeeklyDemand(50);
        product.setProductName("Test Product");
        product.setProductCode("TP001");
        product.setTakttime(1.0);
        product.setProductionPlan(new ProductionPlan());
        productRepo.save(product);
    }

    @AfterEach
    public void tearDown() {
        productRepo.deleteAll();
    }

    @Test
    public void testCreateProduct() {
        Product newProduct = new Product();
        newProduct.setIdproduct("product2");
        newProduct.setTotalquantity(200);
        newProduct.setWeeklyDemand(100);
        newProduct.setProductName("New Product");
        newProduct.setProductCode("NP001");
        newProduct.setTakttime(2.0);
        newProduct.setProductionPlan(new ProductionPlan());

        Product createdProduct = productService.createProduct(newProduct);

        assertNotNull(createdProduct);
        assertEquals("product2", createdProduct.getIdproduct());
        assertEquals(200, createdProduct.getTotalquantity());
    }

    @Test
    public void testUpdateProduct() {
        Product updatedProduct = new Product();
        updatedProduct.setIdproduct(product.getIdproduct());
        updatedProduct.setTotalquantity(150);
        updatedProduct.setWeeklyDemand(60);
        updatedProduct.setProductName("Updated Product");
        updatedProduct.setProductCode("UP001");
        updatedProduct.setTakttime(1.5);
        updatedProduct.setProductionPlan(new ProductionPlan());

        Product result = productService.updateProduct(product.getIdproduct(), updatedProduct);

        assertNotNull(result);
        assertEquals(150, result.getTotalquantity());
        assertEquals(60, result.getWeeklyDemand());
    }

    @Test
    public void testUpdateProductTaktTime() {
        double newTaktTime = 1.5;
        Product updatedProduct = productService.updateProductTaktTime(product.getIdproduct(), newTaktTime);

        assertNotNull(updatedProduct);
        assertEquals(newTaktTime, updatedProduct.getTakttime());
    }

    @Test
    public void testDeleteProduct() {
        productService.deleteProduct(product.getIdproduct());

        Optional<Product> deletedProduct = productRepo.findById(product.getIdproduct());
        assertFalse(deletedProduct.isPresent());
    }

    @Test
    public void testGetProductById() {
        Optional<Product> result = productService.getProductById(product.getIdproduct());

        assertTrue(result.isPresent());
        assertEquals(product.getIdproduct(), result.get().getIdproduct());
    }

    @Test
    public void testGetAllProducts() {
        List<Product> result = productService.getAllProducts();

        assertFalse(result.isEmpty());
        assertEquals(product.getIdproduct(), result.get(0).getIdproduct());
    }

    @Test
    public void testArchiveProduct() {
        Product archivedProduct = productService.archiveProduct(product.getIdproduct());

        assertNotNull(archivedProduct);
        assertTrue(archivedProduct.isArchived());
    }

    @Test
    public void testGetArchivedProducts() {
        productService.archiveProduct(product.getIdproduct());

        List<Product> archivedProducts = productService.getArchivedProducts();

        assertFalse(archivedProducts.isEmpty());
        assertTrue(archivedProducts.get(0).isArchived());
    }

    @Test
    public void testRestoreProduct() {
        productService.archiveProduct(product.getIdproduct());
        Product restoredProduct = productService.restoreProduct(product.getIdproduct());

        assertNotNull(restoredProduct);
        assertFalse(restoredProduct.isArchived());
    }

    @Test
    public void testCalculateDailyProductionGoal() {
        // Assuming ProductionPlan has workDays set to 5
        product.getProductionPlan().setWorkDays(5);
        productRepo.save(product);

        Product updatedProduct = productService.calculateDailyProductionGoal(product.getIdproduct());

        assertNotNull(updatedProduct);
        assertEquals(10.0, updatedProduct.getDailyProductionGoal()); // 50 / 5
    }

    @Test
    public void testUpdateProducts() {
        List<Product> products = new ArrayList<>();
        Product productToUpdate = new Product();
        productToUpdate.setIdproduct(product.getIdproduct()); // Existing product
        productToUpdate.setTotalquantity(300);
        productToUpdate.setWeeklyDemand(150);
        products.add(productToUpdate);

        List<Product> updatedProducts = productService.updateProducts(products);

        assertEquals(1, updatedProducts.size());
        assertEquals(300, updatedProducts.get(0).getTotalquantity());
        assertEquals(150, updatedProducts.get(0).getWeeklyDemand());
    }
}
