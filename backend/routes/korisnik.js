
import express from "express";
const router = express.Router();
import { izmeniParametre, dodajKorisnika,izmeniKorisnika,obrisiSvogKlijenta,vratiKorisnike,obrisiKorisnika,verifikujNalog,vratiVerifikovaneNaloge,vratiNeverifikovaneNaloge } from "../controllers/korisnik.js";
import {auth,upravaMethod} from "../auth.js";

router.put('/izmeniParametre/:idKorisnika',auth, izmeniParametre);
router.post('/dodajKorisnika/:id/:korid',auth, dodajKorisnika);
router.put('/izmeniKorisnika/:id', izmeniKorisnika);
router.put('/obrisiSvogKlijenta/:id',auth, obrisiSvogKlijenta);
router.get('/vratiKorisnike/:id',auth, vratiKorisnike);
router.delete('/obrisiKorisnika/:id',auth, obrisiKorisnika);
router.put('/verifikujNalog/:idKorisnika',auth,upravaMethod, verifikujNalog);
router.get('/vratiVerifikovaneNaloge',auth,upravaMethod, vratiVerifikovaneNaloge);
router.get('/vratiNeverifikovaneNaloge',auth,upravaMethod, vratiNeverifikovaneNaloge);


export default router;