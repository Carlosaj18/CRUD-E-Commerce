const fs = require('fs');
const path = require('path');

// ***** VARIABLES *******
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// ***** FUNCION PARA TRAER LOS DATOS EN UN ARRAY *******
function findAll(){
	let data = fs.readFileSync(productsFilePath, 'utf-8')
	let arrayData = JSON.parse(data);
	return arrayData
}

// ***** FUNCION PARA PASAR LOS DATOS A JSON *******
function writeFile(array){
	let string = JSON.stringify(array, null, 4)
	fs.writeFileSync(productsFilePath, string)
}

function generateId(){
	return Math.random().toString(36).substr(2, 18);
} 


const controllerProducts = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic

		let products = findAll();
		
		res.render('products', {products: products})

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic

		let products = findAll();

		let productoEncontrado = products.find(function(producto) {
			return producto.id == req.params.id;
		
		})

		res.render('detail', {product: productoEncontrado})

	},
	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let products = findAll();
		let idProducto = generateId();

		let newProduct = {
			//id: products.length + 1,
			id: idProducto,
			name: req.body.name,
			price: req.body.price, 
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.body.image
		}
		console.log(newProduct);

		products.push(newProduct);

		writeFile(products);

		res.redirect('/products/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let products = findAll();

		let productoEncontrado = products.find(function(producto) {
			return producto.id == req.params.id;
		
		})

		res.render('product-edit-form', {product: productoEncontrado})



	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let products = findAll();

		let newArray = products.map(function(product){
			if(product.id == req.params.id){
				product.name = req.body.name,
				product.price = req.body.price, 
				product.discount = req.body.discount,
				product.category = req.body.category,
				product.description = req.body.description,
				product.image = req.body.image
			}
			return product;
		})

		writeFile(products)

		res.redirect('/products/')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let products = findAll();

		let productIndex = products.findIndex(function(producto) {
			return producto.id == req.params.id;
		});

		products.splice(productIndex, 1);

		writeFile(products)

		res.redirect('/products/')
	}
};

module.exports = controllerProducts;