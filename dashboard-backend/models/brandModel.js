class Brand {
    constructor(id, name, totalWidgets, totalProducts) {
      this.id = id;
      this.name = name;
      this.totalWidgets = totalWidgets;
      this.totalProducts = totalProducts;
      this.datetime = new Date();
    }
  }
  
  module.exports = Brand;
  