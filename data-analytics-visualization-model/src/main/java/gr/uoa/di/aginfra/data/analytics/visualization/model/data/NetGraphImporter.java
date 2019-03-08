package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import com.fasterxml.jackson.databind.ObjectMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataDocument;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Graph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.NetGraph;
import gr.uoa.di.aginfra.data.analytics.visualization.model.exceptions.InvalidFormatException;

import java.nio.charset.StandardCharsets;

public class NetGraphImporter implements RawDataImporter{
    @Override
    public void importData(byte[] content, DataDocument dataDocument) throws Exception {
        try {
            String stringContent = new String(content, StandardCharsets.UTF_8.name());

            ObjectMapper mapper = new ObjectMapper();

            NetGraph netGraph = mapper.readValue(stringContent, NetGraph.class);

            dataDocument.setNetGraph(netGraph);
        } catch (Exception e) {
            throw new InvalidFormatException("Invalid net graph format provided", e);
        }
    }
}
