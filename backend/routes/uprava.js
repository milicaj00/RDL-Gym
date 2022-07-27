
import express from "express";
const router = express.Router();
import { upravaUpdate, dodajUpravu,obrisiUpravu } from "../controllers/uprava.js";
import {auth,upravaMethod} from "../auth.js";

router.put('/upravaUpdate/:id', auth,upravaUpdate);
router.post('/dodajUpravu/:id',auth,upravaMethod, dodajUpravu);
router.delete('/obrisiUpravu/:idUprave', auth,upravaMethod,obrisiUpravu);



export default router;