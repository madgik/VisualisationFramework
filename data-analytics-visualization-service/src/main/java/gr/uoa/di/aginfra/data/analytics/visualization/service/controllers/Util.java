package gr.uoa.di.aginfra.data.analytics.visualization.service.controllers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataType;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import javax.validation.constraints.NotNull;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.util.UUID;

public class Util {
    private File dataSet;
    private DataType dataType;

    public Util(){}

    public Util(File dataSet, DataType dataType) {
        this.dataSet = dataSet;
        this.dataType = dataType;
    }

    public File getDataSet() { return dataSet; }

    public void setDataSet(File dataSet) { this.dataSet = dataSet; }

    public DataType getDataType() { return dataType; }

    public void setDataType(DataType dataType) { this.dataType = dataType; }

    public Util downloadFileFromURL(@NotNull String fileUrl) throws IOException {

        // Create a new trust manager that trust all certificates
        TrustManager[] trustAllCerts = new TrustManager[]{
                new X509TrustManager() {
                    public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                        return null;
                    }
                    public void checkClientTrusted(
                            java.security.cert.X509Certificate[] certs, String authType) {
                    }
                    public void checkServerTrusted(
                            java.security.cert.X509Certificate[] certs, String authType) {
                    }
                }
        };

        // Activate the new trust manager
        try {
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        } catch (Exception e) {
            e = e;
        }

        URL url = new URL(fileUrl);
        URLConnection con = url.openConnection();

        String contentType = con.getContentType();
        String fieldValue = con.getHeaderField("Content-Disposition");
        String filename = null;
        if (fieldValue == null || ! fieldValue.contains("filename=\"")) {
            // no file name there -> throw exception ...
            filename = UUID.randomUUID().toString();
        } else {
            filename = fieldValue.substring(fieldValue.indexOf("filename=\"") + 10, fieldValue.length() - 1);
        }
// parse the file name from the header field

// create file in systems temporary directory
        File f = File.createTempFile(filename,null);
        f.deleteOnExit();

// open the stream and download
        ReadableByteChannel rbc = Channels.newChannel(con.getInputStream());
        FileOutputStream fos = new FileOutputStream(f);
        try {
            fos.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);
        } catch(Exception e) {
            e.printStackTrace();
        }
        finally {
            fos.close();
        }

        return new Util(f,this.getDataTypeByFilename(contentType, fieldValue));
    }

    private DataType getDataTypeByFilename(String contentype, String contentDisposition) {
        if(contentype != null){
            if(contentype.contains("json")){
                return DataType.JSON;
            }
            if(contentype.contains("csv")){
                return DataType.Records;
            }
        }
        if(contentDisposition != null){
            if(contentDisposition.contains("json")){
                return DataType.JSON;
            }
            if(contentDisposition.contains("csv")){
                return DataType.Records;
            }
        }

        return null;
    }
}
