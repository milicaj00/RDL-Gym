import express from "express";
const router = express.Router();
import Zahtev from "../models/Zahtev.js";
import Trening from "../models/Trening.js";
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"
import Korisnik from "../models/Korisnik.js"


//obrisi zahtev
export const obrisiZahtev = async (req, res) => {
  try {
    await Zahtev.findByIdAndDelete(req.params.idZahteva)
    return res.status(200).json("Zahtev je uspesno obrisan")

  }
  catch (err) {
    return res.status(500).json(err);
  }
};



export const vidiZahteve = async (req, res) => {

  try {

    const registrovaniKorisnik = await RegistrovaniKorisnik.findById(req.params.idRegKorisnika)
    if (registrovaniKorisnik != null) {

      const zahtev = await Zahtev.find({ $and: [{ registrovaniKorisnikId: registrovaniKorisnik._id }, { status: req.params.status }] })
      console.log(zahtev)
      if (zahtev != null) {
        return res.status(200).json(zahtev)
      }
      else {
        return res.status(404).json("ne postoji zahtev za trenera")
      }

    }
    else {
      return res.status(404).json("korisnik nije pronadjen")
    }


  }
  catch (err) {
    return res.status(500).json(err);
  }

}



export const vidiZahteveZaKorisnika = async (req, res) => {

  try {

    const registrovaniKorisnik = await RegistrovaniKorisnik.findById(req.params.idRegKorisnika)
    //console.log(req.params.idRegKorisnika)
    //console.log(registrovaniKorisnik)
    if (registrovaniKorisnik != null) {

      const zahtev = await Zahtev.find({ registrovaniKorisnikId: registrovaniKorisnik._id })

      if (zahtev != null) {
        return res.status(200).json(zahtev)
      }
      else {
        return res.status(404).json("ne postoji zahtev za klijenta")
      }

    }
    else {
      return res.status(404).json("korisnik nije pronadjen")
    }


  }
  catch (err) {
    return res.status(500).json(err);
  }

}

//napravi zahtev za treningom i posalji treneru
export const napraviZahtev = async (req, res) => {

  try {
    const trening = await Trening.findById(req.params.idTreninga)
    if (trening != null) {

      const zahtev = await new Zahtev({
        treningId: req.params.idTreninga
      })

      const zahtevSave = await zahtev.save()
      return res.status(200).json(zahtev)

    }
    else {
      return res.status(404).json("Trening nije pronadjen")
    }


  }
  catch (err) {
    return res.status(500).json(err);
  }

}

//vrati listu odbijenih  
export const vratiZahteveTrenera = async (req, res) => {

  try {
    const registrovaniKorisnik = await RegistrovaniKorisnik.findById(req.params.idRegKorisnika)
    if (registrovaniKorisnik != null) {

      const zahtev = await Zahtev.find({ $and: [{ registrovaniKorisnikId: registrovaniKorisnik._id }, { status: { $in: ['Odobreno', 'Ukinuto'] } }] })
      console.log(zahtev)
      if (zahtev != null) {
        return res.status(200).json(zahtev)
      }
      else {
        return res.status(404).json("ne postoji zahtev za trenera")
      }

    }
    else {
      return res.status(404).json("korisnik nije pronadjen")
    }

  }
  catch (err) {
    return res.status(500).json(err);
  }
}

export const napraviZahtevTrener = async (req, res) => {

  try {
    const zahtev = await Zahtev.findById(req.body.idZahteva)

    if (zahtev != null) {
      const korisnik = await Korisnik.findById(req.body.idKorisnika)



      if (korisnik != null) {
        const trening = await Trening.findById(req.body.idTreninga)
        if (trening != null) {
          let datumm = trening.datum
          let datumm1 = datumm.toLocaleDateString()


          const noviZahtev = await Zahtev.findByIdAndUpdate(zahtev._id, {
            $set: {
              poruka: "Predlog izmene treninga za datum: " + datumm1 + " , " + req.body.intenzitet + " ; " + req.body.tip + " ; " + req.body.trajanje,
              registrovaniKorisnikId: korisnik.registrovaniKorisnikId,
              predlog: true,
              status: "Odobreno"
            }
          })
          return res.status(200).json(noviZahtev);

        }
        else {
          return res.status(404).json("Trening nije pronadjen")

        }
      }

      else {
        return res.status(404).json("Korisnik nije pronadjen")
      }
    }
    else {
      return res.status(404).json("Zahtev nije pronadjen")

    }
  }
  catch (err) {
    return res.status(500).json(err);
  }

}



export default router;