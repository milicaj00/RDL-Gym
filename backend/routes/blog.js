import express from "express";
const router = express.Router();
import { vratiBlogove, vratiBlogTag, izmeniBlog, obrisiBlog, dodajBlog } from "../controllers/blog.js";
import { auth,upravaMethod } from "../auth.js";
import {upload} from "./auth.js";




router.get('/vratiBlogove', vratiBlogove); //ovo ne korisnimo
router.get('/vratiBlogTag/:tag', vratiBlogTag);
router.put('/izmeniBlog/:idBloga', auth,upravaMethod, izmeniBlog); // isto
router.delete('/obrisiBlog/:idBloga', auth,upravaMethod, obrisiBlog); // isto
router.post('/dodajBlog', auth,upravaMethod, upload.single('file'), dodajBlog);



// router.post("/upload", upload.single('file'), slika);


export default router;
