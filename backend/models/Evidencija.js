import mongoose from "mongoose";

const EvidencijaSchema = new mongoose.Schema({

    brojTreninga:{
        type:Number

    },
    tipTreninga:{
        type:Array,
        default:[]

    },

    intenziteti:{
        type:Array,
        default:[]
    },
    korisnikId:{
        type:String,
        //required:true
    },
    datumi:{
        type:Array,
        default:[]
    }
   
    
},
{timestamps:true}
)

export default mongoose.model("Evidencija", EvidencijaSchema);