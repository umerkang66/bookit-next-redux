import { Query } from 'mongoose';

export class ApiFeatures<T extends Query<any, any>> {
  private excludedFieldsForFilter = ['page', 'sort', 'limit', 'fields'];

  constructor(private mongooseQuery: T, private reqQuery: any) {}

  public getQuery(): T {
    return this.mongooseQuery;
  }

  public filter(): this {
    // TODO: Dynamic req queries

    const queryObj = { ...this.reqQuery };
    this.excludedFieldsForFilter.forEach(field => {
      delete queryObj[field];
    });

    console.log(this.reqQuery);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr)) as T;

    return this;
  }

  public sort(): this {
    if (this.reqQuery.sort) {
      const sort = this.reqQuery.sort as string;
      this.mongooseQuery = this.mongooseQuery.sort(sort.split(',').join(' '));
    }
    return this;
  }

  public getFields(): this {
    if (this.reqQuery.fields) {
      // if there are multiple fields, they should be separated through ","
      const fields = this.reqQuery.fields as string;
      this.mongooseQuery = this.mongooseQuery.select(fields.split(','));
    }
    return this;
  }
}
