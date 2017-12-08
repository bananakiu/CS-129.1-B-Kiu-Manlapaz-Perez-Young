//1st MapReduce
var map = function() {
    emit({
        Tm: this.Tm, 
        Year: this.Year,
    }, {
        FGA: this.FGA, 
				THREEPA: this.THREEPA
    });
}
                   
var reduce = function(key,values){
  var total_FGA = 0;
  var total_3PA = 0;
  var ThreePA_over_FGA = 0;
  for( var i = 0; i < values.length; i++) {
    total_FGA += values[i].FGA;
    total_3PA += values[i].THREEPA
    }
  ThreePA_over_FGA = total_3PA / total_FGA
  return {FGA: total_FGA, THREEPA: total_3PA, behavior: ThreePA_over_FGA = total_3PA / total_FGA };
}

var results = db.runCommand({
    mapReduce: 'statistics',
    map: map,
    reduce: reduce,
    out: 'statistics.report'
})

db.statistics.report.find().pretty()

//2nd MapReduce

var map = function() {
    emit({
        Year: this._id.Year
    }, {
        FGA: this.value.FGA, 
				THREEPA: this.value.THREEPA
    });
}
                   
var reduce = function(key,values){
    var total_FGA = 0;
    var total_3PA = 0;
    var ThreePA_over_FGA = 0;
    for( var i = 0; i < values.length; i++) {
        total_FGA += values[i].FGA;
				total_3PA += values[i].THREEPA
    }
    ThreePA_over_FGA = total_3PA / total_FGA
    return {FGA: total_FGA, THREEPA: total_3PA, behavior: ThreePA_over_FGA};
}

var results = db.runCommand({
    mapReduce: 'statistics.report',
    map: map,
    reduce: reduce,
    out: 'statistics.report2'
})

db.statistics.report2.find().pretty()