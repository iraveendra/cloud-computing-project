class Widget {
    constructor(id, name, description, brand) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.brand = brand;
      this.datetime = new Date();
    }
  }
  
  module.exports = Widget;
  