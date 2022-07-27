import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import authRoute from "./routes/auth.js";
import registrovaniKorisnikRoute from "./routes/registrovaniKorisnik.js";
import trenerRoute from "./routes/trener.js";
import korisnikRoute  from "./routes/korisnik.js";
import upravaRoute  from "./routes/uprava.js";
import treningRoute from"./routes/trening.js";
import blogRoute from"./routes/blog.js";
import terminRoute from"./routes/termin.js";
import zahtevRoute from"./routes/zahtev.js";
import clanarinaRoute from"./routes/clanarina.js";
import napredakRoute from"./routes/napredak.js";
import uslugaRoute from"./routes/usluga.js";
import evidencijaRoute from"./routes/evidencija.js";
import path from "path"
import {fileURLToPath} from 'url';




dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);



const app = express();
app.use(helmet());
app.use(express.json());
//app.use(multer())
app.use(cors())



app.use(express.static('Photos'));


app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/registrovaniKorisnik", registrovaniKorisnikRoute);
app.use("/api/trener", trenerRoute);
app.use("/api/korisnik", korisnikRoute);
app.use("/api/uprava", upravaRoute);
app.use("/api/trening", treningRoute);
app.use("/api/blog", blogRoute);
app.use("/api/termin", terminRoute);
app.use("/api/zahtev", zahtevRoute);
app.use("/api/clanarina", clanarinaRoute);
app.use("/api/napredak", napredakRoute);
app.use("/api/usluga", uslugaRoute);
app.use("/api/evidencija", evidencijaRoute);


app.listen(8800, () => {
  console.log("Backend server is running!");
});

