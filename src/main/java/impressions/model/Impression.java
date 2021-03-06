package impressions.model;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class Impression {

    private long deviceId;
    private double lat;
    private double lng;
    private long timestamp;

    public Impression(String[] properties) {
        this.deviceId = Long.parseLong(properties[0]);
        this.lat = Double.parseDouble(properties[1]);
        this.lng = Double.parseDouble(properties[2]);
        this.timestamp = Long.parseLong(properties[3]);
    }

    public long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(long deviceId) {
        this.deviceId = deviceId;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

    public int getHourOfDay() {
        return getLocalDateTime().getHour();
    }

    public int getDayOfWeek() {
        return getLocalDateTime().getDayOfWeek().getValue();
    }

    public int getDayOfMonth() {
        return getLocalDateTime().getDayOfMonth();
    }

    private LocalDateTime getLocalDateTime() {
        final Instant instant = Instant.ofEpochMilli(this.timestamp);//TODO Watchout timestamp is not in seconds
        return LocalDateTime.ofInstant(instant, ZoneOffset.UTC);
    }

}
