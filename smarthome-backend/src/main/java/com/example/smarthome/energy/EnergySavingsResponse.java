package com.example.smarthome.energy;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class EnergySavingsResponse {
    double savedTodayKWh;
    double savedMonthKWh;
    double savedTotalKWh;
    double costSaved;
    double pricePerKwh;
}
