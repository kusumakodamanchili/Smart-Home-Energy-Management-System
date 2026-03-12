package com.example.smarthome.energy;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class EnergyChartsResponse {
    @Singular("dailyPoint")
    List<ChartPoint> dailyProduction;
    @Singular("monthlyPoint")
    List<ChartPoint> monthlySavings;
    @Singular("distributionPoint")
    List<ChartPoint> powerUsageDistribution;
}
