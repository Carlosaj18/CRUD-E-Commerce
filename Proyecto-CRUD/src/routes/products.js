// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Image ****************************
const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/products'));
    },
    filename: (req, file, cb) => {
        console.log(file)
        const newFileName = 'img-product-' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const fileUpload = multer({storage: multerDiskStorage});

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.list); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', fileUpload.single('imageProduct'), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id?', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id?', productsController.edit); 
router.put('/edit/:id?', fileUpload.single('imageProduct'), productsController.update);

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id?', productsController.destroy);

module.exports = router;
