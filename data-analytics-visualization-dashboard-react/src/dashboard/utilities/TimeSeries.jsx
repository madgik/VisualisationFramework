
export default class TimeSeries {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }

  constructor(name, color, xAxisDataType, xAxisData, yAxisData, documents) {
    this.name = name;
    this.color = color;
    this.xAxisDataType = xAxisDataType;
    this.xaxisData = xAxisData;
    this.yaxisData = yAxisData;
    this.documents = documents;
  }
}
