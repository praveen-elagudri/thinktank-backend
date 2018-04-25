var Redshift = require('node-redshift');
var client = require('../client');
var redshift = new Redshift(client);

var statement = 'select count(*) from products limit 10'

exports.count = function(req, res){

redshift.query(statement, {raw: true}, function(err, data){
  if(err) 
    console.log("Error Selecting : %s ",err );
  else{
    console.log(data);
    res.status(200).json({
                message: 'Success',
                obj: data
                });
  }
});
};