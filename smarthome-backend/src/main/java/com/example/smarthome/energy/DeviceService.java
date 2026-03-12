package com.example.smarthome.energy;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class DeviceService {

    private final CopyOnWriteArrayList<Device> devices = new CopyOnWriteArrayList<>(
            List.of(
                    Device.builder().id(1).name("Hall Main Light").room("Hall").usage("90W").icon("lamp").on(true).build(),
                    Device.builder().id(2).name("Hall Ceiling Fan").room("Hall").usage("65W").icon("fan").on(true).build(),
                    Device.builder().id(3).name("Living AC").room("Living Room").usage("2.5kW").icon("ac").on(true).build(),
                    Device.builder().id(4).name("Bedroom Light").room("Bedroom").usage("60W").icon("lamp").on(true).build(),
                    Device.builder().id(5).name("Bedroom Fan").room("Bedroom").usage("70W").icon("fan").on(false).build(),
                    Device.builder().id(6).name("Kitchen Refrigerator").room("Kitchen").usage("180W").icon("fridge").on(true).build(),
                    Device.builder().id(7).name("Water Heater").room("Bathroom").usage("3.5kW").icon("bolt").on(false).build(),
                    Device.builder().id(8).name("Washing Machine").room("Laundry").usage("2.2kW").icon("bolt").on(false).build()
            )
    );

    public List<Device> list() {
        return devices;
    }

    public Optional<Device> toggle(int id) {
        for (int i = 0; i < devices.size(); i++) {
            Device d = devices.get(i);
            if (d.getId() == id) {
                Device updated = Device.builder()
                        .id(d.getId())
                        .name(d.getName())
                        .room(d.getRoom())
                        .usage(d.getUsage())
                        .icon(d.getIcon())
                        .on(!d.isOn())
                        .build();
                devices.set(i, updated);
                return Optional.of(updated);
            }
        }
        return Optional.empty();
    }
}
