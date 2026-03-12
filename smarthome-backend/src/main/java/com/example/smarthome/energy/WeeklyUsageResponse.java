package com.example.smarthome.energy;

import lombok.Builder;
import lombok.Singular;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class WeeklyUsageResponse {
    @Singular("point")
    List<ChartPoint> weeklyKWh;
    int refreshIntervalSeconds;
    String lastUpdatedIso;
}
