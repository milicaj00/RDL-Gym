import mongoose from "mongoose";

const ZahtevSchema = new mongoose.Schema({

    treningId:{
        type:String
    },
    registrovaniKorisnikId:{
        type:String
    },
    status:{
        type: String,
        enum:["Odobreno", "Odbijeno", "Ukinuto","Na cekanju"],
        default:"Na cekanju"
    },
    poruka:{
        type:String
    },
    predlog:{
        type:Boolean,
        default:false
    }
   
    
},
{timestamps:true}
)

//module.exports = mongoose.model("Zahtev", ZahtevSchema);
export default mongoose.model("Zahtev", ZahtevSchema);
