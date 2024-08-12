package heijunka.service;

import heijunka.entite.Orders;
import heijunka.entite.Product;

import heijunka.repository.OrderRepo;
import heijunka.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Configuration
@EnableScheduling
public class OrderService implements IOrderService {

    private final OrderRepo ordersRepository;
    private final ProductRepo productRepository;
    private ProductService productService;

    @Autowired
    public OrderService(OrderRepo ordersRepository, ProductRepo productRepository) {
        this.ordersRepository = ordersRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<Orders> createOrders(String productId, List<Orders> orders) {
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();

            // Calculate total quantities and demands
            int totalQuantity = orders.stream().mapToInt(Orders::getQuantity).sum();
            int weeklyDemand = orders.stream().mapToInt(Orders::getQuantity).sum();

            // Ensure orders are associated with the product
            for (Orders order : orders) {
                order.setProduct(product);
                order.setStatus("Not Done");

            }

            // Save orders and update product details
            List<Orders> savedOrders = ordersRepository.saveAll(orders);

            product.setTotalquantity(product.getTotalquantity() + totalQuantity);
            product.setWeeklyDemand(product.getWeeklyDemand() + weeklyDemand);
            productRepository.save(product);

            return savedOrders;
        } else {
            throw new RuntimeException("Product not found with id: " + productId);
        }
    }


    @Override
    public Orders updateOrder(String id, Orders order) {
        Optional<Orders> existingOrderOpt = ordersRepository.findById(id);
        if (existingOrderOpt.isPresent()) {
            Orders existingOrder = existingOrderOpt.get();
            Product product = existingOrder.getProduct();

            // Adjust total quantity before updating the order
            product.setTotalquantity(product.getTotalquantity() - existingOrder.getQuantity() + order.getQuantity());

            // Adjust weekly demand before updating the order
            int currentWeeklyDemand = product.getWeeklyDemand();
            product.setWeeklyDemand(currentWeeklyDemand - existingOrder.getQuantity() + order.getQuantity());

            order.setProduct(product);
            Orders updatedOrder = ordersRepository.save(order);
            productRepository.save(product);

            return updatedOrder;
        } else {
            throw new RuntimeException("Order not found with id: " + id);
        }
    }

    @Override
    public void deleteOrder(String id) {
        Optional<Orders> existingOrderOpt = ordersRepository.findById(id);
        if (existingOrderOpt.isPresent()) {
            Orders existingOrder = existingOrderOpt.get();
            Product product = existingOrder.getProduct();

            // Adjust total quantity before deleting the order
            product.setTotalquantity(product.getTotalquantity() - existingOrder.getQuantity());

            // Adjust weekly demand before deleting the order
            int currentWeeklyDemand = product.getWeeklyDemand();
            product.setWeeklyDemand(currentWeeklyDemand - existingOrder.getQuantity());

            productRepository.save(product);

            ordersRepository.deleteById(id);
        } else {
            throw new RuntimeException("Order not found with id: " + id);
        }
    }

    @Override
    public Orders getOrderById(String id) {
        return ordersRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    @Override
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    @Override
    public List<Orders> getOrdersByProductId(String productId) {
        return ordersRepository.findByProductId(productId);
    }
    @Scheduled(cron = "* * * * * MON")
    public void updateOrderStatusToDone() {
        List<Orders> orders = ordersRepository.findAll();
        orders.forEach(order -> {
            if (!"Done".equals(order.getStatus())) {
                order.setStatus("Done");
                ordersRepository.save(order);
            }
        });
    }
}