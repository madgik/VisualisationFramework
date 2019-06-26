var polygonCenter = require('geojson-polygon-center')

class RequestPayload{

    buildMapRequestPayload(state)
    {
        return JSON.stringify({
            page_size: "200",
            page_offset: "0",
            year: state.visualization.selectedYear,
            output_epsg: "4326",
            epsg: "4326",
            geometry: JSON.stringify(state.visualization.currentGeometry)
          })
    }

    buildCropHistoryRequestPayload(state)
    {
        let center = polygonCenter(state.visualization.selectedLayer);
        return JSON.stringify({
            page_size: "200",
            page_offset: "0",
            output_epsg: "4326",
            epsg: "4326",
            geometry: JSON.stringify(center)
          })
    }


    simpleRequestPayload()
    {
        return JSON.stringify({
            page_size: "200",
            page_offset: "0",
          })
    }


    buildMeteoRequestPayload(state)
    {
        return JSON.stringify({
            page_size: "200",
            page_offset: "0",
            meteostation: state.visualization.nearestMeteoStation,
            fromdate: state.data.weatherChartDetails.dateRange.start.format("YYYYMMDD"),
            todate: state.data.weatherChartDetails.dateRange.end.format("YYYYMMDD")
          })
    }

    buildDataMinerRequestPayload(state)
    {
        return JSON.stringify({
            "request":"Execute",
            "service":"WPS",
            "Version":"1.0.0",
            "gcube-token": state.data.workspaceDetails.workspaceToken,
            "lang":"en-US",
            "Identifier":"org.gcube.dataanalysis.wps.statisticalmanager.synchserver.mappedclasses.transducerers.CROP_SIMULATION_FOR_FIELD_V1",
            "DataInputs":"Title=AgroDataCube+Field+Crop+Simulation;AgroDataCubeFieldId=" + state.visualization.selectedLayer.properties.fieldid + ";SimulationYear=" + state.visualization.selectedYear + ";CalculationsTimeout=30"
           
          })
    }
}

export default new RequestPayload();