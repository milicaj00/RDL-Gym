import express from "express";
const router = express.Router();

import { zakaziPersonalniTrening, izmeniTrening, ukiniTrening, vidiZakazaneTreningePersonalni, vidiZakazaneTreningeSve, vidiZakazaneTreningeGrupni, prijavaGrupniTrening, vidiGrupneTreninge, vidiGrupneUsluge, vidiTreningeZaUslugu, zakaziGrupniTrening, vratiTreningePersonalni, vratiTreningePersonalniC, vratiTreningeGrupni, prihvatiTrening, odbijTrening, vratiTreningePersonalniO, vratiProsleTreninge, obrisiTrening, prihvatiIzmene, otkaziGrupni } from "../controllers/trening.js";
import { auth, trenerMethod } from "../auth.js";

router.post('/zakaziPersonalniTrening/:idKorisnika/:idTrenera/:idTermina', auth, zakaziPersonalniTrening);
router.put('/izmeniTrening/:idKorisnika/:idTreninga', auth, izmeniTrening);
router.put('/ukiniTrening/:idTreninga', auth, ukiniTrening);
router.get('/vidiZakazaneTreningePersonalni/:idKorisnika', auth, vidiZakazaneTreningePersonalni);
router.get('/vidiZakazaneTreningeSve/:idKorisnika', auth, vidiZakazaneTreningeSve);
router.get('/vidiZakazaneTreningeGrupni/:idKorisnika', auth, vidiZakazaneTreningeGrupni);
router.put('/prijavaGrupniTrening/:idKorisnika/:idTreninga', auth, prijavaGrupniTrening);
router.get('/vidiGrupneTreninge/:idUsluge/:datum', vidiGrupneTreninge);
router.get('/vidiGrupneUsluge', vidiGrupneUsluge);
router.get('/vidiTreningeZaUslugu/:idUsluge/:datum', vidiTreningeZaUslugu);
router.post('/zakaziGrupniTrening/:id/:idUsluge', auth, trenerMethod, zakaziGrupniTrening);
router.get('/vratiTreningePersonalni/:id', auth, vratiTreningePersonalni);
router.get('/vratiTreningePersonalniC/:id', auth, vratiTreningePersonalniC);
router.get('/vratiTreningeGrupni/:id/:datum', vratiTreningeGrupni);
router.put('/prihvatiTrening/:idZahteva', auth, trenerMethod, prihvatiTrening);
router.put('/odbijTrening/:idZahteva', auth, trenerMethod, odbijTrening);
router.get('/vratiTreningePersonalniO/:id', auth, vratiTreningePersonalniO);
router.get('/vratiProsleTreninge/:trenerId', auth, trenerMethod, vratiProsleTreninge);
router.delete('/obrisiTrening/:treningId', auth, trenerMethod, obrisiTrening);
router.put('/prihvatiIzmene', auth, prihvatiIzmene);
router.put('/otkaziGrupni/:idKorisnika/:idTreninga', auth, otkaziGrupni);




export default router;