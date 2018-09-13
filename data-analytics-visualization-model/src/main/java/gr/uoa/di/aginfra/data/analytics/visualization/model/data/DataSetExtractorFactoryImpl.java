package gr.uoa.di.aginfra.data.analytics.visualization.model.data;

import gr.uoa.di.aginfra.data.analytics.visualization.model.repositories.DataDocumentRepository;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class DataSetExtractorFactoryImpl implements DataSetExtractorFactory {

	private ApplicationContext appContext;

	@Autowired
	public DataSetExtractorFactoryImpl(ApplicationContext appContext) {
		this.appContext = appContext;
	}

	@Override
	public DataSetExtractor getExtractor(DataSource dataSource) {
		switch (dataSource.getType()) {
			case CSV: return new CSVExtractor();
			case IMPORTED: return new MongoDBExtractor(appContext.getBean(DataDocumentRepository.class));
			default: throw new UnsupportedOperationException();
		}
	}
}
