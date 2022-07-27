import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({

    naslov:{
        type:String

    },
    datum:{
        type:Date

    },
    tekst:{
        type:String

    },
    tagovi:{
        type:String,
        enum:["Zdravlje","Ishrana","Fitness","Trening"]
    },
    slika:{
        type:String
    },
    kratakopis:{
        type:String
    }
},
{timestamps:true}
)

export default mongoose.model("Blog", BlogSchema);