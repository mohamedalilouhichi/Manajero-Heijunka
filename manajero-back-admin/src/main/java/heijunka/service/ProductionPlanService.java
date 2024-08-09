package heijunka.service;

import heijunka.entite.ProductionPlan;
import heijunka.repository.ProductionPlanRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductionPlanService implements IProductionPlanService{

    @Autowired
    private final ProductionPlanRepo productionPlanRepository;

    public ProductionPlanService(ProductionPlanRepo productionPlanRepository) {
        this.productionPlanRepository = productionPlanRepository;
    }

    @Override
    public ProductionPlan createProductionPlan(ProductionPlan productionPlan) {
        return productionPlanRepository.save(productionPlan);
    }

    @Override
    public ProductionPlan updateProductionPlan(String id, ProductionPlan productionPlan) {
        if (productionPlanRepository.existsById(id)) {
            productionPlan.setIdPlan(id);
            return productionPlanRepository.save(productionPlan);
        }
        return null;
    }

    @Override
    public ProductionPlan getProductionPlanById(String id) {
        return productionPlanRepository.findById(id).orElse(null);
    }

    @Override
    public List<ProductionPlan> getAllProductionPlans() {
        return productionPlanRepository.findAll();
    }

    @Override
    public void deleteProductionPlan(String id) {
        productionPlanRepository.deleteById(id);
    }
}