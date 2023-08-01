const {Router} = require('express');
const getAllProducts = require('../controllers/getAllProducts.js');
const getDbProducts = require('../controllers/getDbProducts.js');
const router = Router();

router.get('/products', getAllProducts);
router.get('/dbproducts', getDbProducts);

module.exports = router;