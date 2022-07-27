import stil from '../styles/oNama.module.css'
import React, { Fragment } from "react";
import { Typography, ImageList, ImageListItem } from '@mui/material';

const itemData = [
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-TERETANA-1-1024x682.jpg',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6581-1024x682.jpg',
      title: 'Burger',
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6584-1024x682.jpg',
      title: 'Camera',
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6605-1024x682.jpg',
      title: 'Coffee',
      cols: 2,
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-TERETANA-2-1024x682.jpg',
      title: 'Hats',
      cols: 2,
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-lokacija-1-1024x682.jpg',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-wellness-lokacija-2-1024x682.jpg',
      title: 'Basketball',
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/04/DSC_6637-1024x682.jpg',
      title: 'Fern',
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/DSC_6663-1024x682.jpg',
      rows: 2,
      cols: 2,
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-3-1024x686.jpg',
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-5-1024x686.jpg',
    },
    {
      img: 'http://onewellnessnis.rs/wp-content/uploads/2017/03/One-Wellness-NI%C5%A1-sektor-plus-1-6-1024x686.jpg',
      cols: 2,
    },
  ];

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

const Onama = () => {

    return (
        <Fragment>
            <div className={stil.pozadina}>
                <h1 className={stil.glavniNaslov}> O NAMA </h1>
            </div>

            <div className={stil.opis}>

                <Typography variant="h4" gutterBottom component="div">RaketaDoLeta</Typography>

                <div className={stil.podOpis}>
                    <Typography variant="body1">
                    Teretana RDLGym počela je sa radom u februaru 2015. godine,
                    kada smo pod istim krovom okupili najbolje stručnjake u regionu kako bismo svim našim klijentima pružili 
                    nezaboravno iskustvo treninga na jednom mestu.
                    U ovaj posao ušli smo punim srcem i sa jasnom idejom: da budemo apsolutni lideri u oblasti fizičke aktivnosti
                     u Srbiji ali i u zemljama u regionu.
                    </Typography>

                    <Typography variant="body1">
                    Ne pravimo nikakav kompromis kada je u pitanju oprema koju koristimo u poslu i
                     uvek odlučno biramo da budemo najbolji i pružimo najbolje.
                    </Typography>

                    <Typography variant="body1">
                    Zato ćete kod nas vežbati na najsavremenijim spravama iz TechnoGym porodice, a svi naši partneri sa kojima ćete se susreti u teretani RDLGym
                    će doprineti vašem maksimalnom užitku jer radimo isključivo sa najboljima, a to su: Jana, Proteini.si, Red Bull, Nike i Nivea. 
                    </Typography>

                    <Typography variant="body1">
                    Naša misija je da pružimo najbolju uslugu i ostvarimo neprikosnovene rezultate sa svim klijentima koji nam ukazuju
                     svoje dragoceno poverenje i da uvek pružimo i više od maksimuma: a to znači da ne budemo samo treneri, 
                     već i savetnici i posvećeni motivatori.
                    </Typography>

                    <Typography  mb ={4} variant="body1">
                    Od kako postojimo naša vizija je ista – da budemo sinonim za teretanu koja je 
                    ubedljivo najbolja po svim svetskim standardima i koji konstantno diktira nove trendove u sferi
                     zdravog načina života i fizičke aktivnosti.
                    </Typography>
                </div>

                <ImageList
                variant="quilted"
                cols={4}
                rowHeight={121}
                >
                {itemData.map((item) => (
                    <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 200, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
                </ImageList>
                

            </div>
        </Fragment>
    )

}

export default Onama;