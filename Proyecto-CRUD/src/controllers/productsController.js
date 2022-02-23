// ***** Require *******
const productServices = require("../services/productServices");

const controllerProducts = {
	// Root - Show all products
	list: (req, res) => {
		const products = productServices.findAll();		
		res.render('products', {products: products});
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		const productoEncontrado = productServices.findByPk(req.params.id);
        res.render('detail', {product: productoEncontrado});	
	},
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	// Create -  Method to store
	store: (req, res) => {
		if(req.file){
			productServices.create(req.body, req.file);
			res.redirect('/products/');
		} else {
			res.render('product-create-form');
		}
	},
	// Update - Form to edit
	edit: (req, res) => {
		const product = productServices.findByPkEdit(req.body, req.params.id, req.file);
		res.render('product-edit-form', {product: product});
	},
	// Update - Method to update
	update: (req, res) => {
		if(req.file){
			productServices.update(req.body, req.params.id, req.file);
			res.redirect('/products/');
		} else {
			res.render('product-create-form');
		}
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		productServices.destroy(req.params.id);
		res.redirect('/products/')
	}
};

module.exports = controllerProducts;