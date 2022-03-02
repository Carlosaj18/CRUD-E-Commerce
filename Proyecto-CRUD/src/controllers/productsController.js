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
		let userAdmin = req.query.user;
		if(userAdmin){
			res.render('product-create-form');
		} else {
			res.send('El usuario no tiene lo permisos');
		}
		
	},
	// Create -  Method to store
	store: (req, res) => {
		
		productServices.create(req, req.body, req.file, res);
		res.redirect('/products/');
		
	},
	// Update - Form to edit
	edit: (req, res) => {

		let userAdmin = req.query.user;
		if(userAdmin){
			const product = productServices.findByPkEdit(req.body, req.params.id, req.file);
			res.render('product-edit-form', {product: product, oldData: req.body});
		} else {
			res.send('El usuario no tiene lo permisos');
		}
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
		let userAdmin = req.query.user;
		if(userAdmin){
			productServices.destroy(req.params.id);
			res.redirect('/products/')
		} {
			res.send('El usuario no tiene lo permisos');
		}
		
	}
};

module.exports = controllerProducts;