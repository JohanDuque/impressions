package impressions.dao;

import impressions.model.Impression;

import java.util.List;

public interface ImpressionDao {

    List<Impression> getAll();

    public List<Impression> getAllByDeviceId(long deviceId);

}
