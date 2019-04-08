class DateUtils {
  dates= ['2012.01','2012.02','2012.03','2012.04','2012.05','2012.06','2012.07','2012.08','2012.09','2012.10','2012.11','2012.12',
    '2013.01','2013.02','2013.03','2013.04','2013.05','2013.06','2013.07','2013.08','2013.09','2013.10','2013.11','2013.12',
    '2014.01','2014.02','2014.03','2014.04','2014.05','2014.06','2014.07','2014.08','2014.09','2014.10','2014.11','2014.12']

  getNextDate(date){
    var index = this.dates.indexOf(date);
    var nextItem;
    if(index >= 0 && index <  this.dates.length - 1) {
      nextItem =  this.dates[index + 1]
    }
    return nextItem;
  }

  getPreviousDate(date){
    var index =  this.dates.indexOf(date);
    var nextItem;

    if(index > 0 && index <  this.dates.length ) {
      nextItem =  this.dates[index -1]
    }
  
    return nextItem;
  }

  getNextDate(date,timestamps){
    var index = timestamps.indexOf(date);
    var nextItem;
    if(index >= 0 && index <  timestamps.length - 1) {
      nextItem =  timestamps[index + 1]
    }
    return nextItem;
  }

  getPreviousDate(date,timestamps){
    var index =  timestamps.indexOf(date);
    var nextItem;

    if(index > 0 && index <  this.dates.length ) {
      nextItem =  timestamps[index -1]
    }
  
    return nextItem;
  }
}

export default new DateUtils();