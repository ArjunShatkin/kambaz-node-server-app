let todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];
  
  export default function WorkingWithArrays(app) {
    // Route to get all todos (optionally filtered by completed)
    const getTodos = (req, res) => {
      const { completed } = req.query;
  
      // Filter by completed if query parameter is provided
      if (completed !== undefined) {
        const completedBool = completed === "true";
        const completedTodos = todos.filter((t) => t.completed === completedBool);
        res.json(completedTodos);
        return;
      }
  
      res.json(todos);
    };
  
    // Route to create a new todo
    const createNewTodo = (req, res) => {
      const newTodo = {
        id: new Date().getTime(),
        title: "New Task",
        completed: false,
      };
      todos.push(newTodo);
      res.json(todos);
    };
  
    // Route to get a single todo by ID
    const getTodoById = (req, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      res.json(todo);
    };
  
    // Route to delete a todo by ID
    const removeTodo = (req, res) => {
      const { id } = req.params;
      const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
      if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
      }
      res.json(todos);
    };
  
    // Route to update a todo's title
    const updateTodoTitle = (req, res) => {
      const { id, title } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (todo) {
        todo.title = title;
      }
      res.json(todos);
    };
  
    // Route to update a todo's completed property
    const updateTodoCompleted = (req, res) => {
      const { id, completed } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (todo) {
        todo.completed = completed === "true";
      }
      res.json(todos);
    };
  
    // Route to update a todo's description
    const updateTodoDescription = (req, res) => {
      const { id, description } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      if (todo) {
        todo.description = description;
      }
      res.json(todos);
    };
  
    // Define routes in correct order
    app.get("/lab5/todos/:id/delete", removeTodo);                      // DELETE a todo by ID
    app.get("/lab5/todos", getTodos);                                   // GET all todos (with optional filter)
    app.get("/lab5/todos/create", createNewTodo);                       // CREATE a new todo
    app.get("/lab5/todos/:id/title/:title", updateTodoTitle);           // UPDATE a todo's title
    app.get("/lab5/todos/:id/completed/:completed", updateTodoCompleted); // UPDATE completed property
    app.get("/lab5/todos/:id/description/:description", updateTodoDescription); // UPDATE description
    app.get("/lab5/todos/:id", getTodoById);                            // GET a single todo by ID
  }
  