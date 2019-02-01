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
        let center = polygonCenter(state.visualization.currentGeometry);
        console.log(center);
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
}

export default new RequestPayload();