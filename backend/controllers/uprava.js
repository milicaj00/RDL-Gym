import express from "express";
const router = express.Router();
import Uprava from "../models/Uprava.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"

//update bilo kog korisnika
export const upravaUpdate = async (req, res) => {

  const uprava = await RegistrovaniKorisnik.findById(req.params.id);

  if (uprava.tipKorisnika == "Uprava") {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await RegistrovaniKorisnik.findByIdAndUpdate(req.body.registrovaniKorisnikId, {
        $set: req.body,
      });
      res.status(200).json("Izmenjeno!");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  else {
    return res.status(403).json("Ne mozete da izmenite");
  }
};



//dodaj upravu
export const dodajUpravu = async (req, res) => {
  try {

    const kor = await RegistrovaniKorisnik.findById(req.params.id);
    if (kor != null) {
      const novaUprava = await new Uprava({
        registrovaniKorisnikId: kor._id

      })
      const upravaSave = await novaUprava.save()
      return res.status(200).json(upravaSave)
    }

    else {
      return res.status(404).json("Nije nadjen registrovani korisnik");
    }

  }
  catch (err) {
    return res.status(500).json(err);
  }

};

//obrisi upravu 
export const obrisiUpravu = async (req, res) => {

  try {

    const uprava=await Uprava.findById(req.params.idUprave)
    //res.status(200).json(korisnik)
      await RegistrovaniKorisnik.findOneAndDelete({_id:uprava.registrovaniKorisnikId})
      await Uprava.findOneAndDelete({_id:uprava._id})
      return res.status(200).json("Account has been deleted");
    

  }
  catch (err) {
    return res.status(500).json(err);
  }
};

export default router;
