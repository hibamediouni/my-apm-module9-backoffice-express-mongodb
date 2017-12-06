var productModel = require('../models/productModel.js');

/**
 * productController.js
 *
 * @description :: Server-side logic for managing products.
 */
module.exports = {

    /**
     * productController.list()
     */
    
    list: function (req, res) {
        // let products =  [
        //     {
        //         "productId": 2,
        //         "productName": "**** Garden Cart",
        //         "productCode": "GDN-0023",
        //         "releaseDate": "March 18, 2016",
        //         "description": "15 gallon capacity rolling garden cart",
        //         "price": 32.99,
        //         "starRating": 4.2,
        //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        //     },
        //     {
        //         "productId": 5,
        //         "productName": "**** Hammer",
        //         "productCode": "TBX-0048",
        //         "releaseDate": "May 21, 2016",
        //         "description": "Curved claw steel hammer",
        //         "price": 8.9,
        //         "starRating": 4.8,
        //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
        //     },
        //     {
        //         "productId": 10,
        //         "productName": "**** Video Game Controller",
        //         "productCode": "GMG-0042",
        //         "releaseDate": "October 15, 2015",
        //         "description": "Standard two-button video game controller",
        //         "price": 35.95,
        //         "starRating": 4.6,
        //         "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
        //     }
        // ];
        productModel.find(function (err, products) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting product.',
                    error: err
                });
            }
            return res.json(products);
        });
        // return res.json(products);
    },

    /**
     * productController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        productModel.findOne({_id: id}, function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting product.',
                    error: err
                });
            }
            if (!product) {
                return res.status(404).json({
                    message: 'No such product'
                });
            }
            return res.json(product);
        });
    },

    /**
     * productController.create()
     */
    create: function (req, res) {
        var product = new productModel({
			productId : req.body.productId,
			productName : req.body.productName,
			productCode : req.body.productCode,
			releaseDate : req.body.releaseDate,
			description : req.body.description,
			price : req.body.price,
			starRating : req.body.starRating,
			imageUrl : req.body.imageUrl

        });

        product.save(function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating product',
                    error: err
                });
            }
            return res.status(201).json(product);
        });
    },

    /**
     * productController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        productModel.findOne({_id: id}, function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting product',
                    error: err
                });
            }
            if (!product) {
                return res.status(404).json({
                    message: 'No such product'
                });
            }

            product.productId = req.body.productId ? req.body.productId : product.productId;
			product.productName = req.body.productName ? req.body.productName : product.productName;
			product.productCode = req.body.productCode ? req.body.productCode : product.productCode;
			product.releaseDate = req.body.releaseDate ? req.body.releaseDate : product.releaseDate;
			product.description = req.body.description ? req.body.description : product.description;
			product.price = req.body.price ? req.body.price : product.price;
			product.starRating = req.body.starRating ? req.body.starRating : product.starRating;
			product.imageUrl = req.body.imageUrl ? req.body.imageUrl : product.imageUrl;
			
            product.save(function (err, product) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating product.',
                        error: err
                    });
                }

                return res.json(product);
            });
        });
    },

    /**
     * productController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        productModel.findByIdAndRemove(id, function (err, product) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the product.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
