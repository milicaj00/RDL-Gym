import { useLocation, } from "react-router-dom";
import { Card, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';

const PUTANJA = 'http://localhost:8800/'

const VelikiBlog = (props) => {

    const location = useLocation();

    const blog = location.state ? location.state : JSON.parse(window.parameters)

    return (
        <Card sx={{ margin: '5vw' }} elevation={3} >
            <Grid container>
                <Grid item xs={12} md={4}>
                    <CardMedia
                        component="img"
                        className="trImg"
                        // image={blog.slika}
                        crossOrigin="anonymous"
                        src={PUTANJA + blog.slika}
                        alt={blog.naslov}
                        height="250"
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center">{blog.naslov}</Typography>
                        <Typography variant="body1" align="justify" sx={{ padding: '2vh 3vw' }}> {blog.tekst} </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    )
}

export default VelikiBlog