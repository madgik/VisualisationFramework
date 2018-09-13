package gr.uoa.di.aginfra.data.analytics.visualization.model.helpers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import org.bson.types.ObjectId;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class VisualizationMapper {

	private ModelMapper modelMapper;

	public static Converter<ObjectId, String> objectIdToStringConverter = new Converter<ObjectId, String>() {
		@Override
		public String convert(MappingContext<ObjectId, String> mappingContext) {
			if (mappingContext.getSource() != null) {
				return mappingContext.getSource().toHexString();
			}
			return null;
		}
	};

	public static Converter<String, ObjectId> stringToObjectIdConverter = new Converter<String, ObjectId>() {
		@Override
		public ObjectId convert(MappingContext<String, ObjectId> mappingContext) {
			if (mappingContext.getSource() != null) {
				return new ObjectId(mappingContext.getSource());
			}
			return null;
		}
	};

	@Autowired
	public VisualizationMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
		this.modelMapper.addConverter(objectIdToStringConverter);
		this.modelMapper.addConverter(stringToObjectIdConverter);
	}

	public Visualization map(Configuration entity) {
		return this.modelMapper.map(entity, Visualization.class);
	}
}
