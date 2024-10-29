const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
      type:String,
      trim: true,
      required: [true, 'Please provide product title'],
      maxlength: [100, 'title can not be more than 100 characters'],
    },
    price:{
      type:Number,
      required:[true,'product price must be provided']
    },
    featured:{
      type:Boolean,
      default:false
    },
    createdAT:{
      type:Date,
      default: Date.now()
    },
    category: {
      type: String, // No enum, making it flexible for any category value
      default: 'Other', // Default category if none is provided
    },
    mainImage:{
      type:String,
      default: 'https://res.cloudinary.com/dl1yat4by/image/upload/v1718998399/mouse_m6e8va.jpg',
    },
    productImages:{
      type: [String],
      default: 'https://res.cloudinary.com/dl1yat4by/image/upload/v1718998399/mouse_m6e8va.jpg',
    },
    shipping:{
      type:Boolean,
      default:true,
    },
    inStock:{
      type:Boolean,
      default:true,
    },
    videoURI:{
      type:String,
      default: 'none',
    },
    colors: {
      type: [String],
      default: ['#222'],
      required: true,
    },
    mainDescription: {
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    featureDescription:{
      type: String,
      required: [true, 'Please provide product description'],
      maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    featureImages:{
      type: [String],
      default: 'https://res.cloudinary.com/dl1yat4by/image/upload/v1718998399/mouse_m6e8va.jpg',
    },
    listFeature: {
      type: [String],
      default: '...',
    },    
  },
  { 
    timestamps: true
  }
)


module.exports = mongoose.model('Product',productSchema)

