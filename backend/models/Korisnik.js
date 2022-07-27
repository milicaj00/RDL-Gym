import mongoose from "mongoose";

const KorisnikSchema = new mongoose.Schema({

    registrovaniKorisnikId: {
        type: String,
        required: true
    },
    visina: {
        type: Number
    },
    zeljenaTezina: {
        type: Number
    },
    zeljeniProcenatMasti: {
        type: Number

    },
    BMI:{
    type: Number

    },
    zeljenaTezinaMisica: {
        type: Number

    },
    zeljeniProcenatProteina: {
        type: Number

    },
    procenatVode:{
    type: Number

    },
    kostanaMasa:{
    type: Number

    },
    bodyAge:{
    type: Number

    },
    brojGodina: {
        type: Number

    },
    trenerId: {
        type: String
    },
    clanarinaId: {
        type: String
    },
    verifikovan: {
        type: Boolean
    },
    napredakId:{
        type:String,
        //required:true
    },
    probniTrening:{
        type:Boolean,
        default:false
    }

},
    { timestamps: true }
)

export default mongoose.model("Korisnik", KorisnikSchema);