export default function QueryParameters(app) {
    const calculator = (req, res) => {
      const { a, b, operation } = req.query;
      let result;
  
      const numA = parseInt(a);
      const numB = parseInt(b);
  
      switch (operation) {
        case "add":
          result = numA + numB;
          break;
        case "subtract":
          result = numA - numB;
          break;
        case "multiply":
          result = numA * numB;
          break;
        case "divide":
          if (numB === 0) {
            result = "Cannot divide by zero";
          } else {
            result = numA / numB;
          }
          break;
        default:
          result = "Invalid operation";
      }
  
      // Convert result to string to avoid browser interpreting as status code
      res.send(result.toString());
    };
  
    app.get("/lab5/calculator", calculator);
  
    // Example usage:
    // /lab5/calculator?a=5&b=2&operation=add
  }
  