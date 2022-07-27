import mongoose from "mongoose";

const TreningSchema = new mongoose.Schema({

    datum:{
        type:Date

    },
    vreme:{
        type:Date
    },
    nazivGrupnogTreninga:{
        type:String

    },
    tip:{
        type:String,
        enum:["Gornji deo tela", "Donji deo tela", "Kardio"]

    },
    intenzitet:{
        type:String,
        enum:["Lak", "Srednje tezak", "Tezak"]

    },
    trajanje:{
        type:String,
        enum:["30min", "45min", "1h", "1h30min", "2h"]

    },
    brojMaxClanova:{
        type:Number
    },

    
    trenerId:{
        type:String
    },
    clanovi:{
        type:Array,
        default:[]
    },
    isOnline:{
        type:Boolean,
        default:false
    },

    uslugaId:{
        type:String
    }
    
},
{timestamps:true}
)

export default mongoose.model("Trening", TreningSchema);