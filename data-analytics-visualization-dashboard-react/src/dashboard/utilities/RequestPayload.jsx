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

}

export default new RequestPayload();