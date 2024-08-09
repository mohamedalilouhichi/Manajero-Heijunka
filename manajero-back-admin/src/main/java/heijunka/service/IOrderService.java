package heijunka.service;

import heijunka.entite.Orders;

import java.util.List;

public interface IOrderService {
    List<Orders> createOrders(String productId, List<Orders> orders);
    Orders updateOrder(String id, Orders order);
    Orders getOrderById(String id);
    List<Orders> getAllOrders();
    void deleteOrder(String id);
    List<Orders> getOrdersByProductId(String productId); // Add this line

}