const mongoose = require('mongoose');
const product = require('../models/product')
const Category = require('../models/Category')
const CustomError = require('../errors');


const getSingleProduct = async (req, res) => {
    const { id } = req.params;
    const productId = id.split('#')[0];

    // Check if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }
  
    const SingleProduct = await product.findOne({ _id: productId });
  
    if (!SingleProduct) {
      throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }
  
    res.status(200).json({ 
        data:SingleProduct,
        meta:{} 
    });
}

const getProducts = async (req, res) => {
    const {
        featured,
        search,
        order,
        select,
        shipping,
        category
    } = req.query;

    const queryObject = {};

    if (featured) {
        queryObject.featured = (featured === 'true');
    }

    if (shipping) {
        queryObject.shipping = (shipping === 'on');
    }

    if (search) {
        queryObject.title = { $regex: new RegExp(search, 'i') };
    }

    if (category && category !== 'all') {
        queryObject.category = { $regex: new RegExp(category, 'i') };
    }

    // apply inStock filleter only for all fetch
    queryObject.inStock = true;

    let result = product.find(queryObject);

    // Apply custom ordering logic
    switch (order) {
        case 'a-z':
            result = result.sort('title');
            break;
        case 'z-a':
            result = result.sort('-title');
            break;
        case 'high':
            result = result.sort('-price');
            break;
        case 'low':
            result = result.sort('price');
            break;
        default:
            result = result.sort('createdAt'); // default sort
    }

    if (select) {
        const selectedList = select.split(',').join(' ');
        result = result.select(selectedList);
    }

    // Pagination logic
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 8;
    if (page > 3 || page < 1) {
        page = 1;
    }
    const skip = (page - 1) * limit;

    // Get the total count of documents matching the query
    const total = await product.countDocuments(queryObject);

    result = result.skip(skip).limit(limit);

    const products = await result;

    // Calculate total pages
    const pageCount = Math.ceil(total / limit);

    // Categories

    const categories = await Category.findOne({});
         
    res.status(200).json({
        data: products,
        nbHits: products.length,
        meta: {
            categories:categories.categories,
            pagination: {
                page: page,
                pageSize: limit,
                pageCount: pageCount,
                total: total
            }
        }
    });
}
 


module.exports = {getProducts,getSingleProduct}