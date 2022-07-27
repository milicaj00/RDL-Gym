import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"


//update your account
export const azurirajSvojNalog = async (req, res) => {

  if (req.body.registrovaniKorisnikId == req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await RegistrovaniKorisnik.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Azuriran nalog!");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  else {
    return res.status(403).json("Mozete da izmenite samo svoj nalog");
  }
};

export default router;