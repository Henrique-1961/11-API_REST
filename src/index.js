import dotenv from "dotenv";
dotenv.config();

import express from "express";
import roteadorUsuario from "./routes/usuario.js";


const app = express();              
const port = 3000;         

app.use(express.json());
app.use(roteadorUsuario);

app.get("/", (req, res) => {        
    res.json({
        message: "API para CRUD usuario: https://github.com/Henrique-1961/11-API_REST",     
    });
    console.log("Rota / solicitada");
});

app.listen(port, () => {
    console.log(`Serviço escutando na porta:  ${port}`);
});