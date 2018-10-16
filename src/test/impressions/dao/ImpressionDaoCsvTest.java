package impressions.dao;

import impressions.model.Impression;
import org.junit.Test;

import java.util.List;
import java.util.Random;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class ImpressionDaoCsvTest {

    private static final int TOTAL_RECORDS = 100000;

    @Test
    public void itShouldGetAll_100000_Impressions() {
        ImpressionDaoCsv dao = new ImpressionDaoCsv();
        List<Impression> records = dao.getAll();
        assertEquals(TOTAL_RECORDS, records.size());
    }

    @Test
    public void itShouldGetNotNullImpressions() {
        ImpressionDaoCsv dao = new ImpressionDaoCsv();
        List<Impression> records = dao.getAll();
        int randValue = new Random().nextInt(TOTAL_RECORDS);
        assertNotNull(records.get(randValue));
    }

}
