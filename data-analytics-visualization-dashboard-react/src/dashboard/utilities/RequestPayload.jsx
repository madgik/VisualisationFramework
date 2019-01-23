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


    simpleRequestPayload()
    {
        return JSON.stringify({
            page_size: "200",
            page_offset: "0",
          })
    }
}

export default new RequestPayload();