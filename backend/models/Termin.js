import mongoose from "mongoose";

const TerminSchema = new mongoose.Schema({

    trenerId:{
        type:String,
        required:true
    },
    datum:{
        type:Date
    },
    vremePocetka:{
        type:Date
    },
    vremeKraja:{
        type:Date
    },
    slobodan:{
        type:Boolean, 
        default:true
    }, 
    treningId:{
        type:String
    }
    
},
{timestamps:true}
)

export default mongoose.model("Termin", TerminSchema);