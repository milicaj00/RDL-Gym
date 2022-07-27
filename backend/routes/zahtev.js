import express from "express";
const router = express.Router();

import { obrisiZahtev,vidiZahteve,vidiZahteveZaKorisnika,napraviZahtev,vratiZahteveTrenera,napraviZahtevTrener } from "../controllers/zahtev.js";
import {auth,trenerMethod} from "../auth.js";


router.delete('/obrisiZahtev/:idZahteva',auth, obrisiZahtev);
router.get('/vidiZahteve/:idRegKorisnika/:status',auth, vidiZahteve);
router.get('/vidiZahteveZaKorisnika/:idRegKorisnika',auth, vidiZahteveZaKorisnika);
router.post('/napraviZahtev/:idTreninga',auth, napraviZahtev);
router.get('/vratiZahteveTrenera/:idRegKorisnika',auth,trenerMethod ,vratiZahteveTrenera);
router.post('/napraviZahtevTrener',auth, napraviZahtevTrener);


export default router;