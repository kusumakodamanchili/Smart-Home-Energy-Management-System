package com.example.smarthome.energy;

import lombok.AllArgsConstructor;
import lombok.Value;

@Value
@AllArgsConstructor
public class ChartPoint {
    String label;
    double value;
}
