import express from "express";
const router = express.Router();
import Evidencija from "../models/Evidencija.js"
import Trener from "../models/Trener.js"
import Korisnik from "../models/Korisnik.js"
import Trening from "../models/Trening.js"
import Termin from "../models/Termin.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"


//dodaj evidenciju
export const izmeniEvidenciju = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const korisnik = await Korisnik.findById(req.body.korisnikId)
            console.log(korisnik)
            const trening = await Trening.findById(req.params.idTreninga)

            if (korisnik != null && trening != null) {

                const ev = await Evidencija.findOne({ korisnikId: korisnik._id })
                console.log(ev)

                const termin = await Termin.findOne({ treningId: trening._id })

                if (ev !== null && termin!== null) {

                        console.log(ev)
            
                        if (termin != null) {

                            const final = await Evidencija.findOneAndUpdate({ korisnikId: korisnik._id }, {
                                $push: {
                                    tipTreninga: trening.tip,
                                    intenziteti: trening.intenzitet,
                                    datumi: termin.datum

                                }
                            })

                            await Trening.findByIdAndDelete(trening._id)
                            await Termin.findByIdAndDelete(termin._id)
                            return res.status(200).json(final)
                        }
                        else return res.status(404).json("termin nije pronadjen")
                    
                }
                else{ return res.status(404).json("Korisnik nije pronadjen")}

            }else {return res.status(404).json("Trener nije pronadjen")}
        }
    }
    catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }

}

//pregledaj evidenciju
export const vidiEvidenciju = async (req, res) => {

    try {


        const trener = await Trener.findById(req.params.idTrenera)
        //return res.status(200).json(trener)
        if (trener != null) {
            //return res.status(200).json(trener)
            const korisnik = await Korisnik.findById(req.params.idKorisnika)
            if (korisnik != null) {
                const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
                if (regK != null) {

                    const evidencija = await Evidencija.findOne({ korisnikId: req.params.idKorisnika })

                    if (evidencija != null) {
                        let vratiDatume = []
                        for (let i = 0; i < evidencija.datumi.length; i++) {
                            let tre = evidencija.datumi[i].toLocaleDateString()
                            vratiDatume.push(tre)
                        }

                        let vrati = {
                            imeKorisnika: regK.ime,
                            prezimeKorisnika: regK.prezime,
                            tipTreninga: evidencija.tipTreninga,
                            intenziteti: evidencija.intenziteti,
                            datumi: vratiDatume
                            //datumi:evidencija.datumi
                        }
                        return res.status(200).json(vrati)
                    }
                    else {
                        return res.status(404).json("ne postoji dodata evidencija za ovog klijenta")
                    }
                }
                else {
                    return res.status(404).json("Nije pronadjen registrovani korisnik")
                }


            }
            else {
                return res.status(404).json("korisnik nije pronadjen")
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

export default router;