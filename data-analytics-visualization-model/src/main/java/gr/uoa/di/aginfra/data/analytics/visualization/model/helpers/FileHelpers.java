package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import java.io.*;
import java.util.Arrays;

public class FileHelpers {

	public static boolean isZipFile(String file) {
		return file.endsWith(".zip");
	}

	public static void createDirectory(String dir) throws Exception{
		File tempDir = new File(dir);
		if (!tempDir.exists()) {
			if (!tempDir.mkdir()) {
				throw new Exception("Could not create directory " + dir);
			}
		}
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

	public static String deleteCommentLine(String content, String commentChar) {
		String[] lines = content.split(System.getProperty("line.separator"));
		for(int i=0;i<lines.length;i++){
			if(lines[i].startsWith(commentChar)){
				lines[i]="";
			}
		}
		StringBuilder finalStringBuilder= new StringBuilder("");
		for(String s:lines){
			if(!s.equals("")){
				finalStringBuilder.append(s).append(System.getProperty("line.separator"));
			}
		}
		return finalStringBuilder.toString();
	}
}
