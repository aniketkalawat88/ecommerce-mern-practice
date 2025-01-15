const { json } = require("express");

class ApiFeatures {
    constructor(query, queryStr){
        this.query = query,
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {    //   this.queryStr is a req.query which we used in controller
            name :{
                $regex: this.queryStr.keyword,     // mongodb operator regex mean regular expression
                $options: "i",      // i mean case insensitive capital or small  type kro g toh voh dono search kr k de dega 
            },
        }: {};
        // console.log(keyword);
        
        this.query = this.query.find({...keyword})
        return this;  
    }

    filter(){
        const queryCopy = {...this.queryStr};    // this.query mai humne ek copy banai hai but isme yeh original change ho jeyga so hum {...this.queryStr} use isme voh ek copy bna rha h taki original m kuch change na ho

        // console.log(queryCopy);
        // Removing some fields from category
        const removeFields = ["keyword","page","limit"];
        
        removeFields.forEach((key) => delete queryCopy[key]);

        // console.log(queryCopy);

        // filter for pricing and rating
        
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , (key) => `$${key}`)   // (/\b()\b/g) regular expression hai

        this.query = this.query.find(JSON.parse(queryStr));
        
        // console.log(queryStr);

        return this;
    }
    
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }


}

module.exports = ApiFeatures ;