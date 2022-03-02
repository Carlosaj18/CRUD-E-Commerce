// ************ Require's ***********************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); 

// ************ Controller Require **************
const productsController = require('../controllers/productsController');

// ************ Image ***************************
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'img-product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const fileUpload = multer({storage: multerDiskStorage});

// ************ Validations ***************************
const { body } = require('express-validator');
const validations = [
    /** Se toma el campo de name del formulario */
    body('name').notEmpty().withMessage('Tines que escribir el nombre del producto'),
    body('price').notEmpty().withMessage('Tines que escribir el precio del producto'),
    body('discount').notEmpty().withMessage('Tines que escribir el descuento del producto'),
    body('category').notEmpty().withMessage('Tines que escribir la categoria del producto'),
    body('description').notEmpty().withMessage('Tines que escribir la descripcion del producto'),
    body('imageProduct').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
        
        if(!file){
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidos son ${acceptedExtensions.join(', ')}`)
            }
        }

        return true;
    })
]

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.list); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', fileUpload.single('imageProduct'), validations, productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id?', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id?', productsController.edit); 
router.put('/edit/:id?', fileUpload.single('imageProduct'), productsController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id?', productsController.destroy);

module.exports = router;
