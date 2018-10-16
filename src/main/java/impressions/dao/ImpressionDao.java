package impressions.dao;

import impressions.model.Impression;

import java.util.List;

public interface ImpressionDao {
    public List<Impression> getAllByDevice(long deviceId);

    List<Impression> getAll();
}
