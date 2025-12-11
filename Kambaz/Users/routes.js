import * as dao from "./dao.js";

let currentUser = null;

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      await dao.deleteUser(req.params.userId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const findAllUsers = async (req, res) => {
    try {
      const { role, name } = req.query;
      let users;
      
      if (role) {
        users = await dao.findAllUsers();
        users = users.filter(u => u.role === role);
      } else if (name) {
        users = await dao.findAllUsers();
        users = users.filter(u => 
          u.firstName?.toLowerCase().includes(name.toLowerCase()) ||
          u.lastName?.toLowerCase().includes(name.toLowerCase())
        );
      } else {
        users = await dao.findAllUsers();
      }
      
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const findUserById = async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const userUpdates = req.body;
      const user = await dao.updateUser(userId, userUpdates);
      currentUser = user;
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const signup = async (req, res) => {
    try {
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        res.status(400).json({ message: "Username already in use" });
        return;
      }
      const newUser = await dao.createUser(req.body);
      currentUser = newUser;
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const signin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await dao.findUserByCredentials(username, password);
      
      if (user) {
        currentUser = user;
        res.json(user);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const signout = (req, res) => {
    currentUser = null;
    res.sendStatus(200);
  };
  
  const profile = (req, res) => {
    res.json(currentUser);
  };

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
}