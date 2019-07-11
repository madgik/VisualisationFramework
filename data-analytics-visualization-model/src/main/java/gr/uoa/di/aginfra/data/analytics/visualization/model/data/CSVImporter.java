package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.UnpivotStructure;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.ConfigurationServiceImpl;
import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.DirectoryNotEmptyException;
import java.nio.file.NoSuchFileException;
import java.util.*;
import java.util.stream.Collectors;

public class CSVImporter implements RawDataImporter {

    private PropertiesConfig.ApiConfigTemplate config;
    private static final Logger logger = LogManager.getLogger(CSVImporter.class);


    private DataDocumentRepository dataDocumentDAO;

    public CSVImporter(PropertiesConfig.ApiConfigTemplate config,
                       DataDocumentRepository dataDocumentDAO) {
        this.config = config;
        this.dataDocumentDAO = dataDocumentDAO;
    }

    public CSVImporter(DataDocumentRepository dataDocumentDAO) {
        this.config = null;
        this.dataDocumentDAO = dataDocumentDAO;
    }

    @Override
    public void importData(byte[] content, DataDocument dataDocument) throws Exception {
        if (FileHelpers.isZipFile(dataDocument.getName())) {
            importZipWithDocuments(content, dataDocument);
        } else {
            importPlainCSV(content, dataDocument);
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
        File csvFile = new File(ZipHelpers.getCSVFile(unzipedDirectory));
        logger.info("csv changes");

        String[][] csv;
        try {
            csv = CSVReader.readCSV(new String(FileHelpers.readBytesFromFile(csvFile.getPath()), StandardCharsets.UTF_8.name()));
            dataDocument.setName(csvFile.getName());
        } catch (Exception e) {
            throw new InvalidFormatException("Invalid csv format provided", e);
        }

        if (csv.length < 2) throw new Exception("No records found in csv file");

        dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

        List<Map<String, String>> list = new ArrayList<>();
        for (int i = 1; i < csv.length; i++) {
            Map<String, String> item = new HashMap<>();
            for (int j = 0; j < dataDocument.getFields().size(); j++) {
                String f = dataDocument.getFields().get(j);
                if (csv[i].length > j) {
                    if (imagesWithIds.containsKey(csv[i][j]))
                        item.put(f, imagesWithIds.get(csv[i][j]));
                    else
                        item.put(f, csv[i][j]);
                } else item.put(f, null);
            }
            list.add(item);
        }

        dataDocument.setRecords(list);
        logger.info("delete directory");

        File filesDir = new File(unzipedDirectory);
        try {
            FileUtils.deleteDirectory(filesDir);
        } catch (NoSuchFileException x) {
            logger.info("%s: no such" + " file or directory%n", x);
        } catch (DirectoryNotEmptyException x) {
            logger.info("%s not empty%n", x);
        } catch (IOException x) {
            // File permission problems are caught here.
            logger.info(x);
        }

    }

    public void importPlainCSV(byte[] content, DataDocument dataDocument) throws Exception {


        String[][] csv;
        try {
            String temp = new String(content, StandardCharsets.UTF_8.name());

            csv = CSVReader.readCSV(temp.replace(dataDocument.getDelimiter(),","));
        } catch (Exception e) {
            throw new InvalidFormatException("Invalid csv format provided", e);
        }

        if (csv.length < 2) throw new Exception("No records found in csv file");

        dataDocument.setFields(new ArrayList<String>(Arrays.stream(csv[0]).collect(Collectors.toList())));

        List<Map<String, String>> list = new ArrayList<>();
        for (int i = 1; i < csv.length; i++) {
            Map<String, String> item = new HashMap<>();
            for (int j = 0; j < dataDocument.getFields().size(); j++) {
                String f = dataDocument.getFields().get(j);
                if (csv[i].length > j) {
                    item.put(f, csv[i][j]);
                } else item.put(f, null);
            }
            list.add(item);
        }

        dataDocument.setRecords(list);
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
