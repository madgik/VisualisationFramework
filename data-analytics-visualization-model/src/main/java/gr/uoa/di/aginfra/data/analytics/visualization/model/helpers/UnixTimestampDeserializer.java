package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.util.Date;

public class UnixTimestampDeserializer extends JsonDeserializer<Date> {

	@Override
	public Date deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		String timestamp = jp.getText().trim();

		try {
			return new Date(Long.valueOf(timestamp));
		} catch (NumberFormatException e) {
			throw new IOException(e.getMessage(), e);
		}
	}
}