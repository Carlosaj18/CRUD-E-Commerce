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
	fs.writeFileSync(productsFilePath)
}
const controller = {

	validation: function (req, res) {
        let userAdmin = req.query.user;
		if(userAdmin) {
			res.redirect('products/create');
		}
        // res.send("Hola Admin: " + userAdmin);
    },
	index: (req, res) => {
		// Do the magic
		let products = findAll();

		let productosVisitados = products.filter(function(productVistiado){
			return productVistiado.category == 'visited';
		});

		let productosOferta = products.filter(function(productOferta){
			return productOferta.category == 'in-sale'
		});

		let productos = {
			visitados: productosVisitados, 
			oferta: productosOferta}

		res.render('index', {productos: productos});
						
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
