package gr.uoa.di.aginfra.data.analytics.visualization.service.mappers;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Edge;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.NetworkGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.netgraph.Node;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.Visualization;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.ConfigurationDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.netgraph.NetworkGraphDto;
import gr.uoa.di.aginfra.data.analytics.visualization.service.dtos.VisualizationDto;
import org.bson.types.ObjectId;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.spi.MappingContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    public NetworkGraph map(NetworkGraphDto dto, String graphName, String tenantName, String privacy) {

        UUID uuid = UUID.randomUUID();
        String graphId = uuid.toString();

        Map<String, Node> nodeMap = dto.getNodes().stream().map(node ->
                new Node(node.getId(), node.getX(), node.getY(), node.getAttributes(), graphId, graphName, tenantName, privacy)
        ).collect(Collectors.toMap(Node::getNodeId, Function.identity()));


        List<Edge> edges = dto.getEdges().stream().map(edge ->
                new Edge(edge.getId(), nodeMap.get(edge.getSource()), nodeMap.get(edge.getTarget()), edge.getAtributes(),  graphId, graphName, tenantName)
        ).collect(Collectors.toList());

        NetworkGraph networkGraph = new NetworkGraph(nodeMap, edges);
        return networkGraph;
    }
}
