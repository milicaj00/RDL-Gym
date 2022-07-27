import express from "express";
const router = express.Router();
import Blog from "../models/Blog.js"
import {slika} from "./auth.js";

//vrati sve blogove
export const vratiBlogove = async (req, res) => {

    try {
        const blogovi = await Blog.find()
        if (blogovi.length != 0) {
            let vrati = []
            for (let i = 0; i < blogovi.length; i++) {
                const blog = await Blog.findById(blogovi[i]._id)
                if (blog) {
                    let datum = blog.datum;
                    let samoDatum = datum.toLocaleDateString()

                    let tr = {
                        id: blog._id,
                        naslov: blog.naslov,
                        datum: samoDatum,
                        tekst: blog.tekst,
                        tagovi: blog.tagovi,
                        kratakopis: blog.kratakopis,
                        slika: blog.slika
                    }
                    vrati.push(tr)
                }
            }
            return res.status(200).json(vrati)

        }

        else {
            return res.status(400).json("Nema  za prikaz")
        }
    }
    catch (err) {
        return res.status(500).json(err);
    }
}



//Metoda za vracanje bloga sa datim tagom:
export const vratiBlogTag = async (req, res) => {

    try {
        const firstArray = await Blog.find({ tagovi: req.params.tag });
        if (firstArray.length === 0)
            return res.status(404).json("Ne postoji blog sa zadatim tagom");
        else
            return res.status(200).json(firstArray);

    }
    catch (err) {
        return res.status(500).json(err);
    }
}

//dodajBlog
export const dodajBlog = async (req, res) => {

    const pom = await slika(req)

    
    if (pom === false) {
        console.log('nema slika')
 
    }

    
 
    try {
        const datum = new Date();
        const blog = await new Blog({
            naslov: req.body.naslov,
            datum: datum,
            tekst: req.body.tekst,
            tagovi: req.body.tagovi,
            slika: pom,
            kratakopis: req.body.kratakopis
        })


        const blogSave = await blog.save()
        return res.status(200).json(blogSave)

    }
    catch (err) {
        return res.status(500).json(err);
    }

}

//izmeniBlog
export const izmeniBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.idBloga)
        if (blog != null) {
            await blog.updateOne({ $set: req.body })
            return res.status(200).json(blog);
        }
        else {
            return res.status(404).json("Blog nije pronadjen")
        }

    }
    catch (err) {
        return res.status(500).json(err);
    }
}

//obrisiBlog
export const obrisiBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.idBloga)
        return res.status(200).json("Blog je uspesno obrisan")

    }
    catch (err) {
        return res.status(500).json(err);
    }
};







export default router;