import mongoose from "mongoose";

const UpravaSchema = new mongoose.Schema({

    registrovaniKorisnikId:{
        type:String,
        required:true
    }
    
},
{timestamps:true}
)

export default mongoose.model("Uprava", UpravaSchema);