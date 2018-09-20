package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import java.io.*;

public class FileHelpers {
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

	public static byte[] readBytesFromFile(String filePath) {

		FileInputStream fileInputStream = null;
		byte[] bytesArray = null;

		try {
			File file = new File(filePath);
			bytesArray = new byte[(int) file.length()];

			//read file into bytes[]
			fileInputStream = new FileInputStream(file);
			fileInputStream.read(bytesArray);

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return bytesArray;
	}
}
