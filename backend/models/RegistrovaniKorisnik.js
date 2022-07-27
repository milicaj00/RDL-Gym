import mongoose from "mongoose";

const RegistrovaniKorisnikSchema = new mongoose.Schema({

    username: {
        type: String,
        min: 6,
        max: 30,
        // required:true,
        // unique:true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    ime: {
        type: String,
        max: 20,
        //required:true

    },
    prezime: {
        type: String,
        max: 20,
        //required:true

    },
    email: {
        type: String,
        min: 6,
        required: true,
        unique: true

    },
    brojTelefona: {
        type: String,
        min: 6,
        max: 30,
        //required:true

    },
    tipKorisnika: {
        type: String,
        enum: ["Uprava", "Trener", "Korisnik"],
        //default:"Korisnik"
    }
},
    { timestamps: true }
)

export default mongoose.model("RegistrovaniKorisnik", RegistrovaniKorisnikSchema);