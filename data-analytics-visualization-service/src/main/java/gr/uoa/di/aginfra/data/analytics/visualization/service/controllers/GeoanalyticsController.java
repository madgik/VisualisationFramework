package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;



@RequestMapping("/" + GeoanalyticsController.GEOANALYTICS_BASE_PATH)
public class GeoanalyticsController extends BaseController {

    protected static final String GEOANALYTICS_BASE_PATH = "geoanalytics";
    private static final ObjectMapper mapper = new ObjectMapper();


    @RequestMapping(value = "/layers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getGeoanalyticsLayers(RequestEntity requestEntity){

        System.out.println("I'm finally been called");

        return new ResponseEntity<String>("Something",HttpStatus.OK);
    }
}
