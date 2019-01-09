package gr.uoa.di.aginfra.data.analytics.visualization.model.services;

import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.ConfigurationRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.DataSetExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.data.DataSetExtractorFactory;
import gr.uoa.di.aginfra.data.analytics.visualization.model.stats.UsageStatsService;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.helpers.VisualizationMapper;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.*;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators.VisualizationDataGenerator;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.generators.VisualizationDataGeneratorFactory;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.operations.JoinExecutor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class VisualizationServiceImpl implements VisualizationService {

	private ConfigurationRepository configurationDAO;

	private VisualizationMapper visualizationMapper;

	private DataSetExtractorFactory dataSetExtractorFactory;

	private JoinExecutor joinExecutor;

	private VisualizationDataGeneratorFactory visualizationDataGeneratorFactory;

	private UsageStatsService usageService;


	@Autowired
	public VisualizationServiceImpl(ConfigurationRepository configurationDAO,
									VisualizationMapper visualizationMapper,
									DataSetExtractorFactory dataSetExtractorFactory,
									JoinExecutor joinExecutor,
									VisualizationDataGeneratorFactory visualizationDataGeneratorFactory,
									UsageStatsService usageService) {
		this.configurationDAO = configurationDAO;
		this.visualizationMapper = visualizationMapper;
		this.dataSetExtractorFactory = dataSetExtractorFactory;
		this.joinExecutor = joinExecutor;
		this.visualizationDataGeneratorFactory = visualizationDataGeneratorFactory;
		this.usageService = usageService;
	}

	public Visualization getVisualization(String id) throws Exception {
		return getVisualization(id, null);
	}

	public Visualization getVisualization(String id, Map<String, String> filters) throws Exception {
		Configuration configuration = configurationDAO.getById(id);

		if (configuration == null) return null;

		Visualization visualization = visualizationMapper.map(configuration);

		visualization.setHasColors(configuration.getColorField() != null && configuration.getColorField().length() > 0);

		visualization.setHasDocuments(configuration.getDocumentField() != null && configuration.getDocumentField().length() > 0);

		loadDataSet(configuration, visualization, filters);

		usageService.visualizationVisited("dev", "devel", id);

		return visualization;
	}

	private void loadDataSet(Configuration configuration,
							 Visualization visualization,
							 Map<String, String> filters) throws Exception {

		VisualizationDataType dataType = VisualizationDataType.of(visualization.getType());

		DataSet dataSet = extract(configuration, dataType);

		VisualizationDataGenerator generator = visualizationDataGeneratorFactory.getGenerator(dataType);
		generator.generateData(visualization, configuration, dataSet, filters);
	}

	private DataSet extract(Configuration configuration, VisualizationDataType dataType) throws Exception {

		if (configuration.getDataSources().size() == 1) {
			DataSource dataSource = configuration.getDataSources().get(0);

			DataSetExtractor dataSetExtractor = dataSetExtractorFactory.getExtractor(dataSource);

			return dataSetExtractor.extract(dataSource, dataType);
		} else {
			return joinExecutor.execute(configuration.getDataSources(), configuration.getJoins(), dataType);
		}
	}
}
