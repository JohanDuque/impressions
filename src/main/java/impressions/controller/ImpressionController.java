package impressions.controller;

import impressions.dao.ImpressionDao;
import impressions.model.Impression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/")
public class ImpressionController {

    @Autowired
    ImpressionDao dao;

    @RequestMapping("impressions/mock")
    public Impression impression(@RequestParam(value="id", defaultValue="Banana") String id) {
        return new Impression();
    }

    @RequestMapping("/impressions/from-each-device")
    public Map<Long, Long> fromEachDevice() {
        return dao.countImpressionsFromDevices();
    }

    @RequestMapping("/impressions/for-each-hour")
    public Map<Integer, Long> forEachDayHour() {
        return dao.countImpressionsForHours();
    }
}
