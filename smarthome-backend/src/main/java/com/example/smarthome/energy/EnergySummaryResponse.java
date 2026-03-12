package com.example.smarthome.energy;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class EnergySummaryResponse {
    double totalEnergyGeneratedKWh;
    double totalEnergyConsumedTodayKWh;
    double energySavedKWh;
    double currentPowerUsageKw;
    double systemEfficiencyPct;
    double estimatedCostSavings;
    String lastUpdatedIso;
}
