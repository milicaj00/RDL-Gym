import express from "express";
const router = express.Router();
import Trener from "../models/Trener.js"
import Korisnik from "../models/Korisnik.js"
import Trening from "../models/Trening.js"
import Termin from "../models/Termin.js"
import Zahtev from "../models/Zahtev.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"



//vrati termine za trenera
export const vratiTermineZaTrenera = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const sviTermini = await Termin.find({ trenerId: trener._id })
            return res.status(200).json(sviTermini);
        }
        else {
            return res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
}

//dodajTermin
export const dodajTerminTreneru = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const t = await new Termin({
                trenerId: trener._id,
                datum: req.body.datum,
                vremePocetka: req.body.vremePocetka,
                vremeKraja: req.body.vremeKraja,
                slobodan: true,
                treningId:""
            })

            const terminSave = await t.save()
            return res.status(200).json(terminSave)
        }
        else {
            return res.status(404).json("trener nije pronadjen")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//izmeniTermin
export const zakaziTermin = async (req, res) => {
    try {
        const zakazan = await Termin.findByIdAndUpdate(req.params.idTermina, {
            $set: {
                slobodan: false
            }
        })
        return res.status(200).json(zakazan)

        // const zakazanSave=zakazan.save()
        // res.status(200).json(zakazanSave)

    }
    catch (err) {
        return res.status(500).json(err);
    }
}

//obrisiTermin
export const obrisiTermin = async (req, res) => {
    try {
        await Termin.findByIdAndDelete(req.params.idTermina)
        return res.status(200).json("Uspesno obrisan termin")
    }
    catch (err) {
        return res.status(500).json(err);
    }
};

//vrati slobodne za trenera po datumu
export const vratiSlobodneTermineZaTreneraPoDatumu = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            // const sviTermini=await Termin.find({trenerId:trener._id}, {datum:req.params.datum}, {slobodan: true})
            const sviTermini = await Termin.find({ $and: [{ trenerId: trener._id }, { datum: req.params.datum }, { slobodan: true }] })
            let sviTerminii = []

            for (let i = 0; i < sviTermini.length; i++) {

                let vremee = sviTermini[i]?.vremePocetka
                let samovreme = vremee?.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                let vrati = {
                    vreme: samovreme,
                    idTermina: sviTermini[i]._id
                }
                sviTerminii.push(vrati)
            }
            return res.status(200).json(sviTerminii);
        }
        else {
            return res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
}

//vrati slobodne za trenera po datumu
export const vratiZauzeteTermineZaTreneraPoDatumu = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const sviTermini = await Termin.find({ $and: [{ trenerId: trener._id }, { datum: req.params.datum }, { slobodan: false }] })
            let sviTreninzi = []

            for (let i = 0; i < sviTermini.length; i++) {

                const trening = await Trening.findById(sviTermini[i].treningId)

                if (trening) {

                    const zahtev = await Zahtev.findOne({ $and: [{ treningId: trening._id, status: "Odobreno" }] })
                    const korisnik = await Korisnik.findById(trening.clanovi[0])

                    if (korisnik && zahtev) {

                        const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
                        let vremee = sviTermini[i]?.vremePocetka
                        let samovreme = vremee?.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                        let vrati = {
                            imeK: regK.ime,
                            prezimeK: regK.prezime,
                            trener: trener._id,
                            vreme: samovreme,
                            trajanje: trening.trajanje,
                            intenzitet: trening.intenzitet,
                            tip:trening.tip,
                            treningId: trening._id,
                            korisnikId: korisnik._id
                        }

                        sviTreninzi.push(vrati)
                        console.log(vrati)

                    }
                }
            }
            return res.status(200).json(sviTreninzi);
        }
        else {
            return res.status(404).json("trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
}

export default router;