class ApiFeatures {
    constructor(query, queryStr){
        this.query = query,
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name :{
                $regax: this.queryStr.keyword,
                $option: "i", 
            },
        }: {};

    }
}

module.exports = ApiFeatures ;