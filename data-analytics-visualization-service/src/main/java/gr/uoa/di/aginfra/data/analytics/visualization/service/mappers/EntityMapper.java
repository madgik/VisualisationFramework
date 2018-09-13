package gr.uoa.di.aginfra.data.analytics.visualization.service.mappers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.ConfigurationDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.VisualizationDto;
import org.bson.types.ObjectId;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EntityMapper {

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
	public EntityMapper(ModelMapper modelMapper) {
		this.modelMapper = modelMapper;
		this.modelMapper.addConverter(objectIdToStringConverter);
		this.modelMapper.addConverter(stringToObjectIdConverter);
	}

	public ConfigurationDto map(Configuration entity) {
		return this.modelMapper.map(entity, ConfigurationDto.class);
	}

	public Configuration map(ConfigurationDto dto) {
		return this.modelMapper.map(dto, Configuration.class);
	}

	public VisualizationDto map(Visualization entity) {
		return this.modelMapper.map(entity, VisualizationDto.class);
	}

	public Visualization map(VisualizationDto dto) {
		return this.modelMapper.map(dto, Visualization.class);
	}
}
