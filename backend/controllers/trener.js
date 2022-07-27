import express from "express";
const router = express.Router();
import Trener from "../models/Trener.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"
import { slika } from "./auth.js";



//dodaj profilnu sliku
export const dodajSliku = async (req, res) => {

    try {
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, { $set: { slika: req.body.slika } })
        return res.status(200).json(trener)

    }
    catch (err) {
        return res.status(500).json(err);
    }

};

//dodaj opis
export const dodajOpis = async (req, res) => {

    try {
        const trener = await Trener.findOneAndUpdate(req.params.idTrenera, { $set: { opis: req.body.opis } })
        return res.status(200).json(trener)

    }
    catch (err) {
        return res.status(500).json(err);
    }

};


//pogledaj sve trenere
export const vidiTrenereSvi = async (req, res) => {

    try {
        const trener = await Trener.find()
        //res.status(200).json(trener)
        if (trener.length != 0) {
            let treneri = []
            for (let i = 0; i < trener.length; i++) {
                const t = await RegistrovaniKorisnik.findById(trener[i].registrovaniKorisnikId)
                let tr = {
                    id: trener[i]._id,
                    ime: t?.ime,
                    prezime: t?.prezime,
                    brojtelefona:t?.brojTelefona,
                    opis: trener[i].opis,
                    slika: trener[i].slika,
                    sertifikati: trener[i].sertifikati,
                    iskustvo: trener[i].iskustvo,
                    email: t?.email,
                    // registrovaniKorisnikId:trener[i].registrovaniKorisnikId
                }


                treneri.push(tr)
                //res.status(200).json(treneri)
            }
            return res.status(200).json(treneri)
        }

        else {
            return res.status(404).json("Nema trenera za prikaz")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//dodaj trenera
export const dodajTrenera = async (req, res) => {
  try {

    const pom = await slika(req)
    
    if (pom === false) {
        console.log('nema slika')
       // return res.status(500).json('greska prilikom unosa slike');
    }

    const kor = await RegistrovaniKorisnik.findById(req.params.id);
    if (kor != null) {
      const noviTrener = await new Trener({
        registrovaniKorisnikId: kor._id,
        iskustvo: req.body.iskustvo,
        sertifikati: req.body.sertifikati,
        slika: pom,
        opis: req.body.opis,
        drzigrupne: req.body.drzigrupne

      })
      const trenerSave = await noviTrener.save()
      return res.status(200).json(trenerSave)
    }

    else {
      return res.status(404).json("Nije nadjen registrovani korisnik");
    }

  }
  catch (err) {
    return res.status(500).json(err);
  }

};

//obrisi trenera
export const obrisiTrenera = async (req, res) => {

  try {

    const trener=await Trener.findById(req.params.idTrenera)
    //res.status(200).json(korisnik)
      await RegistrovaniKorisnik.findByIdAndDelete(trener.registrovaniKorisnikId)
      await Trener.findByIdAndDelete(trener._id)
      return res.status(200).json("Account has been deleted");
    

  }
  catch (err) {
    return res.status(500).json(err);
  }
};

export default router;