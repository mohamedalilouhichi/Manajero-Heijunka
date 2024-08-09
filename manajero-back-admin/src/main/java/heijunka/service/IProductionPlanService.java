package heijunka.service;

import heijunka.entite.ProductionPlan;

import java.util.List;
import heijunka.entite.ProductionPlan;

import java.util.List;

public interface IProductionPlanService {
    ProductionPlan createProductionPlan(ProductionPlan productionPlan);
    ProductionPlan updateProductionPlan(String id, ProductionPlan productionPlan);
    ProductionPlan getProductionPlanById(String id);
    List<ProductionPlan> getAllProductionPlans();
    void deleteProductionPlan(String id);
}
