package impressions.dao;

import org.junit.Test;

import java.io.IOException;
import java.io.Reader;
import java.io.UncheckedIOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static org.junit.Assert.assertFalse;

public class ImpressionDaoCsvTest {

    @Test
    public void itShouldReadHeader(){
        ImpressionDaoCsv dao = getCsvDao();
        final List<String> header = dao.readHeader();
        assertFalse(header.isEmpty());
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
