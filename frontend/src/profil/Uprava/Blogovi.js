import { Button, Box} from "@mui/material"
import { useEffect, useState } from "react"
import useAxiosPrivate from "../../api/useAxiosPrivate"
import FormaDodajBlog from "../../komponente/Forme/FormaDodajBlog"
import Modal from "../../komponente/Modal"
import TabelaZaReciklazu from "../../komponente/Tabele/TabelaZaReciklazu"
import CircularProgress from '@mui/material/CircularProgress';


const head = ['naslov', 'datum', 'tagovi']
const row = [
    { naziv: 'naziv', opis: 'opis', tag: 'zdravlje', id: 2 },
    { naziv: 'naziv1', opis: 'opis1', tag: 'ishrana', id: 3 },
    { naziv: 'naziv2', opis: 'opis2', tag: 'fitnes', id: 4 }]


const Blogovi = () => {

    const [dodajBlog, setDodajBlog] = useState(false)
    const [blogovi, setBlogovi] = useState([])
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        const get = async () => {
            setLoading(true)
            await axiosPrivate.get('http://localhost:8800/api/blog/vratiBlogove')
                .then(p => {
                    if (p.status === 200) {
                        setBlogovi(p.data)
                        console.log(p.data)
                        setLoading(false)
                    }
                }).catch((error) => {
                    if (error.response.status !== 404)
                        alert('Doslo je do greske')
                    setLoading(false)
                    console.log('greska prilkom ucitavanja: ' + error.message)
                });
        }

        get()

    }, [reload])

    const obrisiBlog = async (id) => {
        console.log(id)

        await axiosPrivate.delete('http://localhost:8800/api/blog/obrisiBlog/' + id)
            .then(p => {
                if (p.status === 200) {
                    alert('Uspesno ste obrisali blog!')
                    setReload(!reload)
                }
            }).catch((error) => {
                alert('Doslo je do greske prilikom brisanja')
            });
    }

    if (loading)
        return (<Box><CircularProgress /></Box>)
    return (
        <>
            {dodajBlog &&
                <Modal onClose={() => { setDodajBlog(false) }}>
                    <FormaDodajBlog onClose={() => { setDodajBlog(false); setReload(!reload) }} />
                </Modal>
            }
            <Button variant = 'outlined' onClick={() => setDodajBlog(true)}>novi blog</Button>

            <TabelaZaReciklazu head={head} rows={blogovi} rowName={head} onDelete={obrisiBlog} search1='naslov' search2='tagovi' />

        </>
    )
}
export default Blogovi