package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.FileHelpers;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.PropertiesConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.ZipHelpers;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class JsonImporter implements RawDataImporter {

    private PropertiesConfig.ApiConfigTemplate config;
    private static final Logger logger = LogManager.getLogger(JsonImporter.class);
    private static final ObjectMapper mapper = new ObjectMapper();

    private DataDocumentRepository dataDocumentDAO;

    public JsonImporter(PropertiesConfig.ApiConfigTemplate config,
                       DataDocumentRepository dataDocumentDAO) {
        this.config = config;
        this.dataDocumentDAO = dataDocumentDAO;
    }

    public JsonImporter(DataDocumentRepository dataDocumentDAO) {
        this.config = null;
        this.dataDocumentDAO = dataDocumentDAO;
    }


    @Override
	public void importData(byte[] content, DataDocument dataDocument) throws Exception {

        if (FileHelpers.isZipFile(dataDocument.getName())) {
            importZipWithDocuments(content, dataDocument);
        } else {
            importPlainJson(content, dataDocument);
        }

	}


    public void importZipWithDocuments(byte[] content, DataDocument dataDocument) throws Exception {

        final String tempDirectory = config.getTempDirectory();

        logger.info("Creating directory: " + tempDirectory);
        FileHelpers.createDirectory(tempDirectory);
        logger.info("unzip");

        String unzipedDirectory = ZipHelpers.unzip(content, tempDirectory);
        logger.info("Store images");

        Map<String, String> imagesWithIds = storeImages(unzipedDirectory, dataDocument.getVre());
        File JsonFile = new File(ZipHelpers.getJsonFile(unzipedDirectory));
        logger.info("Json changes");
    }

    public void importPlainJson(byte[] content, DataDocument dataDocument) throws Exception {
        String stringContent = new String(content, StandardCharsets.UTF_8.name());
        List<Map<String, String>> data = mapper.readValue(stringContent, new TypeReference<List<Map<String, String>>>(){});
        List<String> fields = new ArrayList<>();
        if(data.size() > 0) {
            fields = data.get(0).entrySet().stream()
                    .map( d ->  d.getKey())
                    .collect(Collectors.toList());
        }

        dataDocument.setRecords(data);
        dataDocument.setFields(fields);

//        dataDocument.setJSON(stringContent);
    }


    private Map<String, String> storeImages(String zipFilePath, String vre) throws Exception {

        File[] files = new File(zipFilePath).listFiles();
        Map<String, String> map = new HashMap<String, String>();

        for (File file : files) {
            if (!file.isDirectory() && file.getName().endsWith(".png")) {
                DataDocument dataDocument = new DataDocument();
                dataDocument.setVre(vre);
                dataDocument.setName(file.getName());
                dataDocument.setType(DataType.Image);
                dataDocument.setDataReference(true);
                dataDocument.setCreatedAt(new Date());
                dataDocument.setUpdatedAt(new Date());
                dataDocument.setRawBytes(FileHelpers.convertImageToBytes(file));
                String id = dataDocumentDAO.store(dataDocument);
                map.put(dataDocument.getName(), id);
            }
        }
        return map;
    }


}
