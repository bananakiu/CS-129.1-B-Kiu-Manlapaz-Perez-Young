# CS-129.1-B-Kiu-Manlapaz-Perez-Young-
In partial fulfillment of requirements for the course CS 129.1 B - Special Topics in Software Engineering: Contemporary Database

# CS-129.1-B-Kiu-Manlapaz-Perez-Young-
In partial fulfillment of requirements for the course CS 129.1 B - Special Topics in Software Engineering: Contemporary Database


# How to load the dataset
1) Make sure that your command prompt is already directed to your BIN directory in MongoDB ( ..MongoDB\Server\3.4\bin )


2) Folder Creation:

mkdir mongo1
mkdir mongo2
mkdir mongo3



# How to setup the Replicate sets
1) Run these codes in separate (Admin allowed) Command Terminals. Make sure that your terminal's directory is in BIN.

mongod --replSet replicate --dbpath mongo1 --port 27017 --rest

mongod --replSet replicate --dbpath mongo2 --port 27018 --rest

mongod --replSet replicate --dbpath mongo3 --port 27019 --rest

2) Open a new (Admin-allowed) Command Terminal. Make sure that your terimnal is in BIN.

run this command:

mongo localhost:27017
3) Once longged in:

var config = {
"_id": "replicate",
  "version" : 1,
  "members" :   [
    {
      "_id" : 0,
      "host" : "localhost:27017",
      "priority" : 1
    },
    {
      "_id" : 1,
      "host" : "localhost:27018",
      "priority" : 0
    },
    {
      "_id" : 2,
      "host" : "localhost:27019",
      "priority" : 0
    }
  ]
}
4) Afterwards:

rs.intiate(config)
rs.conf()

5) Exit from your mongo login:

exit


6) Import the data to your BIN. Make sure that the file is in your BIN folder before executing:

mongoimport --db NBA --collection statistics --type csv --file stats.csv -h localhost:27017 --headerline

* You can substitute NBA with <your database name> *

7) You can now check that the files have loaded into your mongo instance:

log in to the monggo:

mongo localhost:27017

In the mongo terminal:

# show databases
show dbs

# show collections
show collections

Now you can start using your database:
use NBA

# checks if data is running 
db.statistics.find().pretty()

# verify replication
Exit current mongo instance, and log into a replicate mongo instance:

mongo localhost:27018

Once in the replicated database, set the current terminal as a slave:

rs.slaveOk()

log into your database:

use NBA


# show databases
show dbs

# show collections
show collections

# checks if data is running
db.statistics.find().pretty()

# How to execute the MapReduce functions
1) log into your primary server:

mongo localhost: 27017

Once logged into primary mongo instance:

use NBA

Afterwards, run the two MapReduce functions:

# 1ST MAPREDUCE
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


# MapReduce Report 1
db.statistics.report.find().pretty()

# 2ND MAPREDUCE

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

# MapReduce Report 2
db.statistics.report2.find().pretty()




# How export the output
mongoexport --db NBA --collection statistics.report --out statistics.report.csv

mongoexport --db NBA --collection statistics.report2 --out statistics.report2.csv

# Thank You
# Kiu, Manlapaz, Perez, Young
