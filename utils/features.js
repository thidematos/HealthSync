class Features {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }

  filter() {
    const { page, sort, limit, fields, ...queryObj } = this.reqQuery;
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|ne)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    const { sort } = this.reqQuery;
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    }

    return this;
  }

  limitFields() {
    const { fields } = this.reqQuery;
    if (fields) {
      const fieldStr = fields.split(',').join(' ');
      this.query = this.query.select(fieldStr);
    } else this.query = this.query.select('-__v');

    return this;
  }

  paginate() {
    const { page, limit } = this.reqQuery;
    const pageNUmber = +page || 1;
    const limitNumber = +limit || 50;
    const skip = (pageNUmber - 1) * limitNumber;

    this.query = this.query.skip(skip).limit(limitNumber);

    return this;
  }
}

module.exports = Features;
