package impressions.model;

import java.util.Calendar;

public class Impression {

    private long deviceId;
    private double lat;
    private double lng;
    private long timestamp;

    public Impression() {
        this.deviceId = 33;
        this.lat=32.56;
        this.lng=14.56;
        this.timestamp= Calendar.getInstance().getTimeInMillis();//TODO remove, only for testing purposes
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
}
