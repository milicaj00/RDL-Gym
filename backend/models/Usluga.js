import mongoose from "mongoose";

const UslugaSchema = new mongoose.Schema({

    cena: {
        type: Number

    },
    opis: {
        type: String

    },
    naziv: {
        type: String
    },
    trajanje: {
        type: Number
    },
    treningGrupni:{
        type:Boolean,
        default:false
    },
    slika:{
        type:String
    }

},
    { timestamps: true }
)

export default mongoose.model("Usluga", UslugaSchema);