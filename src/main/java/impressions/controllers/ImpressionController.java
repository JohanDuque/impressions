package impressions.controllers;

import impressions.models.Impression;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ImpressionController {

        private static final String template = "Hello, %s!";

        @RequestMapping("/impressions")
        public Impression impression(@RequestParam(value="id", defaultValue="Banana") String id) {
            return new Impression();
        }
}
