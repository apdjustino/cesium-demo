import { fileURLToPath } from 'url';
import express from "express";
import path from "path";
import { handleGetMaterials } from './handlers/materialHandlers.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// hard code port - in a larger app or production environemnt would use environment variables
const port = 3001;
// use JSON middleware to allow for JSON requests and responses
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});
app.get("/materials", handleGetMaterials);
app.listen(port, () => {
    console.log(`Server is running at https://localhost:3001`);
});
