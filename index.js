import express from "express";
import dotenv from "dotenv";
import { selectUsuarios } from "./bd.js";

const app = express();              
const port = 3000;  
dotenv.config();            

app.get("/", (req, res) => {        
    res.json({
        nome: "Henrique Cardoso de Souza",     
    });
    console.log("Rota / solicitada");
});

app.get("/usuarios", async (req, res) => {
    console.log("Rota GET/usuarios solicitada");
    try {
        const usuarios = await selectUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

app.listen(port, () => {
    console.log(`Serviço escutando na porta:  ${port}`);
});