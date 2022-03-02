// ***** Require *******
const req = require("express/lib/request");
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const res = require("express/lib/response");

const service = {

	file: "../data/productsDataBase.json",
	readFile: function(){
		return fs.readFileSync(path.join(__dirname, this.file), "utf-8")
	},
	writeFile: function(array){
        let dataToString = JSON.stringify(array, null, 4)
        fs.writeFileSync(path.join(__dirname, this.file), dataToString);
    },
	generateId: function(){
		return Math.random().toString(36).substr(2, 18);
	}, 
	findAll: function(){
        return JSON.parse(this.readFile());
    },
    findByPk: function(id){
        const products = this.findAll()
        let productoEncontrado = products.find(function(product){
            return product.id == id
        });
        return productoEncontrado;
    },
    create: function(errors, payload, file, res){

		const resultValidation = validationResult(errors);
		if(resultValidation.errors.length > 0) {
			return res.render('product-create-form', 
							  {errors: resultValidation.mapped(),
							   oldData: payload});
		}
		
        let products = this.findAll();
		let idProducto = this.generateId()

		let product = {
			...payload,
			image: file.filename,
			id: idProducto
		}
		products.push(product)
		this.writeFile(products)

		/* if(req.file) {

			let newProduct = {
				//id: products.length + 1,
				id: idProducto,
				name: req.body.name,
				price: req.body.price, 
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description,
				image: req.file.filename
			}

			products.push(newProduct);
			writeFile(products);
			res.redirect('/products/');

		} else {
			//const  error = new Error('Por favor seleccione el archivo')
    		//error.httpStatusCode = 400
			//return next(error)

			res.render('product-create-form');
		}*/

    },
	findByPkEdit: function(payload, id, file){
        const products = this.findAll()
        let productoEncontrado = products.find(function(product){
            return product.id == id
        });
        return productoEncontrado;
    },
    update: function(payload, id, file){
        const products = this.findAll()

		if(file){
			let productoEncontrado = products.map(function(product){
				if(product.id == id){
					return {
						id: product.id,
						...payload,
						image: file.filename,
					}
				}
				return product
			});
			this.writeFile(productoEncontrado);
		} else {
			const  error = new Error('Por favor seleccione el archivo')
    		return error.httpStatusCode = 400
		}    
    },
    destroy: function(id){
		let products = this.findAll();

        let productIndex = products.findIndex((product)=>{
            return product.id == id
        })

        products.splice(productIndex, 1);

        this.writeFile(products);
    }
}

module.exports = service