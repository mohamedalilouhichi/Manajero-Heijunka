package heijunka.service;

import heijunka.entite.Orders;
import heijunka.entite.Product;
import heijunka.repository.OrderRepo;
import heijunka.repository.ProductRepo;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class OrderIntegrationTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ProductRepo productRepo;

    private Product product;
    private Orders order;

    @BeforeEach
    public void setup() {
        product = new Product();
        product.setIdproduct("product1");
        product.setTotalquantity(100);
        product.setWeeklyDemand(50);
        productRepo.save(product);

        order = new Orders();
        order.setIdOrder("order1");
        order.setProduct(product);
        order.setQuantity(10);
        order.setStatus("Not Done");
        orderRepo.save(order);
    }

    @AfterEach
    public void tearDown() {
        orderRepo.deleteAll();
        productRepo.deleteAll();
    }

    @Test
    public void testCreateOrders() {
        // Arrange
        List<Orders> orders = new ArrayList<>();
        Orders newOrder = new Orders();
        newOrder.setIdOrder("order2");
        newOrder.setQuantity(5);
        newOrder.setProduct(product);
        orders.add(newOrder);

        // Act
        List<Orders> savedOrders = orderService.createOrders(product.getIdproduct(), orders);

        // Assert
        assertEquals(1, savedOrders.size());
        assertEquals(newOrder.getQuantity(), savedOrders.get(0).getQuantity());
        assertEquals(105, productRepo.findById(product.getIdproduct()).get().getTotalquantity());
        assertEquals(55, productRepo.findById(product.getIdproduct()).get().getWeeklyDemand());
    }

    @Test
    public void testUpdateOrder() {
        // Arrange
        Orders updatedOrder = new Orders();
        updatedOrder.setIdOrder("order1");
        updatedOrder.setProduct(product);
        updatedOrder.setQuantity(15);
        updatedOrder.setStatus("Not Done");

        // Act
        Orders result = orderService.updateOrder(order.getIdOrder(), updatedOrder);

        // Assert
        assertEquals(updatedOrder.getQuantity(), result.getQuantity());
        assertEquals(105, productRepo.findById(product.getIdproduct()).get().getTotalquantity());
        assertEquals(55, productRepo.findById(product.getIdproduct()).get().getWeeklyDemand());
    }

    @Test
    public void testDeleteOrder() {
        // Act
        orderService.deleteOrder(order.getIdOrder());

        // Assert
        assertEquals(0, orderRepo.count());
        assertEquals(90, productRepo.findById(product.getIdproduct()).get().getTotalquantity());
        assertEquals(40, productRepo.findById(product.getIdproduct()).get().getWeeklyDemand());
    }

    @Test
    public void testGetOrderById() {
        // Act
        Orders result = orderService.getOrderById(order.getIdOrder());

        // Assert
        assertEquals(order.getIdOrder(), result.getIdOrder());
    }

    @Test
    public void testGetAllOrders() {
        // Act
        List<Orders> result = orderService.getAllOrders();

        // Assert
        assertEquals(1, result.size());
        assertEquals(order.getIdOrder(), result.get(0).getIdOrder());
    }

    @Test
    public void testGetOrdersByProductId() {
        // Act
        List<Orders> result = orderService.getOrdersByProductId(product.getIdproduct());

        // Assert
        assertEquals(1, result.size());
        assertEquals(order.getIdOrder(), result.get(0).getIdOrder());
    }

    @Test
    public void testUpdateOrderNotFound() {
        // Arrange
        Orders newOrder = new Orders();
        newOrder.setIdOrder("orderNotFound");
        newOrder.setProduct(product);
        newOrder.setQuantity(10);
        newOrder.setStatus("Not Done");

        // Act and Assert
        assertThrows(RuntimeException.class, () -> orderService.updateOrder("orderNotFound", newOrder));
    }

    @Test
    public void testDeleteOrderNotFound() {
        // Act and Assert
        assertThrows(RuntimeException.class, () -> orderService.deleteOrder("orderNotFound"));
    }

    @Test
    public void testGetOrderByIdNotFound() {
        // Act and Assert
        assertThrows(RuntimeException.class, () -> orderService.getOrderById("orderNotFound"));
    }
}
