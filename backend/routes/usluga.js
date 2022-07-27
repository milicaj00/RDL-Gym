
import express from "express";
const router = express.Router();
import { dodajUslugu, izmeniUslugu,obrisiUslugu,vidiUsluge } from "../controllers/usluga.js";
import {auth,upravaMethod} from "../auth.js";
import {upload} from "./auth.js";

router.post('/dodajUslugu',auth, upravaMethod ,upload.single('file'), dodajUslugu);
router.put('/izmeniUslugu/:idUsluge',auth, upravaMethod , izmeniUslugu);
router.delete('/obrisiUslugu/:idUsluge',auth, upravaMethod , obrisiUslugu);
router.get('/vidiUsluge', vidiUsluge);


export default router;