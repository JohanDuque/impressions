package impressions.dao;

import impressions.model.Impression;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.UncheckedIOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<List<String>> getAll() {
        try (BufferedReader reader = new BufferedReader(source)) {
            reader.readLine();// I'm skipping the header line, kind of a workaround!
            return reader.lines()
                    .map(line -> Arrays.asList(line.split(SEPARATOR)))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
