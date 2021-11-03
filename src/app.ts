import dotenv from 'dotenv';
import express from "express";
import EmployeeRouter from "./routes/employees.router";
import http from "http";

export default class App {
  public initialize = async (): Promise<http.Server> => {
    dotenv.config();

    const PORT: number = parseInt(process.env.PORT as string, 10);
    const app = express();
    app.use(express.json());

    // First route
    app.get('/', (req, res) => {
      res.send('This is Employee ERP System');
    })

    const empRouter = new EmployeeRouter();
    app.use("/employees", empRouter.getRouter());

    return app.listen(PORT, () => {
      console.log(`Server running on PORT number ${PORT}`);
    });
  }
}
