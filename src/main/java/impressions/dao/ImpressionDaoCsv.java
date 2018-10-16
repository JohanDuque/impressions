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
import java.util.Set;
import java.util.stream.Collectors;

public class ImpressionDaoCsv implements ImpressionDao {

    private static final String SEPARATOR = ",";
    private static final String RESOURCES_PATH = "src/main/resources";
    private static final String FILE_NAME = "dataset.csv";

    @Override
    public List<Impression> getAll() {
        return getFileReader().lines()
                .map(line -> new Impression(line.split(SEPARATOR)))
                .collect(Collectors.toList());
    }

    @Override
    public List<Impression> getAllByDeviceId(long deviceId) {
        return getFileReader().lines()
                .map(line -> new Impression(line.split(SEPARATOR)))
                .filter(impression -> impression.getDeviceId() == deviceId)
                .collect(Collectors.toList());
    }

    Set<Long> getAllDevicesIds() {
        return getFileReader().lines()
                .map(line -> Long.parseLong(line.split(SEPARATOR)[0]))
                .collect(Collectors.toSet());
    }

    private BufferedReader getFileReader() {
        Path path = Paths.get(RESOURCES_PATH, FILE_NAME);
        try {
            BufferedReader reader = Files.newBufferedReader(path, Charset.forName("UTF-8"));
            reader.readLine();// I'm skipping the header line.
            return reader;
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

}
