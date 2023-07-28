import express from "express";  
const app = express();              
const port = 3000;             

app.get("/", (req, res) => {        
    res.json({
        nome: "Henrique Cardoso de Souza",     
    });
    console.log("Rota / solicitada");
});

app.listen(port, () => {
    console.log(`Serviço escutando na porta:  ${port}`);
});