package impressions.dao;

import impressions.model.Impression;

import java.util.List;
import java.util.Map;

public interface ImpressionDao {

    Map<Long, List<Impression>> getImpressionsFromDevices();

    Map<Long, Long> countImpressionsFromDevices();

    Map<Integer, List<Impression>> getImpressionsForHours();

    Map<Integer, Long> countImpressionsForHours();
}
