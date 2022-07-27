import express from "express";
const router = express.Router();
import { azurirajSvojNalog} from "../controllers/registrovaniKorisnik.js";
import {auth} from "../auth.js";

router.put('/:id',auth, azurirajSvojNalog);


export default router;