package gr.uoa.di.aginfra.data.analytics.visualization.model.definitions;

import java.util.HashMap;
import java.util.Map;

public enum DataType {
	Records,
	Tree,
	Graph,
	FreeMind,
	Image,
	JSON;

	private static Map<VisualizationType, DataType> visualizationTypeDataTypeMap;

	private static void initializeMap() {
		visualizationTypeDataTypeMap = new HashMap<>();
		visualizationTypeDataTypeMap.put(VisualizationType.Graph, DataType.Graph);
		visualizationTypeDataTypeMap.put(VisualizationType.Tree, DataType.Tree);
		visualizationTypeDataTypeMap.put(VisualizationType.MindMap, DataType.FreeMind);
		visualizationTypeDataTypeMap.put(VisualizationType.Line, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Scatter, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Spline, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Step, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Pie, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Doughnut, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Polar, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Bar, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.ThreeD, DataType.Records);
		visualizationTypeDataTypeMap.put(VisualizationType.Map, DataType.JSON);
		visualizationTypeDataTypeMap.put(VisualizationType.WorldWindMap, DataType.JSON);
		visualizationTypeDataTypeMap.put(VisualizationType.Table, DataType.Records);
	}

	public static DataType of(VisualizationType visualizationType) {
		if (visualizationTypeDataTypeMap == null) {
			initializeMap();
		}
		return visualizationTypeDataTypeMap.get(visualizationType);
	}
}
