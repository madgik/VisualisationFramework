package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class ZipHelpers {

	private static final Logger logger = LogManager.getLogger(ZipHelpers.class);

	public static String getCSVFile(String zipFilePath){
		File[] files = new File(zipFilePath).listFiles();

		for (File file : files) {
			if (!file.isDirectory() && file.getName().endsWith(".csv")) {
				return file.getPath();
			}
		}
		return  null;
	}

	public static String getJsonFile(String zipFilePath){
		File[] files = new File(zipFilePath).listFiles();

		for (File file : files) {
			if (!file.isDirectory() && file.getName().endsWith(".json")) {
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
}
