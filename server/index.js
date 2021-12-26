import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactions.js";
import accountRoutes from "./routes/accounts.js";
const app = express();
// Setting up config file
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/transactions", transactionRoutes);
app.use("/accounts", accountRoutes);
app.get("/",(req, res) => {
  res.send("APP IS RUNNING" )
})

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transaction Management API",
      version: "1.0.0",
      description: "Transaction Api for transaction management",
      contact: {
        name: "ALMOUADEB Anis",
        email: "anis.almouadeb@esprit.tn",
      },
      servers: ["http://localhost:5000"],
      
    },
  },
  apis: ["*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
const PORT = process.env.PORT || 5000;
// setting up database
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
