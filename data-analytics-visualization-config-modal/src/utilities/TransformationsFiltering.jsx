class TransformationsFiltering
{

    getSuggestions(transformations, dataSources)
    {
        var showFileName = (dataSources || []).length > 1;

        var suggestions = [];
        var array2;
    
    
        (dataSources || []).forEach(dataSource => {

        if(transformations !== undefined && transformations !== null && transformations.transformationLabel !== '' && transformations.transformationLabelValue !== '' && transformations.transformationColumns.length > 0)
        {
        array2 =  dataSource.fields.filter((value, index, array) =>
        {
            return !transformations.transformationColumns.includes(dataSource.source + '-' +value)
        });
        
        }
        else
        array2 = dataSource.fields;

        suggestions.push.apply(suggestions, (array2 || []).map(x => {
                return {
                text: showFileName ? dataSource.name + ' - ' + x : x,
                value: dataSource.source + '-' + x
            }        
        }));
      
    });
    if(transformations !== undefined && transformations !== null && transformations.transformationLabel !== '' && transformations.transformationLabelValue !== '' && transformations.transformationColumns.length > 0)
    {
    suggestions.push({text: transformations.transformationLabel, value: transformations.transformationLabel});
    suggestions.push({text: transformations.transformationLabelValue, value: transformations.transformationLabelValue});
    }

    return suggestions;
    }
    

}
export default new TransformationsFiltering();