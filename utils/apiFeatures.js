class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      // 1B) Advanced filtering
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
  
      return this;
    }
  
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    }
  }

 ////////////////////////////////////ORIGINALCODE////////////////////////////////

   // //BUILD QUERY
        // //1A.) Filtering
        // // console.log(req.query)
        // //{duration: 5, difficulty: 'easy', rating: {$gte: 5}}
        // const queryObject = { ...req.query }
        // //REMOVE THESE ELEMENTS FROM THE QUERYOBJECT
        // const exludedFields = ['page', 'sort', 'limit', 'fields']
        // exludedFields.forEach(el => delete queryObject[el])
        // console.log(queryObject)


        // //1B.) ADVANCED FILTERING (FOR PARAMS WITH MONGO OPERATOR '$' like '$GTE' or '$LTE')
        // let queryString = JSON.stringify(queryObject)
        // //REPLACES QUERY of /tours?duration[gte] = 5 from {duration: {gte: 5}} -- to {duration: {$gte: 5}}
        // const regex = /\b(gt|gte|lt|lte|in)\b/g;
        // queryString = queryString.replace(regex, '$$' + "$1")
        // //MUSTER PARSE TO REMOVE THE QUOTATIONS FROM '$GTE'
        // let parsed = JSON.parse(queryString)
        // console.log(JSON.parse(queryString))

        // //USING THE PARAMS e.g.(/api/v1/tours?difficulty=easy&duration=5) REQ.QUERY RETURNS OBJECT {duration: 5, difficulty: "easy"}
        // let query = Tour.find(JSON.parse(queryString))
        // const query = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')

        // //2.) SORTING
        // if (req.query.sort) {
        //     //CONDITION FOR MULTIPLE PARAMETERS E.G. .sort('price averageRating')
        //     const sortBy = req.query.sort.split(',').join(' ')
        //     query = query.sort(sortBy)
        // } else {
        //     //DEFAULT SORT BY ORDER CREATED
        //     query = query.sort('-createdAt')
        // }

        // //3.) FIELD LIMITING
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     //SELECT TAKES FIELD NAMES E.G. ('name description rating') ALSO CALLED PROJECTING TO RETURN ONLY THOSE VIELD AND VALUES ('name': 'trevor') etc.
        //     query = query.select(fields)
        // } else {
        //     query = query.select('-__v')
        // }

        // //4.) PAGINATION E.G. tours?page=2&limit=10
        // const page = req.query.page * 1 || 1
        // const limit = req.query.limit * 1 || 100
        // const skip = (page - 1) * limit
        // query = query.skip(skip).limit(limit)

        // if (req.query.page) {
        //     const numTours = await Tour.countDocuments()
        //     if (skip >= numTours) throw new Error('This Page Does Not Exist')
        // }

  export default APIFeatures