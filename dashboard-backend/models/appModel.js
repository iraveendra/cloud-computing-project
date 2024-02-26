class App {
    constructor(id, name, description, widgets) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.widgets = widgets;
      this.datetime = new Date();
    }
  }
  
  module.exports = App;
  