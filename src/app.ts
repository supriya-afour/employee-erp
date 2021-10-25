import dotenv from 'dotenv';
import express from "express";
// import bodyParser from "body-parser";
import EmployeeRouter from "./routes/employees.router";

export class App {
  public initialize = async () => {
    dotenv.config();

    const PORT: number = parseInt(process.env.PORT as string, 10);
    const app = express();

    // console.log(process.env.PORT)

    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.json());
    app.use(express.json());

    // First route
    app.get('/', (req, res) => {
      res.send('Hi there, This is Employee ERP System');
    })

    const empRouter = new EmployeeRouter();
    app.use("/employees", empRouter.getRouter());

    app.listen(PORT, () => {
      console.log(`Server running on PORT number ${PORT}`);
    });
  }
}
