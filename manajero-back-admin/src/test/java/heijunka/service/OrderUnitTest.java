package heijunka.service;

import heijunka.entite.Orders;
import heijunka.entite.Product;
import heijunka.repository.OrderRepo;
import heijunka.repository.ProductRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class OrderUnitTest {

    @Mock
    private OrderRepo orderRepo;

    @Mock
    private ProductRepo productRepo;

    @InjectMocks
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateOrders() {
        Product product = new Product();
        product.setTotalquantity(100);
        product.setWeeklyDemand(200);

        Orders order1 = Orders.builder().quantity(10).build();
        Orders order2 = Orders.builder().quantity(20).build();

        when(productRepo.findById(anyString())).thenReturn(Optional.of(product));
        when(orderRepo.saveAll(anyList())).thenReturn(Arrays.asList(order1, order2));
        when(productRepo.save(any(Product.class))).thenReturn(product);

        List<Orders> orders = Arrays.asList(order1, order2);
        List<Orders> result = orderService.createOrders("productId", orders);

        // Debug output
        System.out.println("Total quantity after orders: " + product.getTotalquantity());
        System.out.println("Weekly demand after orders: " + product.getWeeklyDemand());

        // Assuming the method adds order quantities to product's total quantity and weekly demand
        assertEquals(130, product.getTotalquantity()); // 100 + 10 + 20
        assertEquals(230, product.getWeeklyDemand()); // 200 + 10 + 20
    }


    @Test
    void testUpdateOrder() {
        // Create the initial order with product
        Product product = Product.builder()
                .idproduct("prod1")
                .totalquantity(10)
                .weeklyDemand(20)
                .build();

        Orders existingOrder = Orders.builder()
                .idOrder("1")
                .quantity(5)
                .product(product) // Ensure the product is set
                .build();

        Orders updatedOrder = Orders.builder()
                .idOrder("1")
                .quantity(15)
                .product(product) // Ensure the product is set
                .build();

        Product updatedProduct = Product.builder()
                .idproduct("prod1")
                .totalquantity(20) // Adjusted quantity
                .weeklyDemand(30) // Adjusted demand
                .build();

        when(orderRepo.findById("1")).thenReturn(Optional.of(existingOrder));
        when(orderRepo.save(any(Orders.class))).thenReturn(updatedOrder);
        when(productRepo.save(any(Product.class))).thenReturn(updatedProduct);

        Orders result = orderService.updateOrder("1", updatedOrder);

        // Assertions to verify the updated values
        assertEquals(15, result.getQuantity());
        assertEquals(20, updatedProduct.getTotalquantity());
        assertEquals(30, updatedProduct.getWeeklyDemand());

        verify(orderRepo, times(1)).save(updatedOrder);
        verify(productRepo, times(1)).save(updatedProduct);
    }


    @Test
    void testDeleteOrder() {
        // Create the product and order
        Product product = new Product();
        product.setTotalquantity(10);
        product.setWeeklyDemand(20);

        Orders existingOrder = Orders.builder()
                .idOrder("1")
                .quantity(5)
                .product(product)  // Ensure the order is associated with the product
                .build();

        // Mock the repository interactions
        when(orderRepo.findById("1")).thenReturn(Optional.of(existingOrder));

        // Use an Answer to return the product with the updated values
        when(productRepo.save(any(Product.class))).thenAnswer(invocation -> {
            Product savedProduct = invocation.getArgument(0);
            return savedProduct;
        });

        // Mock the deletion
        doNothing().when(orderRepo).deleteById("1");

        // Call the service method
        orderService.deleteOrder("1");

        // Verify the changes on the product
        assertEquals(5, product.getTotalquantity()); // Expected total quantity after deletion
        assertEquals(15, product.getWeeklyDemand()); // Expected weekly demand after deletion
        verify(orderRepo, times(1)).deleteById("1");
    }


    @Test
    void testGetOrderById() {
        Orders order = Orders.builder().idOrder("1").build();

        when(orderRepo.findById("1")).thenReturn(Optional.of(order));

        Orders result = orderService.getOrderById("1");

        assertEquals("1", result.getIdOrder());
    }

    @Test
    void testGetAllOrders() {
        Orders order1 = Orders.builder().idOrder("1").build();
        Orders order2 = Orders.builder().idOrder("2").build();

        when(orderRepo.findAll()).thenReturn(Arrays.asList(order1, order2));

        List<Orders> result = orderService.getAllOrders();

        assertEquals(2, result.size());
    }

    @Test
    void testGetOrdersByProductId() {
        Orders order1 = Orders.builder().idOrder("1").build();
        Orders order2 = Orders.builder().idOrder("2").build();

        when(orderRepo.findByProductId("productId")).thenReturn(Arrays.asList(order1, order2));

        List<Orders> result = orderService.getOrdersByProductId("productId");

        assertEquals(2, result.size());
    }

    @Test
    void testUpdateOrderStatusToDone() {
        Orders order1 = Orders.builder().idOrder("1").status("Not Done").build();
        Orders order2 = Orders.builder().idOrder("2").status("Done").build();

        when(orderRepo.findAll()).thenReturn(Arrays.asList(order1, order2));
        when(orderRepo.save(any(Orders.class))).thenReturn(order1);

        orderService.updateOrderStatusToDone();

        assertEquals("Done", order1.getStatus());
        verify(orderRepo, times(1)).save(order1);
    }
}
