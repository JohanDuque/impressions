package impressions.dao;

import impressions.model.Impression;
import org.junit.Test;

import java.io.IOException;
import java.io.Reader;
import java.io.UncheckedIOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Random;

import static org.junit.Assert.*;

public class ImpressionDaoCsvTest {

    private static final int TOTAL_RECORDS = 100000;

    @Test
    public void itShouldReadHeader(){
        ImpressionDaoCsv dao = getCsvDao();
        final List<String> header = dao.readHeader();
        assertFalse(header.isEmpty());
    }

    @Test
    public void itShouldReadRecords() {
        ImpressionDaoCsv dao = getCsvDao();
        List<List<String>> records = dao.getAllRecords();
        assertFalse(records.isEmpty());
    }

    @Test
    public void itShouldReadAll_100000_Records() {
        ImpressionDaoCsv dao = getCsvDao();
        List<List<String>> records = dao.getAllRecords();
        assertEquals(TOTAL_RECORDS, records.size());
    }

    @Test
    public void itShouldGetAll_100000_Impressions() {
        ImpressionDaoCsv dao = getCsvDao();
        List<Impression> records = dao.getAll();
        assertEquals(TOTAL_RECORDS, records.size());
    }

    @Test
    public void itShouldGetNotNullImpressions() {
        ImpressionDaoCsv dao = getCsvDao();
        List<Impression> records = dao.getAll();
        int randValue = new Random().nextInt(TOTAL_RECORDS);
        assertNotNull(records.get(randValue));
    }

    private ImpressionDaoCsv getCsvDao() {
        try {
            Path path = Paths.get("src/main/resources", "dataset.csv");
            Reader reader = Files.newBufferedReader(
                    path, Charset.forName("UTF-8"));
            return new ImpressionDaoCsv(reader);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
