package gr.uoa.di.aginfra.data.analytics.visualization.service.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.filters.Filter;

import java.util.Collection;
import java.util.List;

public class VisualizationDto {

    private String id;

    private String label;

    private String description;

    private VisualizationType type;

    private List<VisualizationType> availableTypes;

    private String xAxisLabel;

	private String yAxisLabel;

	private String zAxisLabel;

	private boolean hasColors;

	private boolean hasDocuments;

    private int activeDocuments;

    private List<Parameter> parameters;

    private List<Filter> filters;

    private int sliderSelectedValue;

	private TabularData tabularData;

    private Collection<TimeSeries> timeSeries;

    private BarChartData barChartData;

    private TreeNode tree;

    private Graph graph;

    private MMNode freeMind;

    private ThreeDData threeDData;

    private HeatMapData heatMapData;

	private Collection<Tuple> tuples;

	private String JSON;

    private Visualization inner;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public VisualizationType getType() {
        return type;
    }

    public void setType(VisualizationType type) {
        this.type = type;
    }

    public List<VisualizationType> getAvailableTypes() {
        return availableTypes;
    }

    public void setAvailableTypes(List<VisualizationType> availableTypes) {
        this.availableTypes = availableTypes;
    }

    @JsonProperty("xAxisLabel")
    public String getXAxisLabel() {
		return xAxisLabel;
	}

	public void setXAxisLabel(String xAxisLabel) {
		this.xAxisLabel = xAxisLabel;
	}

    @JsonProperty("yAxisLabel")
    public String getYAxisLabel() {
		return yAxisLabel;
	}

	public void setYAxisLabel(String yAxisLabel) {
		this.yAxisLabel = yAxisLabel;
	}

	@JsonProperty("zAxisLabel")
	public String getZAxisLabel() {
		return zAxisLabel;
	}

	public void setZAxisLabel(String zAxisLabel) {
		this.zAxisLabel = zAxisLabel;
	}

    public HeatMapData getHeatMapData() {
        return heatMapData;
    }

    public void setHeatMapData(HeatMapData heatMapData) {
        this.heatMapData = heatMapData;
    }

    public boolean isHasColors() {
		return hasColors;
	}

	public void setHasColors(boolean hasColors) {
		this.hasColors = hasColors;
	}

	public boolean isHasDocuments() {
		return hasDocuments;
	}

	public void setHasDocuments(boolean hasDocuments) {
		this.hasDocuments = hasDocuments;
	}

	public List<Parameter> getParameters() {
        return parameters;
    }

    public void setParameters(List<Parameter> parameters) {
        this.parameters = parameters;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

	public TabularData getTabularData() {
		return tabularData;
	}

	public void setTabularData(TabularData tabularData) {
		this.tabularData = tabularData;
	}

    public Collection<TimeSeries> getTimeSeries() {
        return timeSeries;
    }

    public void setTimeSeries(Collection<TimeSeries> timeSeries) {
        this.timeSeries = timeSeries;
    }

    public BarChartData getBarChartData() {
        return barChartData;
    }

    public void setBarChartData(BarChartData barChartData) {
        this.barChartData = barChartData;
    }

    public TreeNode getTree() {
        return tree;
    }

    public void setTree(TreeNode tree) {
        this.tree = tree;
    }

    public Graph getGraph() {
        return graph;
    }

    public void setGraph(Graph graph) {
        this.graph = graph;
    }

	public MMNode getFreeMind() {
		return freeMind;
	}

	public void setFreeMind(MMNode freeMind) {
		this.freeMind = freeMind;
	}

    public ThreeDData getThreeDData() {
        return threeDData;
    }

    public void setThreeDData(ThreeDData threeDData) {
        this.threeDData = threeDData;
    }

	public Collection<Tuple> getTuples() {
		return tuples;
	}

	public void setTuples(Collection<Tuple> tuples) {
		this.tuples = tuples;
	}

	public String getJSON() {
		return JSON;
	}

	public void setJSON(String JSON) {
		this.JSON = JSON;
	}

	public Visualization getInner() {
        return inner;
    }

    public void setInner(Visualization inner) {
        this.inner = inner;
    }

    public int getActiveDocuments() {
        return activeDocuments;
    }

    public void setActiveDocuments(int activeDocuments) {
        this.activeDocuments = activeDocuments;
    }

    public String getxAxisLabel() {
        return xAxisLabel;
    }

    public void setxAxisLabel(String xAxisLabel) {
        this.xAxisLabel = xAxisLabel;
    }

    public String getyAxisLabel() {
        return yAxisLabel;
    }

    public void setyAxisLabel(String yAxisLabel) {
        this.yAxisLabel = yAxisLabel;
    }

    public String getzAxisLabel() {
        return zAxisLabel;
    }

    public void setzAxisLabel(String zAxisLabel) {
        this.zAxisLabel = zAxisLabel;
    }

    public int getSliderSelectedValue() {
        return sliderSelectedValue;
    }

    public void setSliderSelectedValue(int sliderSelectedValue) {
        this.sliderSelectedValue = sliderSelectedValue;
    }
}
