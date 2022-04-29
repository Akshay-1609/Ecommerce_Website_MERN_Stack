const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product Name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxlength:[6,"Price Can't exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0,
    },
    Image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{type:String,
        required:[true,"Please Enter Product Category"]
        
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxlength:[4,"Stock Can't Exceed 4 Character"],
        default:1
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            commnet:{
                type:String,
            require:true
            }
        }
    ]
})