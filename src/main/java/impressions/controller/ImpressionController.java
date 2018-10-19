package impressions.controller;

import impressions.dao.ImpressionDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/")
public class ImpressionController {

    @Autowired
    ImpressionDao dao;

    @RequestMapping("/impressions/from-each-device")
    public Map<Long, Long> fromEachDevice() {
        return dao.countImpressionsFromDevices();
    }

    @RequestMapping("/impressions/for-each-hour")
    public Map<Integer, Long> forEachDayHour() {
        return dao.countImpressionsForHours();
    }
}
