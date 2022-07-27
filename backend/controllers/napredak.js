import express from "express";
const router = express.Router();
import Trener from "../models/Trener.js"
import Korisnik from "../models/Korisnik.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"
import Napredak from "../models/Napredak.js"

//vidi napredak 
export const vidiNapredakKorisnik = async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {

            const napredak = await Napredak.findById(korisnik.napredakId)

            if (napredak != null) {
                return res.status(200).json(napredak)
            }
            else {
               return res.status(404).json("ne postoji dodat napredak za ovog klijenta")
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

//vidi napredak poslednji
export const vidiNapredakPoslednji = async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {

           const napredak = await Napredak.findById(korisnik.napredakId)
            //res.status(200).json(napredak)

            if (napredak != null) {
                //let vrati = []
                let tr = {
                    tezina: napredak.tezina.slice(-1),
                    tezinaMisica: napredak.tezinaMisica.slice(-1),
                    procenatProteina: napredak.procenatProteina.slice(-1),
                    procenatMasti: napredak.procenatMasti.slice(-1),
                    BMI: napredak.BMI.slice(-1),
                    kostanaMasa: napredak.kostanaMasa.slice(-1),
                    procenatVode: napredak.procenatVode.slice(-1),
                    bodyAge: napredak.bodyAge.slice(-1),
                    datum:napredak.datum.slice(-1)



                }
                //vrati.push(tr)
                return res.status(200).json(tr)
            
            }
            
        
            else {
                return res.status(404).json("ne postoji dodat napredak za ovog klijenta")
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

//dodaj napredak za klijenta
export const dodajNapredak = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {

            const korisnik = await Korisnik.findById(req.params.idKorisnika)
           //res.status(200).json(korisnik)
            if (korisnik != null) {

                const datum=new Date()
                //res.status(200).json(datum)
                let upisdatum=datum.toLocaleDateString()
               



                const napredak = await new Napredak({
                    korisnikId: req.params.idKorisnika,
                    tezina: req.body.tezina,
                    tezinaMisica: req.body.tezinaMisica,
                    procenatProteina: req.body.procenatProteina,
                    procenatMasti: req.body.procenatMasti,
                    BMI: req.body.BMI,
                    kostanaMasa: req.body.kostanaMasa,
                    procenatVode: req.body.procenatVode,
                    bodyAge: req.body.bodyAge,
                    datum:upisdatum

                })

                const napredakSave = await napredak.save();
                res.status(200).json(napredakSave)
                await korisnik.updateOne({ $set: { napredakId: napredak._id } })
            }



            else {
                return res.status(404).json(req.params.idKorisnika + "  Korisnik nije pronadjen")
            }

        }
        else {
            return res.status(404).json("Trener nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//izmeni napredak
export const izmeniNapredak = async (req, res) => {

    try {


        const napredak = await Napredak.findById(req.params.idNapredak)
        //res.status(200).json(req.body)
        //res.status(200).json(napredak)
        if (napredak != null) {

            const datum=new Date()
            let upisdatum=datum.toLocaleDateString()


            const napredaknovi = await napredak.updateOne({
                $push: {
                    tezina: req.body.tezina,
                    tezinaMisica: req.body.tezinaMisica,
                    procenatProteina: req.body.procenatProteina,
                    procenatMasti: req.body.procenatMasti,
                    BMI: req.body.BMI,
                    kostanaMasa: req.body.kostanaMasa,
                    procenatVode: req.body.procenatVode,
                    bodyAge: req.body.bodyAge,
                    datum:upisdatum
                }
            });

            return res.status(200).json(napredaknovi)


        }



        else {
            return res.status(404).json("Napredak nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }

}


//vidi napredak za klijenta
export const vidiNapredak = async (req, res) => {

    try {

        const trener = await Trener.findById(req.params.idTrenera)
        if (trener != null) {
            const korisnik = await Korisnik.findById(req.params.idKorisnika)
           // console.log(korisnik)
            if (korisnik != null) {
              //  if (korisnik.trenerId == trener._id) {
                const napredak = await Napredak.findById(korisnik.napredakId)
                   
                    if (napredak != null) {
                        return res.status(200).json(napredak)
                    }
                    else {
                        return res.status(404).json("ne postoji dodat napredak za ovog klijenta")
                    }

                //}
                // else {
                //     res.status(400).json("mozete videti napredak samo svog klijenta")
                // }

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