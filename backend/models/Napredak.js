import mongoose from "mongoose";

const NapredakSchema = new mongoose.Schema({

    tezina:{
        type:Array,
        default:[]

    },
    tezinaMisica:{
        type:Array,
        default:[]

    },
    procenatProteina:{
        type:Array,
        default:[]

    },
    procenatMasti:{
        type:Array,
        default:[]

    },
    korisnikId:{
        type:String,
        required:true
    },
    BMI:{
        type:Array,
        default:[]

    },
    kostanaMasa:{
        type:Array,
        default:[]

    },
    procenatVode:{
        type:Array,
        default:[]

    },
    bodyAge:{
        type:Array,
        default:[]
    },
    datum:{
        type:Array,
        default:[]
    }

   
    
},
{timestamps:true}
)

export default mongoose.model("Napredak", NapredakSchema);