package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ImagesWithCSVFunctions {

    private static final Logger logger = LogManager.getLogger(ImagesWithCSVFunctions.class);


    public static Map<String, String> storeImages(String zipFilePath, DataDocumentRepository dataDocumentDAO, String vre) throws Exception {

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
                dataDocument.setRawBytes( convertImageToBytes(file));
                String id = dataDocumentDAO.store(dataDocument);
                map.put(dataDocument.getName(), id);
            }

        }
        return map;
    }

    public static String getCSVFile(String zipFilePath){
        File[] files = new File(zipFilePath).listFiles();
        Map<String, String> map = new HashMap<String, String>();

        for (File file : files) {
            if (!file.isDirectory() && file.getName().endsWith(".csv")) {
                return file.getPath();
            }
        }
        return  null;
    }

    public static String unzip(byte[] bytes, String destDir) throws IOException
    {
        String uuid = UUID.randomUUID().toString();
        String newDir = destDir + File.separator + uuid;
        File file = new File(newDir);
        if (!file.exists()) {
            if (file.mkdir()) {
                logger.info("Directory is created!");
            } else {
                logger.info("Failed to create directory!");
            }
        }

        ZipInputStream zipStream = new ZipInputStream(new ByteArrayInputStream(bytes));
        ZipEntry entry = null;
        while ((entry = zipStream.getNextEntry()) != null) {

            String entryName = entry.getName();

            String[] split = entryName.split("/");
            if (split.length != 1) {

                entryName = split[1];
                FileOutputStream out = new FileOutputStream(newDir + File.separator + entryName);

                byte[] byteBuff = new byte[4096];
                int bytesRead = 0;
                while ((bytesRead = zipStream.read(byteBuff)) != -1) {
                    out.write(byteBuff, 0, bytesRead);
                }

                out.close();
                zipStream.closeEntry();
            }
        }
        zipStream.close();

        return newDir;
    }

    public static byte[] convertImageToBytes(File file) throws FileNotFoundException {
        FileInputStream fis = new FileInputStream(file);
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[1024];
        try {
            for (int readNum; (readNum = fis.read(buf)) != -1;) {
                bos.write(buf, 0, readNum);
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        byte[] bytes = bos.toByteArray();

        return bytes;
    }

}
