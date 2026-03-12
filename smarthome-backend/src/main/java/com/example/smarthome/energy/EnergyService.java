package com.example.smarthome.energy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class EnergyService {

    private final double pricePerKwh;
    private final DeviceService deviceService;

    public EnergyService(@Value("${app.energy.price-per-kwh:8.0}") double pricePerKwh,
                         DeviceService deviceService) {
        this.pricePerKwh = pricePerKwh;
        this.deviceService = deviceService;
    }

    public EnergySummaryResponse buildSummary() {
        ThreadLocalRandom rnd = ThreadLocalRandom.current();
        double totalGenerated = round(rnd.nextDouble(520, 760));
        double energyConsumedToday = round(rnd.nextDouble(110, 185));
        double energySaved = round(rnd.nextDouble(5, 18));
        double currentPower = round(rnd.nextDouble(0.6, 2.4)); // kW
        double efficiency = round(rnd.nextDouble(72, 90));
        double estimatedCostSavings = round(energySaved * pricePerKwh * 0.12); // keep savings realistic

        return EnergySummaryResponse.builder()
                .totalEnergyGeneratedKWh(totalGenerated)
                .totalEnergyConsumedTodayKWh(energyConsumedToday)
                .energySavedKWh(energySaved)
                .currentPowerUsageKw(currentPower)
                .systemEfficiencyPct(efficiency)
                .estimatedCostSavings(estimatedCostSavings)
                .lastUpdatedIso(Instant.now().toString())
                .build();
    }

    public EnergySavingsResponse buildSavings() {
        ThreadLocalRandom rnd = ThreadLocalRandom.current();
        double savedToday = round(rnd.nextDouble(0.3, 2.0));
        double savedMonth = round(rnd.nextDouble(12, 35));
        double savedTotal = round(savedMonth * 5 + rnd.nextDouble(80, 160));
        double costSaved = round(savedTotal * pricePerKwh * 0.12);

        return EnergySavingsResponse.builder()
                .savedTodayKWh(savedToday)
                .savedMonthKWh(savedMonth)
                .savedTotalKWh(savedTotal)
                .costSaved(costSaved)
                .pricePerKwh(pricePerKwh)
                .build();
    }

    public EnergyChartsResponse buildCharts() {
        List<ChartPoint> dailyProduction = new ArrayList<>();
        LocalDate today = LocalDate.now();
        ThreadLocalRandom rnd = ThreadLocalRandom.current();
        for (int i = 6; i >= 0; i--) {
            LocalDate day = today.minusDays(i);
            double value = round(rnd.nextDouble(8, 18));
            dailyProduction.add(new ChartPoint(day.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH), value));
        }

        List<ChartPoint> monthlySavings = new ArrayList<>();
        for (int i = 5; i >= 0; i--) {
            LocalDate month = today.minusMonths(i);
            double value = round(rnd.nextDouble(90, 210));
            monthlySavings.add(new ChartPoint(month.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH), value));
        }

        List<ChartPoint> powerDistribution = List.of(
                new ChartPoint("Lighting", 21),
                new ChartPoint("HVAC", 32),
                new ChartPoint("Appliances", 19),
                new ChartPoint("EV Charging", 14),
                new ChartPoint("Other", 14)
        );

        return EnergyChartsResponse.builder()
                .dailyProduction(dailyProduction)
                .monthlySavings(monthlySavings)
                .powerUsageDistribution(powerDistribution)
                .build();
    }

    public WeeklyUsageResponse buildWeeklyUsage() {
        List<ChartPoint> week = new ArrayList<>();
        LocalDate today = LocalDate.now();
        ThreadLocalRandom rnd = ThreadLocalRandom.current();
        for (int i = 6; i >= 0; i--) {
            LocalDate day = today.minusDays(i);
            double kwh = round(rnd.nextDouble(9, 16));
            week.add(new ChartPoint(day.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH), kwh));
        }
        return WeeklyUsageResponse.builder()
                .weeklyKWh(week)
                .refreshIntervalSeconds(10)
                .lastUpdatedIso(Instant.now().toString())
                .build();
    }

    public List<DeviceConsumptionResponse> buildDeviceConsumption() {
        LocalDate today = LocalDate.now();
        int daysInMonth = today.lengthOfMonth();
        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        return deviceService.list().stream()
                .map(device -> {
                    double powerW = parsePowerWatts(device.getUsage());
                    double hoursToday = device.isOn()
                            ? rnd.nextDouble(3.0, 9.0)
                            : rnd.nextDouble(0.2, 2.0);
                    double energyToday = round((powerW / 1000.0) * hoursToday);
                    double dutyCycle = rnd.nextDouble(0.45, 0.85);
                    double energyMonth = round(energyToday * daysInMonth * dutyCycle);
                    double costToday = round(energyToday * pricePerKwh * 0.12);
                    double costMonth = round(energyMonth * pricePerKwh * 0.12);

                    return DeviceConsumptionResponse.builder()
                            .id(device.getId())
                            .name(device.getName())
                            .room(device.getRoom())
                            .icon(device.getIcon())
                            .usage(device.getUsage())
                            .on(device.isOn())
                            .powerRatingWatts(round(powerW))
                            .consumptionTodayKWh(energyToday)
                            .consumptionMonthKWh(energyMonth)
                            .estimatedCostToday(costToday)
                            .estimatedCostMonth(costMonth)
                            .build();
                })
                .toList();
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }

    private double parsePowerWatts(String usage) {
        if (usage == null || usage.isBlank()) {
            return 0;
        }
        String normalized = usage.trim().toLowerCase();
        try {
            if (normalized.endsWith("kw")) {
                return Double.parseDouble(normalized.replace("kw", "").trim()) * 1000;
            }
            if (normalized.endsWith("w")) {
                return Double.parseDouble(normalized.replace("w", "").trim());
            }
            return Double.parseDouble(normalized);
        } catch (NumberFormatException ex) {
            return 0;
        }
    }
}
