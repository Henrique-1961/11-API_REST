import dotenv from "dotenv";
import express from "express";
import { selectUsuarios, insertUsuario, deleteUsuario, selectUsuario, updateUsuario } from "./bd.js";

dotenv.config();  

const app = express();              
const port = 3000;         

app.use(express.json());

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

app.get("/usuario/:id", async (req, res) => {
  console.log("Rota GET /usuario solicitada");
  try {
    const usuario = await selectUsuario(req.params.id);
    if (usuario.length > 0) res.json(usuario);
    else res.status(404).json({ message: "Usuário não encontrado!" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.post("/usuario", async (req, res) => {
    console.log("Rota POST /usuario solicitada");
    try {
      console.log(req);
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

app.patch("/usuario", async (req, res) => {
  console.log("Rota PATCH /usuario solicitada");
  try {
    const usuario = await selectUsuario(req.body.id);
    if (usuario.length > 0) {
      await updateUsuario(req.body);
      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } else res.status(404).json({ message: "Usuário não encontrado!" });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message || "Erro!" });
  }
});

app.listen(port, () => {
    console.log(`Serviço escutando na porta:  ${port}`);
});