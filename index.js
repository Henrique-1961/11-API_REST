import dotenv from "dotenv";
import express from "express";
import { selectUsuarios } from "./bd.js";

dotenv.config();  

const app = express();              
const port = 3000;         

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

app.post("/usuario", async (req, res) => {
    console.log("Rota POST /usuario solicitada");
    try {
      await insertUsuario(req.body);
      res.status(201).json({ message: "Usuário inserido com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

app.delete("/usuario/:id", async (req, res) => {
    console.log("Rota DELETE /usuario solicitada");
    try {
      await deleteUsuario(req.params.id);
      res.status(204).json({ message: "Usuário excluido com sucesso!" });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Erro!" });
    }
});

app.listen(port, () => {
    console.log(`Serviço escutando na porta:  ${port}`);
});