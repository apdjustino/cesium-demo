import express,  { Express } from "express";

import { handleGetMaterials, handleAddMaterial, handleDeleteMaterial, handleGetMaterial, handleUpdateMaterial } from './handlers/materialHandlers.js';
import { logRequest, logError } from './logger/config.js';

const app: Express = express();
// hard code port - in a larger app or production environemnt would use environment variables
const port = 3001;

// use JSON middleware to allow for JSON requests and responses
app.use(express.json());

// use winston logger middleware
app.use(logRequest);
app.use(logError);

// Routes 

app.get("/materials", handleGetMaterials);
app.get("/material/:id", handleGetMaterial);
app.delete("/material/:id", handleDeleteMaterial);
app.put("/material/:id", handleUpdateMaterial);
app.post("/material", handleAddMaterial);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:3001`);
})