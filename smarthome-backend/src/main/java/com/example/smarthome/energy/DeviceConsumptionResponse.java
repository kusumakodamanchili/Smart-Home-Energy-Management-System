package com.example.smarthome.energy;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class DeviceConsumptionResponse {
    int id;
    String name;
    String room;
    String icon;
    String usage;
    boolean on;
    double powerRatingWatts;
    double consumptionTodayKWh;
    double consumptionMonthKWh;
    double estimatedCostToday;
    double estimatedCostMonth;
}
