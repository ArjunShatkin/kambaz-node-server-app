const assignment = {
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  };
  
  export default function WorkingWithObjects(app) {
    const getAssignment = (req, res) => {
      res.json(assignment);
    };
  
    const getAssignmentTitle = (req, res) => {
      res.json(assignment.title);
    };
  
    app.get("/lab5/assignment/title", getAssignmentTitle);
    app.get("/lab5/assignment", getAssignment);
    
    app.get("/lab5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
      });
      // Route to update score
app.get("/lab5/assignment/score/:newScore", (req, res) => {
    assignment.score = parseInt(req.params.newScore);
    res.json(assignment);
  });
  
  // Route to update completed property
  app.get("/lab5/assignment/completed/:status", (req, res) => {
    assignment.completed = req.params.status === "true";
    res.json(assignment);
  });
  
  }
  
  