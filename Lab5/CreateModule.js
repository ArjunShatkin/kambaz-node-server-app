const moduleObj = {
    id: "M01",
    name: "Intro to NodeJS",
    description: "Learn NodeJS basics",
    course: "CS3500",
  };
  
  export default function Module(app) {
    // Route to get full module
    app.get("/lab5/module", (req, res) => {
      res.json(moduleObj);
    });
  
    // Route to get module name
    app.get("/lab5/module/name", (req, res) => {
      res.json(moduleObj.name);
    });
  
    // Route to update module name
    app.get("/lab5/module/name/:newName", (req, res) => {
      moduleObj.name = req.params.newName;
      res.json(moduleObj);
    });
  
    // Route to update module description
    app.get("/lab5/module/description/:newDesc", (req, res) => {
      moduleObj.description = req.params.newDesc;
      res.json(moduleObj);
    });
  }
  