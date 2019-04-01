package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.ConfigurationService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.DataDocumentMetadata;
import gr.uoa.di.aginfra.data.analytics.visualization.service.vres.VREResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
@CrossOrigin(exposedHeaders = "Location")
@RequestMapping("/" + DataDocumentController.DATA_DOCUMENT_BASE_PATH)
public class DataDocumentController extends BaseController {

	protected static final String DATA_DOCUMENT_BASE_PATH = "dataDocuments";

	private ConfigurationService configurationService;

	private VREResolver vreResolver;

	@Autowired
	public DataDocumentController(ConfigurationService configurationService,
								  VREResolver vreResolver) {
		this.configurationService = configurationService;
		this.vreResolver = vreResolver;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<DataDocument> get(@PathVariable("id") String id) throws Exception {

		DataDocument entity = configurationService.getDataDocument(id);

		if (entity == null) return ResponseEntity.notFound().build();

		return ResponseEntity.ok(entity);
	}

	@RequestMapping(value = "/{id}/metadata", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<DataDocumentMetadata> getMetadata(@PathVariable("id") String id) throws Exception {

		DataDocumentMetadata entity = configurationService.getDataDocumentMetadata(id);

		if (entity == null) return ResponseEntity.notFound().build();

		return ResponseEntity.ok(entity);
	}

	@RequestMapping(value = "/{id}/data", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
	public ResponseEntity<byte[]> getData(@PathVariable("id") String id) throws Exception {

		DataDocument entity = configurationService.getDataDocument(id);

		if (entity == null) return ResponseEntity.notFound().build();

		return ResponseEntity.ok(entity.getRawBytes());
	}

	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> post(@RequestParam("file") MultipartFile[] file,
									   String name,
									   DataType type,
									   Boolean isDataReference) throws Exception {


		String id = configurationService.storeDataDocument(
				vreResolver.resolve(),
				name,
				type,
				isDataReference != null ? isDataReference.booleanValue() : false,
				file[0].getBytes());

		UriComponents uriComponents = UriComponentsBuilder.newInstance()
				.path(DATA_DOCUMENT_BASE_PATH + "/{id}")
				.buildAndExpand(id);

		return ResponseEntity.created(uriComponents.toUri()).body(id);
	}
}
