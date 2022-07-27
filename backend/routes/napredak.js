import express from "express";
const router = express.Router();
import { vidiNapredakKorisnik, vidiNapredakPoslednji,dodajNapredak,izmeniNapredak,vidiNapredak } from "../controllers/napredak.js";
import {auth,trenerMethod} from "../auth.js";

router.get('/vidiNapredakKorisnik/:idKorisnika',auth, vidiNapredakKorisnik);
router.get('/vidiNapredakPoslednji/:idKorisnika',auth, vidiNapredakPoslednji);
router.post('/dodajNapredak/:idTrenera/:idKorisnika',auth,trenerMethod, dodajNapredak);
router.put('/izmeniNapredak/:idNapredak',auth,trenerMethod, izmeniNapredak);
router.get('/vidiNapredak/:idTrenera/:idKorisnika',auth, vidiNapredak);


export default router;