package gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformations;

import gr.uoa.di.aginfra.data.analytics.visualization.model.AppConfig;
import gr.uoa.di.aginfra.data.analytics.visualization.model.definitions.Transformation;
import gr.uoa.di.aginfra.data.analytics.visualization.model.services.VisualizationDataType;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.data.DataSet;
import gr.uoa.di.aginfra.data.analytics.visualization.model.visualization.transformation.UnpivotTransformer;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {AppConfig.class})
public class UnpivotTransformerTest {

    @Autowired
    UnpivotTransformer unpivotTransformer;

    @Test
    public void test_unpivot_dataset() throws Exception {

        DataSet dataSet = dayNumberTimeSeriesDataSet();
        Transformation transformation = new Transformation();
        List<String> transformationColumns = new ArrayList<>();

        transformationColumns.add("2017");
        transformationColumns.add("2018");
        transformation.setTransformationLabel("year");
        transformation.setTransformationLabelValue("yearValue");
        transformation.setTransformationColumns(transformationColumns);

        DataSet transformedDataset = unpivotTransformer.unPivot(dataSet, transformation);

        Assert.assertEquals(transformedDataset.getFields().size(), 3);
        Assert.assertEquals(transformedDataset.getData().size(), 12);

        Assert.assertEquals(transformedDataset.getData().get(0).get(0), "1");
        Assert.assertEquals(transformedDataset.getData().get(0).get(1), "2017");
        Assert.assertEquals(transformedDataset.getData().get(0).get(2), "1");

        Assert.assertEquals(transformedDataset.getData().get(11).get(0), "6");
        Assert.assertEquals(transformedDataset.getData().get(11).get(1), "2018");
        Assert.assertEquals(transformedDataset.getData().get(11).get(2), "22");


    }

    public DataSet dayNumberTimeSeriesDataSet(){
        DataSet dataSet = new DataSet();

        /*** Fields ***/
        List<String> fields = new ArrayList<>();
        fields.add("Day");
        fields.add("2017");
        fields.add("2018");
        dataSet.setFields(fields);

        /*** Data ***/
        List<List<String>> data = new ArrayList<>();
        {
            List<String> row = new ArrayList<>();
            row.add("1");
            row.add("1");
            row.add("5");
            data.add(row);
        }
        {
            List<String> row = new ArrayList<>();
            row.add("2");
            row.add("2");
            row.add("4");
            data.add(row);
        }
        {
            List<String> row = new ArrayList<>();
            row.add("3");
            row.add("3");
            row.add("10");
            data.add(row);
        }
        {
            List<String> row = new ArrayList<>();
            row.add("4");
            row.add("3");
            row.add("45");
            data.add(row);
        }
        {
            List<String> row = new ArrayList<>();
            row.add("5");
            row.add("31");
            row.add("12");
            data.add(row);
        }
        {
            List<String> row = new ArrayList<>();
            row.add("6");
            row.add("13");
            row.add("22");
            data.add(row);
        }
        dataSet.setData(data);

        /*** Type ***/
        dataSet.setDataType(VisualizationDataType.TimeSeries);

        return dataSet;
    }

}
