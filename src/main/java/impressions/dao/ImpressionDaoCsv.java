package impressions.dao;

import impressions.model.Impression;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.UncheckedIOException;
import java.util.Arrays;
import java.util.List;

public class ImpressionDaoCsv implements ImpressionDao {

    private static final String SEPARATOR = ",";
    private final Reader source;

    ImpressionDaoCsv(Reader source) {
        this.source = source;
    }

    List<String> readHeader() {
        try (BufferedReader reader = new BufferedReader(source)) {
            return reader.lines()
                    .findFirst()
                    .map(line -> Arrays.asList(line.split(SEPARATOR)))
                    .get();
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    @Override
    public List<Impression> getAllByDevice(long deviceId) {
        return null;
    }
}
