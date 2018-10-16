package impressions.dao;

import impressions.model.Impression;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public class ImpressionDaoCsv implements ImpressionDao {

    private static final String SEPARATOR = ",";
    private static final String RESOURCES_PATH = "src/main/resources";
    private static final String FILE_NAME = "dataset.csv";

    @Override
    public List<Impression> getAll() {
        try (BufferedReader reader = getFileReader()) {
            reader.readLine();// I'm skipping the header line.
            return reader.lines()
                    .map(line -> new Impression(line.split(SEPARATOR)))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    @Override
    public List<Impression> getAllByDevice(long deviceId) {
        return null;
    }


    private BufferedReader getFileReader() {
        Path path = Paths.get(RESOURCES_PATH, FILE_NAME);
        try {
            return Files.newBufferedReader(path, Charset.forName("UTF-8"));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

}
