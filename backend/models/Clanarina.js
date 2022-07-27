import mongoose from "mongoose";

const ClanarinaSchema = new mongoose.Schema({

    cena: {
        type: String
    },
    // trajanje: {
    //     type: String
    // },
    datumUplate: {
        type: Date
    },
    vaziDo: {
        type: Date
    },
    // korisnikId: {
    //     type: String,
    //     required: true
    // },
    uslugaId: {
        type: String,
        //required:true
    }


},
    { timestamps: true }
)

export default mongoose.model("Clanarina", ClanarinaSchema);