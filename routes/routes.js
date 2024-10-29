const express = require('express')
// create router
const router = express.Router()

//controllers
const { getProducts,getSingleProduct } = require('../controllers/products')


router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)


module.exports = router
