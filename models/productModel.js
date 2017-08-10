var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var productSchema = new Schema({
	'productId' : Number,
	'productName' : String,
	'productCode' : String,
	'releaseDate' : Date,
	'description' : String,
	'price' : Number,
	'starRating' : Number,
	'imageUrl' : String
});

module.exports = mongoose.model('product', productSchema);
