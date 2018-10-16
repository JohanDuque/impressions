package impressions.dao;

import impressions.model.Impression;
import org.junit.Test;

import java.util.List;
import java.util.Random;
import java.util.Set;

import static org.junit.Assert.*;

public class ImpressionDaoCsvTest {

    private static final int TOTAL_RECORDS = 100000;

    @Test
    public void itShouldGetAll_100000_Impressions() {
        ImpressionDaoCsv dao = new ImpressionDaoCsv();
        List<Impression> impressions = dao.getAll();
        assertEquals(TOTAL_RECORDS, impressions.size());
    }

    @Test
    public void itShouldGetNotNullImpressions() {
        ImpressionDaoCsv dao = new ImpressionDaoCsv();
        List<Impression> impressions = dao.getAll();
        int randValue = new Random().nextInt(TOTAL_RECORDS);
        assertNotNull(impressions.get(randValue));
    }

    @Test
    public void itShouldReturnAnyImpressionById() {
        ImpressionDaoCsv dao = new ImpressionDaoCsv();
        List<Impression> impressions = dao.getAllByDeviceId(8088);
        assertFalse(impressions.isEmpty());
    }

    @Test
    public void itShouldReturnDistinctsDeviceIds() {
        ImpressionDaoCsv dao = new ImpressionDaoCsv();
        Set<Long> devicesIds = dao.getAllDevicesIds();
        assertFalse(devicesIds.isEmpty());
    }
}
