package heijunka.service;

import heijunka.entite.ProductionPlan;
import heijunka.repository.ProductionPlanRepo;
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

public class ProductionPlanUnitTest {

    @Mock
    private ProductionPlanRepo productionPlanRepo;

    @InjectMocks
    private ProductionPlanService productionPlanService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateProductionPlan() {
        ProductionPlan productionPlan = ProductionPlan.builder()
                .idPlan("1")
                .workDays(5)
                .workHours(8)
                .availableTime(40)
                .build();

        when(productionPlanRepo.save(any(ProductionPlan.class))).thenReturn(productionPlan);

        ProductionPlan result = productionPlanService.createProductionPlan(productionPlan);

        assertNotNull(result);
        assertEquals("1", result.getIdPlan());
        assertEquals(5, result.getWorkDays());
        assertEquals(8, result.getWorkHours());
        assertEquals(40, result.getAvailableTime());

        verify(productionPlanRepo, times(1)).save(productionPlan);
    }

    @Test
    void testUpdateProductionPlan() {
        ProductionPlan existingPlan = ProductionPlan.builder()
                .idPlan("1")
                .workDays(5)
                .workHours(8)
                .availableTime(40)
                .build();

        ProductionPlan updatedPlan = ProductionPlan.builder()
                .idPlan("1")
                .workDays(6)
                .workHours(9)
                .availableTime(45)
                .build();

        when(productionPlanRepo.existsById("1")).thenReturn(true);
        when(productionPlanRepo.save(any(ProductionPlan.class))).thenReturn(updatedPlan);

        ProductionPlan result = productionPlanService.updateProductionPlan("1", updatedPlan);

        assertNotNull(result);
        assertEquals("1", result.getIdPlan());
        assertEquals(6, result.getWorkDays());
        assertEquals(9, result.getWorkHours());
        assertEquals(45, result.getAvailableTime());

        verify(productionPlanRepo, times(1)).save(updatedPlan);
    }

    @Test
    void testGetProductionPlanById() {
        ProductionPlan productionPlan = ProductionPlan.builder()
                .idPlan("1")
                .workDays(5)
                .workHours(8)
                .availableTime(40)
                .build();

        when(productionPlanRepo.findById("1")).thenReturn(Optional.of(productionPlan));

        ProductionPlan result = productionPlanService.getProductionPlanById("1");

        assertNotNull(result);
        assertEquals("1", result.getIdPlan());
        assertEquals(5, result.getWorkDays());
        assertEquals(8, result.getWorkHours());
        assertEquals(40, result.getAvailableTime());
    }

    @Test
    void testGetAllProductionPlans() {
        ProductionPlan plan1 = ProductionPlan.builder()
                .idPlan("1")
                .workDays(5)
                .workHours(8)
                .availableTime(40)
                .build();
        ProductionPlan plan2 = ProductionPlan.builder()
                .idPlan("2")
                .workDays(6)
                .workHours(9)
                .availableTime(45)
                .build();

        when(productionPlanRepo.findAll()).thenReturn(Arrays.asList(plan1, plan2));

        List<ProductionPlan> result = productionPlanService.getAllProductionPlans();

        assertEquals(2, result.size());
        assertTrue(result.contains(plan1));
        assertTrue(result.contains(plan2));
    }

    @Test
    void testDeleteProductionPlan() {
        // Since deleteById has no return value, we only need to verify that it's called
        doNothing().when(productionPlanRepo).deleteById("1");

        productionPlanService.deleteProductionPlan("1");

        verify(productionPlanRepo, times(1)).deleteById("1");
    }
}
