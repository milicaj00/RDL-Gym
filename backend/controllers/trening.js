import express from "express";
const router = express.Router();
import Trener from "../models/Trener.js"
import Korisnik from "../models/Korisnik.js"
import Trening from "../models/Trening.js"
import Termin from "../models/Termin.js"
import RegistrovaniKorisnik from "../models/RegistrovaniKorisnik.js"
import Zahtev from "../models/Zahtev.js"
import Evidencija from "../models/Evidencija.js"
import Clanarina from "../models/Clanarina.js"
import Usluga from "../models/Usluga.js";

//zakazi personalni trening
export const zakaziPersonalniTrening = async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika)

        if (korisnik != null) {
            console.log(korisnik)

            if ((!korisnik.verifikovan && !korisnik.probniTrening) || korisnik.verifikovan) {
                //  const clanarina = await Clanarina.findById(korisnik.clanarinaId)

                // if (clanarina === null) {
                //     res.status(404).json("Clanarina nije pronadjena")
                //     return
                // }
                // const danas = new Date()

                // if (new Date(clanarina.vaziDo) > danas) {

                const trenerKorisnika = await Trener.findById(req.params.idTrenera)

                const novitrening = await new Trening({
                    datum: req.body.datum,
                    tip: req.body.tip,
                    intenzitet: req.body.intenzitet,
                    trajanje: req.body.trajanje,
                    isOnline: req.body.isOnline,
                    brojMaxClanova: 1,
                    trenerId: trenerKorisnika._id

                })

                const trening = await novitrening.save();
                const noviZahtev = await new Zahtev({
                    treningId: trening._id,
                    registrovaniKorisnikId: trenerKorisnika.registrovaniKorisnikId
                })
                const zahtevSave = await noviZahtev.save()

                const evidencija = await Evidencija.findOne({ korisnikId: korisnik._id })
                console.log(noviZahtev)
                if (evidencija === null) {
                    const novaEv = await new Evidencija({
                        korisnikId: korisnik._id,
                        brojTreninga: 0
                    })
                    const evidencijaSave = await novaEv.save()
                }

                await trening.updateOne({ $push: { clanovi: req.params.idKorisnika } })

                await trenerKorisnika.updateOne({ $push: { listaTreninga: trening._id } })
                if (!trenerKorisnika.listaKlijenata.includes(req.params.idKorisnika)) {
                    await trenerKorisnika.updateOne({ $push: { listaKlijenata: korisnik._id } })

                }
                const azuriranTermin = await Termin.findByIdAndUpdate(req.params.idTermina, {
                    $set:
                    {
                        slobodan: false,
                        treningId: trening._id
                        // trenerId: trenerKorisnika._id
                    }
                })

                await korisnik.updateOne({ $set: { probniTrening: true } })

                return res.status(200).json(trening);
                //}
                // else {
                //     return res.status(405).json("Istekla vam je clanarina!")
                // }
            }
            else {
                return res.status(405).json("Mozete zakazati samo jedan probni trening!")
            }
        }
        else {
            return res.status(404).json("Korisnik nije pronadjen")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }

}

//izmeni trening
export const izmeniTrening = async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika);

        if (korisnik != null) {
            const regkor = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
            const trening = await Trening.findById(req.params.idTreninga)
            const trener = await Trener.findById(trening.trenerId)
            if (trening != null) {
                let datumm = trening.datum
                let datumm1 = datumm.toLocaleDateString()
                if (trening.clanovi.includes(korisnik._id)) {
                    await trening.updateOne({ $set: req.body })
                    const noviZahtev = await new Zahtev({
                        treningId: trening._id,
                        poruka: "Korisnik " + regkor.ime + " " + regkor.prezime + " je izmenio trening za datum: " + datumm1,
                        registrovaniKorisnikId: trener.registrovaniKorisnikId,
                        status: "Odobreno"
                    })
                    const zahtevSave = await noviZahtev.save()
                    return res.status(200).json(trening);
                }
                else {
                    return res.status(400).json("Mozete izmeniti samo svoj personalni trening")
                }

            }
            else {
                return res.status(404).json("Trening nije pronadjen")
            }

        }
        else {
            return res.status(404).json("Korisnik nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
}

//ukini trening
export const ukiniTrening = async (req, res) => {

    try {
        const trening = await Trening.findById(req.params.idTreninga)


        let datumm = trening.datum
        let datumm1 = datumm.toLocaleDateString()
        if (trening != null) {

            const trener = await Trener.findById(trening.trenerId)
            const korisnik = await Korisnik.findById(trening.clanovi[0])
            const regkor = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)

            const noviZahtev = await Zahtev.findOneAndUpdate({ treningId: req.params.idTreninga }, {
                $set: {
                    poruka: "Postovani, otkazujem trening za  " + datumm1 + " " + ".Korisnik: " + regkor?.ime + " " + regkor?.prezime,
                    status: "Ukinuto",
                    registrovaniKorisnikId: trener.registrovaniKorisnikId
                }
            })
            const termin = await Termin.findOneAndUpdate({ treningId: req.params.idTreninga }, {
                $set: {
                    slobodan: true,
                    treningId: ""
                }
            })
            await Trening.findByIdAndDelete(req.params.idTreninga)
            return res.status(200).json("Zavrseno")
        }
        else {
            return res.status(400).json("Nije pronadjen trening")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
};

export const vidiZakazaneTreningePersonalni = async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)

        //res.status(200).json(korisnik)
        if (korisnik != null) {
            const treninzi = await Trening.find({ $and: [{ clanovi: req.params.idKorisnika }, { brojMaxClanova: 1 }] })



            //const treninzi = await Trening.find( {clanovi:req.params.idKorisnika })
            if (treninzi.length != 0) {
                //res.status(200).json(treninzi)
                treninzi.sort((a, b) => new Date(a.datum) - new Date(b.datum));
                //return res.status(200).json(treninzi)



                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    const trener = await Trener.findById(treninzi[i].trenerId)
                    if (trener) {
                        const regT = await RegistrovaniKorisnik.findById(trener.registrovaniKorisnikId)

                        if (regT) {
                            const zahtev = await Zahtev.findOne({ treningId: treninzi[i]._id })



                            let datum = treninzi[i].datum;

                            let samoDatum = datum.toLocaleDateString()
                            let vremee = treninzi[i].datum;

                            let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });


                            if (datum >= new Date()) {
                                //return res.status(200).json("OK")



                                let tr = {

                                    imeT: regT.ime,
                                    prezimeT: regT.prezime,
                                    brojtelefonaT: regT.brojTelefona,
                                    datum: samoDatum,
                                    vremeee: samovreme,
                                    tip: treninzi[i].tip,
                                    intenzitet: treninzi[i].intenzitet,
                                    trajanje: treninzi[i].trajanje,
                                    id: treninzi[i]._id,
                                    isOnline: treninzi[i].isOnline,
                                    status: zahtev ? zahtev.status : 'Odobreno'
                                    //status:treninzi[i].status
                                }
                                //res.status(200).json(tr);
                                vrati.push(tr)

                            }

                        }
                    }
                }
                return res.status(200).json(vrati)
                //res.status(200).json(zahtev)
            }
            else {
                return res.status(404).json("nema nijedan zakazani personalni trening")
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



//vidi sve zakazane treninge 
export const vidiZakazaneTreningeSve = async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {
            const treninzi = await Trening.find({ clanovi: korisnik._id })
            //const treninzi = await Trening.find( {clanovi:korisnik._id })

            if (treninzi.length != 0) {


                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    const trener = await Trener.findById(treninzi[i].trenerId)
                    const regT = await RegistrovaniKorisnik.findOne({ _id: trener.registrovaniKorisnikId })
                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].datum;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });


                    let tr = {

                        imeT: regT.ime,
                        prezimeT: regT.prezime,
                        brojtelefonaT: regT.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        tip: treninzi[i].tip,
                        intenzitet: treninzi[i].intenzitet,
                        trajanje: treninzi[i].trajanje,
                        id: treninzi[i]._id,
                        isOnline: treninzi[i].isOnline

                    }
                    vrati.push(tr)
                }
                return res.status(200).json(vrati)


            }
            else {
                return res.status(404).json("nema nijedan zakazani personalni trening")
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

//pregledaj sve zakazane treninge grupne
export const vidiZakazaneTreningeGrupni = async (req, res) => {

    try {

        const korisnik = await Korisnik.findById(req.params.idKorisnika)
        if (korisnik != null) {
            const treninzi = await Trening.find({ $and: [{ clanovi: korisnik._id }, { brojMaxClanova: { $gte: 2 } }] })
            //const treninzi = await Trening.find( {clanovi:korisnik._id })

            if (treninzi.length != 0) {


                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    const trener = await Trener.findById(treninzi[i].trenerId)
                    const regT = await RegistrovaniKorisnik.findOne({ _id: trener?.registrovaniKorisnikId })
                    const usluga = await Usluga.findById(treninzi[i].uslugaId)
                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].vreme;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                    let tr = {

                        imeT: regT?.ime,
                        prezimeT: regT?.prezime,
                        brojtelefonaT: regT?.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        nazivGrupnogTreninga: usluga?.naziv,
                        intenzitet: treninzi[i].intenzitet,
                        trajanje: treninzi[i].trajanje,
                        id: treninzi[i]._id,
                        isOnline: treninzi[i].isOnline
                    }
                    vrati.push(tr)
                }
                return res.status(200).json(vrati)


            }
            else {
                return res.status(404).json("nema nijedan zakazani grupni trening")
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
//prijavi se za grupni trening 
export const prijavaGrupniTrening = async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika)

        if (korisnik != null) {
            if (korisnik.verifikovan) {

                const tr = await Trening.findById(req.params.idTreninga)
                if (tr != null) {

                    const usluga = await Usluga.findById(tr.uslugaId)
                    if (usluga != null) {

                        const clanarina = await Clanarina.findById(korisnik.clanarinaId)


                        if (clanarina != null) {


                            if (usluga._id.toString() === clanarina.uslugaId) {
                                
                                if (tr.clanovi.length < tr.brojMaxClanova) {
                                    if(!tr.clanovi.includes(korisnik._id))
                                    {
                                        await tr.updateOne({ $push: { clanovi: korisnik._id } })

                                        return res.status(200).json(tr);
                                    }
                                    else{
                                        return res.status(400).json("Vec ste prijavljeni na ovaj trening")
                                    }
                                    //res.status(200).json(brojTren)
                                    
                                }
                                else {
                                    return res.status(404).json("Nema mesta u ovom terminu!")
                                }
                            }
                            else {
                                return res.status(400).json("Nemate uplacenu clanarinu za ovu uslugu!")
                            }
                        }
                        else {
                            return res.status(404).json("Nije pronadjena clanarina")
                        }




                    }
                    else {
                        return res.status(200).json("Usluga nije pronadjena")
                    }

                }

                else {
                    return res.status(404).json("Trening nije pronadjen")

                }
            }
            else {
                return res.status(404).json("Vas nalog nije verifikovan!")

            }
        }

        else {
            return res.status(404).json("Korisnik nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//pregledaj sve dostupne grupne treninge
export const vidiGrupneTreninge = async (req, res) => {

    try {
        //res.status(200).json("OK")

        const treninzi = await Trening.find({ $and: [{ uslugaId: req.params.idUsluge }, { datum: req.params.datum }] })
        if (treninzi.length != 0) {
            let vrati = []
            for (let i = 0; i < treninzi.length; i++) {
                const trener = await Trener.findById(treninzi[i].trenerId)
                if (trener != null) {


                    const regT = await RegistrovaniKorisnik.findById(trener.registrovaniKorisnikId)
                    if (regT != null) {

                        let datum = treninzi[i].datum;
                        let samoDatum = datum.toLocaleDateString()
                        let vremee = treninzi[i].vreme;
                        let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                        //const usluga=await Usluga.findbyId(treninzi[i].uslugaId)
                        let brojzauzetih = treninzi[i].clanovi.length
                        let slobodanbroj = treninzi[i].brojMaxClanova - brojzauzetih;
                        if(slobodanbroj !== 0){
                            let tr = {

                                imeT: regT.ime,
                                prezimeT: regT.prezime,
                                //nazivUsluge:usluga.naziv,
                                datum: samoDatum,
                                vreme: samovreme,
                                nazivGrupnogTreninga: treninzi[i].nazivGrupnogTreninga,
                                intenzitet: treninzi[i].intenzitet,
                                trajanje: treninzi[i].trajanje,
                                brojslobodnih: slobodanbroj,
                                treningID: treninzi[i]._id
                            }
                            vrati.push(tr)
                        }
                    }
                    else {
                        return res.status(404).json("Nije pronadjen registrovani korisnik")


                    }
                }

                else {
                    return res.status(404).json("Nije pronadjen trener")

                }
                return res.status(200).json(vrati)
            }


        }
        else {
            return res.status(404).json("nema zakazanih treninga")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//pregledaj grupne treninge, al tipove, po usluzi se vraca
export const vidiGrupneUsluge = async (req, res) => {

    try {
        const usluge = await Usluga.find({ treningGrupni: true })
        if (usluge.length != 0) {
            return res.status(200).json(usluge)
        }
        else {
            return res.status(400).json("Nema treninga za prikaz")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

export const vidiTreningeZaUslugu = async (req, res) => {

    try {
        const treninzi = await Trening.find({ $and: [{ uslugaId: req.params.idUsluge }, { datum: req.params.datum }] })
        if (treninzi.length != 0) {
            return res.status(200).json(treninzi)
        }
        else {
            return res.status(400).json("Nema treninga za prikaz")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//zakazi grupni trening
export const zakaziGrupniTrening = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id)
        //const regT = await RegistrovaniKorisnik.findOne({_id:trener.registrovaniKorisnikId})
        //const usluga=await Usluga.findById(req.params.id)
        //res.status(200).json(regT);
        if (trener != null) {

            const novitrening = await new Trening({


                //imeT:regT.ime,
                //prezimeT:regT.prezime,
                datum: req.body.datum,
                vreme: req.body.vreme,
                nazivGrupnogTreninga: req.body.nazivGrupnogTreninga,
                intenzitet: req.body.intenzitet,
                trajanje: req.body.trajanje,
                brojMaxClanova: req.body.brojMaxClanova,
                trenerId: trener._id,
                uslugaId: req.params.idUsluge

            })

            const trening = await novitrening.save();
            await trener.updateOne({ $push: { listaTreninga: trening._id } });
            return res.status(200).json(trening);
        }
        else {
            return res.status(404).json("Trener nije pronadjen")
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//vrati svoje treninge personalni 
export const vratiTreningePersonalni = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const zahtev = await Zahtev.find({ status: "Odobreno" })

            const treninzi = await Trening.find({ $and: [{ trenerId: req.params.id }, { brojMaxClanova: 1 }, { _id: zahtev.idTreninga }] })

            if (treninzi.length != 0) {


                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    const korisnik = await Korisnik.findById(treninzi[i].clanovi[0])
                    const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)

                    //const zahtev = await Zahtev.find({ treningId: treninzi[i]._id })

                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].datum;
                    let samovreme = vremee.toLocaleTimeString()

                    let tr = {

                        imeT: regK.ime,
                        prezimeT: regK.prezime,
                        brojtelefonaT: regK.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        tip: treninzi[i].tip,
                        intenzitet: treninzi[i].intenzitet,
                        trajanje: treninzi[i].trajanje,
                        id: treninzi[i]._id,
                        isOnline: treninzi[i].isOnline

                    }
                    vrati.push(tr)
                }
                return res.status(200).json(vrati)


            }
            else {
                return res.status(404).json("nema zakazane personalne treninge")
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

//vrati trening personalni na cekanju
export const vratiTreningePersonalniC = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const zahtevi = await Zahtev.find({ status: "Na cekanju" })
            if (zahtevi.length != null) {
                let vrati = [];
                for (let i = 0; i < zahtevi.length; i++) {
                    const trening = await Trening.findOne({ _id: zahtevi[i].treningId })
                    if (trening != null && trening.trenerId == trener._id && trening.brojMaxClanova == 1) {

                        vrati.push({ trening: trening, idZahteva: zahtevi[i]._id })

                    }
                }

                let vratiSve = []

                vrati.sort((a, b) => new Date(a.trening.datum) - new Date(b.trening.datum));


                for (let i = 0; i < vrati.length; i++) {

                    const korisnik = await Korisnik.findById(vrati[i].trening.clanovi[0])
                    const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)

                    //const zahtev = await Zahtev.find({ treningId: treninzi[i]._id })

                    let datum = vrati[i].trening.datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = vrati[i].trening.datum;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                    let tr = {
                        idKorisnika: korisnik._id,
                        imeT: regK.ime,
                        prezimeT: regK.prezime,
                        brojtelefonaT: regK.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        tip: vrati[i].trening.tip,
                        intenzitet: vrati[i].trening.intenzitet,
                        trajanje: vrati[i].trening.trajanje,
                        idTreninga: vrati[i].trening._id,
                        isOnline: vrati[i].isOnline,
                        idZahteva: vrati[i].idZahteva,
                        status: "Na cekanju",
                        isOnline: vrati[i].trening.isOnline
                    }
                    vratiSve.push(tr)

                }
                return res.status(200).json(vratiSve)

            }
            else {
                return res.status(200).json("Zahtevi na cekanju nisu pronadjeni")
            }


        }
        else {
            return res.status(200).json("Trener nije pronadjen")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//vrati svoje treninge Grupne
export const vratiTreningeGrupni = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const treninzi = await Trening.find({ $and: [{ trenerId: req.params.id }, { datum: req.params.datum }, { brojMaxClanova: { $gte: 2 } }] })


            if (treninzi.length != 0) {


                let vrati = []
                for (let i = 0; i < treninzi.length; i++) {
                    let datum = treninzi[i].datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = treninzi[i].vreme;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });
                    let brojzauzetih = treninzi[i].clanovi.length
                    //let slobodanbroj = treninzi[i].brojMaxClanova - brojzauzetih;

                    let tr = {

                        datum: samoDatum,
                        vreme: samovreme,
                        nazivGrupnogTreninga: treninzi[i].nazivGrupnogTreninga,
                        intenzitet: treninzi[i].intenzitet,
                        trajanje: treninzi[i].trajanje,
                        id: treninzi[i]._id,
                        isOnline: treninzi[i].isOnline,
                        brojslobodnih: brojzauzetih + "/" + treninzi[i].brojMaxClanova
                    }
                    vrati.push(tr)
                }
                return res.status(200).json(vrati)


            }
            else {
                return res.status(404).json("nema zakazane grupne treninge")
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

//prihvati trening
export const prihvatiTrening = async (req, res) => {

    try {
        const zahtev = await Zahtev.findById(req.params.idZahteva)
        //const trening = await Trening.findById(zahtev.treningId)
        //res.status(200).json(zahtev)
        const trening = await Trening.findById(zahtev.treningId)
        console.log(trening)

        const korisnik = await Korisnik.findById(trening.clanovi[0])
        //const regKorisnik = await RegistrovaniKorisnik.findById(korisnik.re)
        console.log(korisnik)
        let datumm = trening.datum
        let datumm1 = datumm.toLocaleDateString()
        const noviZahtev = await Zahtev.findByIdAndUpdate(zahtev._id, {
            $set: {
                poruka: "Postovani, vas trening za " + datumm1 + " je odobren",
                status: "Odobreno",
                registrovaniKorisnikId: korisnik.registrovaniKorisnikId
            }
        })

        return res.status(200).json(noviZahtev);


    }
    catch (err) {
        //console.log(err)
        return res.status(500).json(err);
    }
};

//odbij trening, ovo bi trebalo da bude funkcija koja se zove i za ukidanje treninga
export const odbijTrening = async (req, res) => {

    try {
        const zahtev = await Zahtev.findById(req.params.idZahteva)
        const trening = await Trening.findById(zahtev.treningId)
        //res.status(200).json(trening)
        const termin = await Termin.findOne({ treningId: trening._id })
        const korisnik = await Korisnik.findById(trening.clanovi[0])
        //res.status(200).json(termin)
        let datumm = trening.datum
        let datumm1 = datumm.toLocaleDateString()

        const noviZahtev = await Zahtev.findByIdAndUpdate(req.params.idZahteva, {
            $set: {
                poruka: "Postovani, vas trening za " + datumm1 + " je odbijen",
                status: "Odbijeno",
                registrovaniKorisnikId: korisnik.registrovaniKorisnikId
            }
        })

        await Trening.findByIdAndDelete(zahtev.treningId)


        const noviTermin = await Termin.findByIdAndUpdate(termin._id, {
            $set: {
                slobodan: true,
                treningId: ""

            }
        })

        return res.status(200).json("Zavrseno")
    }
    catch (err) {
        return res.status(500).json(err);
    }
};



//vrati treninge personalne odbijene
export const vratiTreningePersonalniO = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.id);
        if (trener != null) {
            const zahtevi = await Zahtev.find({ status: "Ukinuto" })
            if (zahtevi.length != null) {
                let vrati = [];
                for (let i = 0; i < zahtevi.length; i++) {
                    const trening = await Trening.findOne({ _id: zahtevi[i].treningId })
                    if (trening != null && trening.trenerId == trener._id && trening.brojMaxClanova == 1) {
                        vrati.push({ trening: trening, idZahteva: zahtevi[i]._id })
                    }
                }

                let vratiSve = []



                for (let i = 0; i < vrati.length; i++) {

                    const korisnik = await Korisnik.findById(vrati[i].trening.clanovi[0])
                    const regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)

                    //const zahtev = await Zahtev.find({ treningId: treninzi[i]._id })

                    let datum = vrati[i].trening.datum;
                    let samoDatum = datum.toLocaleDateString()
                    let vremee = vrati[i].trening.datum;
                    let samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });

                    let tr = {

                        imeT: regK.ime,
                        prezimeT: regK.prezime,
                        brojtelefonaT: regK.brojTelefona,
                        datum: samoDatum,
                        vreme: samovreme,
                        tip: vrati[i].trening.tip,
                        intenzitet: vrati[i].trening.intenzitet,
                        trajanje: vrati[i].trening.trajanje,
                        idTreninga: vrati[i].trening._id,
                        isOnline: vrati[i].isOnline,
                        idZahteva: vrati[i].idZahteva,
                        status: "Odbijeno"

                    }
                    vratiSve.push(tr)

                }
                return res.status(200).json(vratiSve)

            }
            else {
                return res.status(200).json("Odbijeni zahtevi nisu pronadjeni")
            }


        }
        else {
            return res.status(200).json("Trener nije pronadjen")
        }


    }
    catch (err) {
        return res.status(500).json(err);
    }

}

export const vratiProsleTreninge = async (req, res) => {

    try {
        const trener = await Trener.findById(req.params.trenerId)
        //console.log(trener)
        if (trener != null) {
            let treninzi = []
            let danasnji = new Date()
            for (let i = 0; i < trener.listaTreninga?.length; i++) {
                const trening = await Trening.findById(trener.listaTreninga[i])
                if (trening?.datum < danasnji) {
                    treninzi.push(trener.listaTreninga[i])

                }
            }

            //console.log(treninzi)

            if (treninzi.length !== 0) {
                let vrati = []

                for (let i = 0; i < treninzi.length; i++) {

                    const trening = await Trening.findById(treninzi[i]._id)
                    if (trening != null) {
                        let korisnik = ''

                        let regK = ''
                        const usluga = await Usluga.findById(trening.uslugaId)

                        let datum = trening.datum;
                        let samoDatum = datum.toLocaleDateString()
                        let vremee = '';
                        let samovreme = '';
                        let nazivTreninga = ""

                        if (trening.brojMaxClanova === 1) {
                            vremee = trening.datum;
                            samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });
                            korisnik = await Korisnik.findById(trening.clanovi[0])
                            regK = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
                            nazivTreninga = "Personalni"
                        }
                        else {
                            vremee = trening.vreme;
                            samovreme = vremee.toLocaleTimeString(['hr-HR'], { hour: '2-digit', minute: '2-digit' });
                            nazivTreninga = usluga?.naziv
                        }

                        //  console.log(usluga)
                        let tr = {
                            imeK: regK?.ime,
                            prezimeK: regK?.prezime,
                            datum: samoDatum,
                            vreme: samovreme,
                            trener: trening.trenerId,
                            tip: trening.tip,
                            intenzitet: trening.intenzitet,
                            trajanje: trening.trajanje,
                            nazivTreninga: nazivTreninga,
                            treningId: trening._id,
                            korisnikId:korisnik._id
                        }
                        vrati.push(tr)
                    }
                    else {
                        await trener.updateOne({ $pull: { listaTreninga: trening._id } });

                    }

                }
                return res.status(200).json(vrati)


            }
            else {
                return res.status(404).json("Nisu pronadjeni prosli treninzi")
            }
        }
        else {
            return res.status(404).json("Nije pronadjen trener")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//obrisi odbijen trening
export const obrisiTrening = async (req, res) => {

    try {

        const trening = await Trening.findById(req.params.treningId)

        if (trening != null) {

            await Zahtev.findOneAndDelete({ treningId: trening._id })
            await Termin.findOneAndDelete({ treningId: trening._id })
            await Trening.findByIdAndDelete(trening._id)
            return res.status(200).json("Trening je obrisan");
        }
        else {
            return res.status(404).json("Trening nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
};
//prihvati izmene predloga treninga

export const prihvatiIzmene = async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.body.idKorisnika);

        if (korisnik != null) {
            const regkor = await RegistrovaniKorisnik.findById(korisnik.registrovaniKorisnikId)
            const trening = await Trening.findById(req.body.idTreninga)
            const trener = await Trener.findById(trening.trenerId)
            const zahtev = await Zahtev.findById(req.body.idZahteva)

            if (trening != null) {
                let datumm = trening.datum
                let datumm1 = datumm.toLocaleDateString()

                await trening.updateOne({ $set: req.body })
                const noviZahtev = await Zahtev.findByIdAndUpdate(zahtev._id, {
                    $set: {
                        poruka: "Korisnik " + regkor.ime + " " + regkor.prezime + " je prihvatio izmene treninga za datum: " + datumm1,
                        registrovaniKorisnikId: trener.registrovaniKorisnikId,
                        predlog: false
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
    catch (err) {
        return res.status(500).json(err);
    }
}

export const otkaziGrupni = async (req, res) => {

    try {
        const korisnik = await Korisnik.findById(req.params.idKorisnika)

        if (korisnik != null) {

            const tr = await Trening.findById(req.params.idTreninga)
            if (tr != null) {

                //res.status(200).json(brojTren)
                await tr.updateOne({ $pull: { clanovi: korisnik._id } })

                return res.status(200).json(tr);
            }
            else {
                return res.status(404).json("Trening nije pronadjen")
            }
        } else {
            return res.status(404).json("Korisnik nije pronadjen")
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }

}

export default router;