package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.VisualizationType;

import java.util.HashMap;
import java.util.Map;

public enum VisualizationDataType {
	BarChart,
	TimeSeries,
	Tuples,
	ThreeD,
	Tree,
	Graph,
	FreeMind,
	Map,
	Tabular,
	HeatMap;

	private static Map<VisualizationType, VisualizationDataType> visualizationTypeDataTypeMap;

	private static void initializeMap() {
		visualizationTypeDataTypeMap = new HashMap<>();
		visualizationTypeDataTypeMap.put(VisualizationType.Line, VisualizationDataType.TimeSeries);
		visualizationTypeDataTypeMap.put(VisualizationType.Scatter, VisualizationDataType.TimeSeries);
		visualizationTypeDataTypeMap.put(VisualizationType.Spline, VisualizationDataType.TimeSeries);
		visualizationTypeDataTypeMap.put(VisualizationType.Step, VisualizationDataType.TimeSeries);
		visualizationTypeDataTypeMap.put(VisualizationType.Pie, VisualizationDataType.Tuples);
		visualizationTypeDataTypeMap.put(VisualizationType.HeatMap, VisualizationDataType.HeatMap);

		visualizationTypeDataTypeMap.put(VisualizationType.Doughnut, VisualizationDataType.Tuples);
		visualizationTypeDataTypeMap.put(VisualizationType.Polar, VisualizationDataType.Tuples);
		visualizationTypeDataTypeMap.put(VisualizationType.Bar, VisualizationDataType.BarChart);
		visualizationTypeDataTypeMap.put(VisualizationType.ThreeD, VisualizationDataType.ThreeD);
		visualizationTypeDataTypeMap.put(VisualizationType.Graph, VisualizationDataType.Graph);
		visualizationTypeDataTypeMap.put(VisualizationType.Tree, VisualizationDataType.Tree);
		visualizationTypeDataTypeMap.put(VisualizationType.MindMap, VisualizationDataType.FreeMind);
		visualizationTypeDataTypeMap.put(VisualizationType.Map, VisualizationDataType.Map);
		visualizationTypeDataTypeMap.put(VisualizationType.WorldWindMap, VisualizationDataType.Map);
		visualizationTypeDataTypeMap.put(VisualizationType.Table, VisualizationDataType.Tabular);
	}

	public static VisualizationDataType of(VisualizationType visualizationType) {
		if (visualizationTypeDataTypeMap == null) {
			initializeMap();
		}
		return visualizationTypeDataTypeMap.get(visualizationType);
	}
}
