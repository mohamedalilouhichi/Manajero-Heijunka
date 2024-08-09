package heijunka.control;

import heijunka.entite.ProductionPlan;
import heijunka.service.IProductionPlanService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ProductionPlan")
public class ProductionPlanControl {

    private final IProductionPlanService productionPlanService;

    @Autowired
    public ProductionPlanControl(IProductionPlanService productionPlanService) {
        this.productionPlanService = productionPlanService;
    }

    @PostMapping
    public ResponseEntity<ProductionPlan> createProductionPlan(@RequestBody ProductionPlan productionPlan) {
        System.out.println("Received ProductionPlan: " + productionPlan); // Debug log
        ProductionPlan createdPlan = productionPlanService.createProductionPlan(productionPlan);
        System.out.println("Created ProductionPlan: " + createdPlan); // Debug log
        return ResponseEntity.ok(createdPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductionPlan> updateProductionPlan(@PathVariable String id, @RequestBody ProductionPlan productionPlan) {
        ProductionPlan updatedPlan = productionPlanService.updateProductionPlan(id, productionPlan);
        return ResponseEntity.ok(updatedPlan);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductionPlan> getProductionPlanById(@PathVariable String id) {
        ProductionPlan productionPlan = productionPlanService.getProductionPlanById(id);
        return ResponseEntity.ok(productionPlan);
    }

    @GetMapping
    public ResponseEntity<List<ProductionPlan>> getAllProductionPlans() {
        List<ProductionPlan> productionPlans = productionPlanService.getAllProductionPlans();
        return ResponseEntity.ok(productionPlans);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductionPlan(@PathVariable String id) {
        productionPlanService.deleteProductionPlan(id);
        return ResponseEntity.noContent().build();
    }
}
