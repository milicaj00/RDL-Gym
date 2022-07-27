import express from "express";
const router = express.Router();
import Trener from "../models/Trener.js"
import Korisnik from "../models/Korisnik.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"
import Clanarina from "../models/Clanarina.js"

//izmeni parametre
export const izmeniParametre= async (req, res) => {
    try {

        const korisnik = await Korisnik.findByIdAndUpdate(req.params.idKorisnika, { $set: req.body })
        console.log(korisnik)

        return res.status(200).json(korisnik);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}

//dodaj korisnika
export const dodajKorisnika = async (req, res) => {


    try {


        const trener = await Trener.findById(req.params.id);
        if (trener != null) {

            const kor = await Korisnik.findById(req.params.korid);
            if (kor != null) {
                await kor.updateOne({
                    $set:
                    {
                        visina: req.body.visina,
                        zeljenaTezina: req.body.zeljenaTezina,
                        zeljeniProcenatMasti: req.body.zeljeniProcenatMasti,
                        zeljenaTezinaMisica: req.body.zeljenaTezinaMisica,
                        zeljeniProcenatProteina: req.body.zeljeniProcenatProteina,
                        brojGodina: req.body.brojGodina
                    }
                })



                await kor.updateOne({ trenerId: trener._id })
                await trener.updateOne({ $push: { listaKlijenata: kor._id } });
                return res.status(200).json(kor);

            }
            else {
                return res.status(404).json("Nije nadjen korisnik");
            }

        }
        else {
            return res.status(404).json("Nije nadjen trener");
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }

};

//izmeni korisnika
export const izmeniKorisnika = async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.id)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.body.korisnikId)
            if (korisnik != null) {

                if (trener.listaKlijenata.includes(korisnik._id)) {
                    await korisnik.updateOne({ $set: req.body })
                    return res.status(200).json(korisnik);

                }
                else {
                    return res.status(400).json("Mozete menjati samo svoje klijente");
                }

            }
            else {
                return res.status(404).json("Nije pronadjen korisnik")
            }

        }
        else {
            return res.status(404).json("Nije pronadjen trener")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
};

// obrisi svog klijenta
export const obrisiSvogKlijenta = async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.id)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.body.korisnikId)
            if (korisnik != null) {

                if (trener.listaKlijenata.includes(korisnik._id)) {
                    await trener.updateOne({ $pull: { listaKlijenata: korisnik._id } });
                    await korisnik.updateOne({ $set: { trenerId: null } })
                    return res.status(200).json("Uspesno obrisan klijent");

                }
                else {
                    return res.status(400).json("Ovaj korisnik nije vas klijent");
                }

            }
            else {
                return res.status(404).json("Nije pronadjen korisnik")
            }

        }
        else {
            return res.status(404).json("Nije pronadjen trener")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
};


//vrati svoje klijente
export const vratiKorisnike = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const lista = trener.listaKlijenata;

            if (lista != null) {
                //res.status(200).json(lista)
                let vrati = []
                for (let i = 0; i < lista.length; i++) {
                    const korisnik = await Korisnik.findById(lista[i])
                    //res.status(200).json(korisnik)
                    const regT = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)


                    let tr =
                    {

                        imeK: regT.ime,
                        prezimeK: regT.prezime,
                        brojtelefonaK: regT.brojTelefona,
                        email: regT.email,
                        idkorisnika: lista[i],
                        napredakId: korisnik.napredakId,
                        zeljenaTezina:korisnik.zeljenaTezina,
                        zeljeniProcenatMasti:korisnik.zeljeniProcenatMasti,
                        zeljenaTezinaMisica:korisnik.zeljenaTezinaMisica,
                        zeljeniProcenatProteina:korisnik.zeljeniProcenatProteina



                    }
                    vrati.push(tr)

                }

                return res.status(200).json(vrati)

            }
            else {
                return res.status(404).json("nema nijednog korisnika")
            }

        }
        else {
            return res.status(404).json("trener nije pronadjen")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//obrisi korisnika 
export const obrisiKorisnika = async (req, res) => {

  try {
  const uprava = await RegistrovaniKorisnik.findById(req.params.id);
  if (uprava.tipKorisnika == "Uprava") {

    const korisnik=await Korisnik.findById(req.query.korisnikId)

    if(korisnik!=null)
    {
    //res.status(200).json(korisnik)
      await RegistrovaniKorisnik.findByIdAndDelete(korisnik.registrovaniKorisnikId)
      await Korisnik.findByIdAndDelete(korisnik._id)
      return res.status(200).json("Korisnik je obrisan");
    }
    else
    {
      return res.status(404).json("Korisnik nije pronadjen")
    }
  }

  }
  catch (err) {
    return  res.status(500).json(err);
  }
};

//VERIFIKUJ I NAPRAVI CLANARINU 
export const verifikujNalog = async (req, res) => {

  try {
    const korisnik = await Korisnik.findByIdAndUpdate(req.params.idKorisnika, { $set: { verifikovan: true } })

    const clanarina = await new Clanarina({
      datumUplate: new Date(),
      trajanje: 0,
      vaziDo: new Date(),

      // korisnikId: req.params.idKorisnika
    })
    const clanarinaSave = await clanarina.save()
    //res.status(200).json(clanarinaSave)

    await korisnik.updateOne({ $set: { clanarinaId: clanarinaSave._id } })

    return res.status(200).json(korisnik);
  }

  catch (err) {
    return res.status(500).json(err);
  }

}

//vrati verifikovane naloge
export const vratiVerifikovaneNaloge = async (req, res) => {

  try {
    const korisnici = await Korisnik.find({ verifikovan: true })
    if (korisnici != null) {

      let vrati = []
      for (let i = 0; i < korisnici.length; i++) {
        const regKorisnik = await RegistrovaniKorisnik.findById(korisnici[i].registrovaniKorisnikId)
        if(regKorisnik!=null)
        {

        const clanarina = await Clanarina.findById(korisnici[i].clanarinaId)
        if(clanarina!=null)
        {

        let kor = {
          id: korisnici[i]._id,
          ime: regKorisnik.ime,
          prezime: regKorisnik.prezime,
          email: regKorisnik.email,
          clanarinaDo: clanarina.vaziDo ? clanarina.vaziDo.toLocaleDateString() : 0
        }
        vrati.push(kor)
      }
      }
      }
     return res.status(200).json(vrati)
    }
    else {
      return res.status(404).json("nema verifikovanih korisnika")
    }

  }
  catch (err) {
    return res.status(500).json(err);
  }

}

//vrati neverifikovane naloge
export const vratiNeverifikovaneNaloge = async (req, res) => {

  try {

    const korisnici = await Korisnik.find({ verifikovan: false })
    if (korisnici != null) {

      let vrati = []
      for (let i = 0; i < korisnici.length; i++) {
        const regKorisnik = await RegistrovaniKorisnik.findById(korisnici[i].registrovaniKorisnikId)
        if(regKorisnik!=null)
        {

        let kor = {
          id: korisnici[i]._id,
          ime: regKorisnik.ime,
          prezime: regKorisnik.prezime,
          email: regKorisnik.email
        }
        vrati.push(kor)
      }
      
      }
      return res.status(200).json(vrati)
    }
    else {
      return res.status(404).json("nema neverifikovanih korisnika")
    }

  }
  catch (err) {
    return res.status(500).json(err);
  }

}


export default router;