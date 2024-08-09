package heijunka.control;

import heijunka.entite.Orders;
import heijunka.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")

public class OrderControl {
    private final OrderService ordersService;

    @Autowired
    public OrderControl(OrderService ordersService) {
        this.ordersService = ordersService;
    }

    @PostMapping("/{productId}")
    public ResponseEntity<List<Orders>> createOrders(@PathVariable String productId, @RequestBody List<Orders> orders) {
        List<Orders> createdOrders = ordersService.createOrders(productId, orders);
        return ResponseEntity.ok(createdOrders);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable String id, @RequestBody Orders order) {
        Orders updatedOrder = ordersService.updateOrder(id, order);
        return ResponseEntity.ok(updatedOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orders> getOrderById(@PathVariable String id) {
        Orders order = ordersService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> orders = ordersService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        ordersService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    };
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Orders>> getOrdersByProductId(@PathVariable String productId) {
        List<Orders> orders = ordersService.getOrdersByProductId(productId);
        return ResponseEntity.ok(orders);
    }

}