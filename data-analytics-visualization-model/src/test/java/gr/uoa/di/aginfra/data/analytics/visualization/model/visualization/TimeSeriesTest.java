package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization;

import gr.uoa.di.aginfra.data.analytics.visualization.model.config.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Configuration;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.TimeSeries;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.TimeSeriesExtractor;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.extractors.TimeSeriesExtractorImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.hamcrest.CoreMatchers.instanceOf;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class TimeSeriesTest {

	//DI
	@Autowired
	TimeSeriesExtractor timeSeriesExtractor;

	@Test
	public void test_timeseries_di_creates_default_impl() {

		//assert correct type/impl
		Assert.assertThat(timeSeriesExtractor, instanceOf(TimeSeriesExtractorImpl.class));
	}

	@Test
	public void test_timeseries_generates_dataset_by_type() throws Exception {

		DataSet dataSet = dayNumberTimeSeriesDataSet();

		Configuration configuration = new Configuration();
		configuration.setXAxis("Day");
		configuration.setYAxis("Number");

		Collection<TimeSeries> timeSeries = timeSeriesExtractor.extract(dataSet, configuration);

		//assert a single time series
		Assert.assertEquals(timeSeries.size(), 1);

		TimeSeries series = timeSeries.stream().findFirst().get();

		//assert six x axis values
		Assert.assertEquals(series.getXAxisData().size(), 6);

		//assert six y axis values
		Assert.assertEquals(series.getYAxisData().size(), 6);
	}

	@Test
	public void test_timeseries_groups_dataset_by_type() throws Exception {

		DataSet dataSet = dayNumberTimeSeriesDataSet();

		Configuration configuration = new Configuration();
		configuration.setGroupBy("Type");
		configuration.setXAxis("Day");
		configuration.setYAxis("Number");

		Collection<TimeSeries> timeSeries = timeSeriesExtractor.extract(dataSet, configuration);

		//assert correct type/impl
		Assert.assertEquals(timeSeries.size(), 2);
	}

//	@Test
//	public void test_ml_always_return_true() throws Exception {
//
//		//Create the mock object of stock service
//		StockService stockServiceMock = mock(StockService.class);
//
//		// mock the behavior of stock service to return the value of various stocks
//		when(stockServiceMock.getPrice(googleStock)).thenReturn(50.00);
//		when(stockServiceMock.getPrice(microsoftStock)).thenReturn(1000.00);
//	}

	public DataSet dayNumberTimeSeriesDataSet(){
		DataSet dataSet = new DataSet();

		/*** Fields ***/
		List<String> fields = new ArrayList<>();
		fields.add("Day");
		fields.add("Number");
		fields.add("Type");
		dataSet.setFields(fields);

		/*** Data ***/
		List<List<String>> data = new ArrayList<>();
		{
			List<String> row = new ArrayList<>();
			row.add("1");
			row.add("1");
			row.add("A");
			data.add(row);
		}
		{
			List<String> row = new ArrayList<>();
			row.add("2");
			row.add("2");
			row.add("A");
			data.add(row);
		}
		{
			List<String> row = new ArrayList<>();
			row.add("3");
			row.add("3");
			row.add("A");
			data.add(row);
		}
		{
			List<String> row = new ArrayList<>();
			row.add("1");
			row.add("3");
			row.add("B");
			data.add(row);
		}
		{
			List<String> row = new ArrayList<>();
			row.add("2");
			row.add("3");
			row.add("B");
			data.add(row);
		}
		{
			List<String> row = new ArrayList<>();
			row.add("3");
			row.add("3");
			row.add("B");
			data.add(row);
		}
		dataSet.setData(data);

		/*** Type ***/
		dataSet.setDataType(VisualizationDataType.TimeSeries);

		return dataSet;
	}
}
