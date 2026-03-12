package com.example.smarthome.energy;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Device {
    private int id;
    private String name;
    private String room;
    private String usage;
    private String icon;
    private boolean on;
}
