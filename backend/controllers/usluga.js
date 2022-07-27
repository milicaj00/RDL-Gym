import express from "express";
const router = express.Router();
import Usluga from "../models/Usluga.js"
import {slika} from "./auth.js";


//pregledaj sve usluge
export const  vidiUsluge = async (req, res) => {

    try {
        const usluge = await Usluga.find()
        if (usluge.length != 0) {
            return res.status(200).json(usluge)
        }
        else {
            return res.status(400).json("Nema usluga za prikaz")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

} 

//dodaj uslugu
export const dodajUslugu = async (req, res) => {

  try {
    const pom = await slika(req)

    if (pom === false) {
        console.log('nema slika')
    }

    const usluga = await new Usluga({
      cena: req.body.cena,
      opis: req.body.opis,
      naziv: req.body.naziv,
      trajanje: req.body.trajanje,
      treningGrupni:req.body.treningGrupni,
      slika:pom
    })

    const uslugaSave = await usluga.save()
    return res.status(200).json(uslugaSave)

  }
  catch (err) {
    return res.status(500).json(err);
  }

}

//izmeni uslugu
export const  izmeniUslugu = async (req, res) => {

  try {
    const usluga = await Usluga.findById(req.params.idUsluge)
    if (usluga != null) {
      await usluga.updateOne({ $set: req.body })
      return res.status(200).json(usluga);

    }
    else {
      return res.status(404).json("Usluga nije pronadjena")
    }

  }
  catch (err) {
    return res.status(500).json(err);
  }
}

//obrisi uslugu
export const obrisiUslugu = async (req, res) => {

  try {

    await Usluga.findByIdAndDelete(req.params.idUsluge)
    return res.status(200).json("Usluga je uspesno obrisana")

  }
  catch (err) {
    return res.status(500).json(err);
  }
};

export default router;

