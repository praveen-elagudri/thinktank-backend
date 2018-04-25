var Redshift = require('node-redshift');
var client = require('../client');
var redshift = new Redshift(client);

var statement = 'SELECT SUM("products"."product_price") AS "sumofProducts", ' +
'  CAST(EXTRACT(YEAR FROM CAST("customer_orders"."date_order_paid" AS TIMESTAMP WITHOUT TIME ZONE)) AS INTEGER) AS ' + 
' "year" ' +
'FROM "public"."products" "products" ' +
'  INNER JOIN "public"."customer_orders_product" "customer_orders_product" ON ("products"."product_id" = ' +
' "customer_orders_product"."order_id") ' +
'  INNER JOIN "public"."customer_orders" "customer_orders" ON ("customer_orders_product"."order_id" = "customer_orders"."order_id") ' +
'  INNER JOIN "public"."customer_orders_delivery" "customer_orders_delivery" ON ("customer_orders"."order_id" = ' +
' "customer_orders_delivery"."order_id") ' +
'  INNER JOIN "public"."customer_addresses" "customer_addresses" ON ("customer_orders"."customer_id" = "customer_addresses"."customer_id") ' +
'WHERE ((NOT ("products"."supplier_id" IS NULL)) AND ((NOT ("customer_orders"."customer_payement_method_id" IS NULL)) AND (NOT ' +
' ("customer_orders"."customer_id" IS NULL)))) ' +
' GROUP BY 2'

exports.list = function(req, res){

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

var statement1 = 'select count(*) from customer_orders';

exports.count = function(req, res){

redshift.query(statement1, {raw: true}, function(err, data){
  if(err) 
    console.log("Error getting countd : %s ",err );
  else{
    console.log(data);
    res.status(200).json({
                message: 'Success',
                Success: 1,
                object: data
                });
  }
});
};
