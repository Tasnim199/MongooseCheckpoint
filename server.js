import express from "express";
import mongoose from "mongoose";
import contactList from "./models/contactForm.js";

const app=express();
const PORT=5000;

app.use(express.json())



mongoose.connect('mongodb://localhost:27017/contact')
    .then(() => console.log('Connexion à la base de données réussie'))
    .catch(err => console.error('Erreur de connexion à la base de données:', err));


    app.get("/", async (req, res) => {
        try {
            const allData = await contactList.find({ age: { $gt: 18 } });
            res.status(200).send(allData);
        } catch (error) {
            res.status(500).send("Erreur interne du serveur : " + error.message);
        }
    });
    

//crud 
app.post("/add", (req,res)=>{
   


try {
    const newData = new contactList(req.body)
   newData.save();
   res.status(200).send( "new contact added successfully");
} catch (error) {
    res.status(500).send ("invalid request", error)
}});
app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Le serveur fonctionne sur le port 5000");
    }
});