
import express from "express";
const router = express.Router();

import { dodajTrenera, obrisiTrenera,dodajSliku,vidiTrenereSvi,dodajOpis } from "../controllers/trener.js";
import {auth,upravaMethod} from "../auth.js";
import {upload} from "./auth.js";


router.post('/dodajTrenera/:id',auth,upravaMethod,upload.single('file'), dodajTrenera);
router.delete('/obrisiTrenera/:idTrenera',auth,upravaMethod, obrisiTrenera);
router.put('/dodajSliku/:idTrenera',auth, dodajSliku);
router.put('/dodajOpis/:idTrenera',auth, dodajOpis);
router.get('/vidiTrenereSvi', vidiTrenereSvi);


export default router;




