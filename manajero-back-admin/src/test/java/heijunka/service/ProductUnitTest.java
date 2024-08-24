package heijunka.service;

import heijunka.entite.Product;
import heijunka.entite.ProductionPlan;
import heijunka.repository.ProductRepo;
import heijunka.repository.ProductionPlanRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProductUnitTest {

    @Mock
    private ProductRepo productRepo;

    @Mock
    private ProductionPlanRepo productionPlanRepo;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProduct() {
        Product product = Product.builder()
                .idproduct("1")
                .productName("Test Product")
                .build();

        when(productRepo.save(any(Product.class))).thenReturn(product);

        Product createdProduct = productService.createProduct(product);

        assertNotNull(createdProduct);
        assertEquals("1", createdProduct.getIdproduct());
    }

    @Test
    void testGetAllProducts() {
        List<Product> products = new ArrayList<>();
        products.add(Product.builder().idproduct("1").build());
        products.add(Product.builder().idproduct("2").build());

        when(productRepo.findAll()).thenReturn(products);

        List<Product> fetchedProducts = productService.getAllProducts();

        assertNotNull(fetchedProducts);
        assertEquals(2, fetchedProducts.size());
    }

    @Test
    void testGetProductById() {
        Product product = Product.builder().idproduct("1").build();

        when(productRepo.findById("1")).thenReturn(Optional.of(product));

        Optional<Product> fetchedProduct = productService.getProductById("1");

        assertTrue(fetchedProduct.isPresent());
        assertEquals("1", fetchedProduct.get().getIdproduct());
    }

    @Test
    void testUpdateProduct() {
        Product existingProduct = Product.builder().idproduct("1").build();
        Product updatedProduct = Product.builder().idproduct("1").productName("Updated Product").build();

        when(productRepo.existsById("1")).thenReturn(true);
        when(productRepo.save(any(Product.class))).thenReturn(updatedProduct);

        Product result = productService.updateProduct("1", updatedProduct);

        assertNotNull(result);
        assertEquals("Updated Product", result.getProductName());
    }

    @Test
    void testUpdateProductTaktTime() {
        Product product = Product.builder().idproduct("1").takttime(1.0).build();

        when(productRepo.findById("1")).thenReturn(Optional.of(product));
        when(productRepo.save(any(Product.class))).thenReturn(product);

        Product updatedProduct = productService.updateProductTaktTime("1", 2.0);

        assertNotNull(updatedProduct);
        assertEquals(2.0, updatedProduct.getTakttime());
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(productRepo).deleteById("1");

        productService.deleteProduct("1");

        verify(productRepo, times(1)).deleteById("1");
    }

    @Test
    void testResetWeeklyDemand() {
        Product product = Product.builder().idproduct("1").weeklyDemand(10).build();
        List<Product> products = List.of(product);

        when(productRepo.findAll()).thenReturn(products);
        when(productRepo.save(any(Product.class))).thenReturn(product);

        productService.resetWeeklyDemand();

        assertEquals(0, product.getWeeklyDemand());
        verify(productRepo, times(1)).save(product);
    }

    @Test
    void testCalculateDailyProductionGoal() {
        ProductionPlan productionPlan = new ProductionPlan();
        productionPlan.setWorkDays(5);

        Product product = Product.builder()
                .idproduct("1")
                .weeklyDemand(50)
                .productionPlan(productionPlan)
                .build();

        when(productRepo.findById("1")).thenReturn(Optional.of(product));
        when(productRepo.save(any(Product.class))).thenReturn(product);

        Product updatedProduct = productService.calculateDailyProductionGoal("1");

        assertNotNull(updatedProduct);
        assertEquals(10.0, updatedProduct.getDailyProductionGoal());
    }

    @Test
    void testUpdateProducts() {
        Product product1 = Product.builder().idproduct("1").build();
        Product product2 = Product.builder().productName("Product 2").productCode("Code 2").build();

        when(productRepo.findByProductNameAndProductCode("Product 2", "Code 2")).thenReturn(product1);
        when(productRepo.existsById("1")).thenReturn(true);
        when(productRepo.save(any(Product.class))).thenAnswer(invocation -> invocation.getArgument(0));

        List<Product> products = List.of(product1, product2);

        List<Product> updatedProducts = productService.updateProducts(products);

        assertEquals(2, updatedProducts.size());
        assertEquals("1", updatedProducts.get(0).getIdproduct());
    }

    @Test
    void testArchiveProduct() {
        Product product = Product.builder().idproduct("1").build();

        when(productRepo.findById("1")).thenReturn(Optional.of(product));
        when(productRepo.save(any(Product.class))).thenReturn(product);

        Product archivedProduct = productService.archiveProduct("1");

        assertNotNull(archivedProduct);
        assertTrue(archivedProduct.isArchived());
    }

    @Test
    void testGetArchivedProducts() {
        Product archivedProduct = Product.builder().idproduct("1").archived(true).build();
        List<Product> products = List.of(archivedProduct);

        when(productRepo.findByArchivedTrue()).thenReturn(products);

        List<Product> archivedProducts = productService.getArchivedProducts();

        assertNotNull(archivedProducts);
        assertEquals(1, archivedProducts.size());
        assertTrue(archivedProducts.get(0).isArchived());
    }

    @Test
    void testRestoreProduct() {
        Product product = Product.builder().idproduct("1").archived(true).build();

        when(productRepo.findById("1")).thenReturn(Optional.of(product));
        when(productRepo.save(any(Product.class))).thenReturn(product);

        Product restoredProduct = productService.restoreProduct("1");

        assertNotNull(restoredProduct);
        assertFalse(restoredProduct.isArchived());
    }
}
