const { json } = require("express/lib/response");

class ApiFeatures {
    constructor(query, querystr){
         this.query = query;
         this.querystr = querystr
    }

    search(){
       
        const keyword = this.querystr.keyword?{
            name:{
                $regex: this.querystr.keyword,
                $options:"i"
            }
        }:{};
        
        console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter(){
        const queryCopy = {...this.querystr}

    // Remove some fields for category
    const removeFields = ["keyword","page","limit"];
    removeFields.forEach(key=>delete queryCopy[key]);

    // Filter for Price & Rating
    let querystr = JSON.stringify(queryCopy);
    querystr= querystr.replace(/\b(gt|gte|lt|gte)\b/g,key=>`$${key}`);


    this.query = this.query.find(JSON.parse(querystr));
    return this
    }
     
};

module.exports = ApiFeatures;