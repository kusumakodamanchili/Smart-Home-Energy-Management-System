package com.example.smarthome.energy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/energy")
public class EnergyController {

    private final EnergyService energyService;

    public EnergyController(EnergyService energyService) {
        this.energyService = energyService;
    }

    @GetMapping("/summary")
    public EnergySummaryResponse getSummary() {
        return energyService.buildSummary();
    }

    @GetMapping("/savings")
    public EnergySavingsResponse getSavings() {
        return energyService.buildSavings();
    }

    @GetMapping("/charts")
    public EnergyChartsResponse getCharts() {
        return energyService.buildCharts();
    }

    @GetMapping("/weekly")
    public WeeklyUsageResponse getWeekly() {
        return energyService.buildWeeklyUsage();
    }

    @GetMapping("/devices/consumption")
    public List<DeviceConsumptionResponse> getDeviceConsumption() {
        return energyService.buildDeviceConsumption();
    }
}
