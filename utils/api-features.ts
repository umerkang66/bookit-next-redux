import { Query } from 'mongoose';

export class ApiFeatures<T extends Query<any, any>> {
  private excludedFieldsForFilter = [
    'search',
    'page',
    'sort',
    'limit',
    'fields',
  ];

  constructor(private mongooseQuery: T, private reqQuery: any) {}

  public getQuery(): T {
    return this.mongooseQuery;
  }

  // this is search by location
  public search(): this {
    if (this.reqQuery.search) {
      const searchQuery = {
        address: {
          $regex: this.reqQuery.search,
          $options: 'i', // case insensitive
        },
      };

      this.mongooseQuery = this.mongooseQuery.find(searchQuery) as T;
    }

    return this;
  }

  public filter(): this {
    const queryObj = { ...this.reqQuery };
    this.excludedFieldsForFilter.forEach(field => {
      delete queryObj[field];
    });

    for (const key in queryObj) {
      if (key.includes('[') && key.includes(']')) {
        // first delete the previous stored query
        delete queryObj[key];
        // then create the first obj "key" , and the second obj "key"
        let [first, second] = key.split('[');
        // remove the ending braces from the second obj "key"
        second = second.slice(0, second.length - 1);
        // create the second obj, also add the "$" (for mongoose)
        const secondObj = { ['$' + second]: this.reqQuery[key] };
        // add the second obj to the first, and the add the first to queryObj
        queryObj[first] = secondObj;
      }
    }

    this.mongooseQuery = this.mongooseQuery.find(queryObj) as T;
    return this;
  }

  public sort(): this {
    if (this.reqQuery.sort) {
      const sort = this.reqQuery.sort as string;
      this.mongooseQuery = this.mongooseQuery.sort(sort.replaceAll(',', ' '));
      return this;
    }
    this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
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

  public paginate(): this {
    const page = parseInt(this.reqQuery.page) || 1;
    const limit = parseInt(this.reqQuery.limit) || 10;
    const skipDocuments = limit * (page - 1);
    this.mongooseQuery = this.mongooseQuery.skip(skipDocuments).limit(limit);

    return this;
  }
}
