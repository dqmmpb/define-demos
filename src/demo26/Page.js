
export default class Page {
  constructor(list, pageNum = 1, pageSize = 20) {
    if ((pageNum < 0 || !Number.isInteger(pageNum)) || (pageSize < 0 || !Number.isInteger(pageSize))) {
      throw new Error('Invalid pageNum or pageSize');
    }

    if (list) {
      const num = (pageNum < 1 || list.length === 0 ) ? 1 : Math.min(pageNum, Math.ceil(list.length / pageSize));
      this.list = list.slice((num - 1) * pageSize, Math.min(num * pageSize, list.length));
      this.pagination = {
        pageNum: num,
        pageSize,
        pages: list.length === 0 ? 1 : Math.ceil(list.length / pageSize),
        total: list.length,
      }
    } else {
      this.list = [];
      this.pagination = {
        pageNum: 1,
        pageSize,
        pages: 0,
        total: 0,
      }
    }
  }

}
