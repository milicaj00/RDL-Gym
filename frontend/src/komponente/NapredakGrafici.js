
import { Box } from '@mui/material';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  
  );  

const NapredakGrafici = ({napredak, zeljeno,user}) => {

    function setdata (labela1, data1, labela2, zeljeniparam){

        let data = ''

        if(napredak)
        { 
        data  = {

        labels: napredak.datum,
        datasets:[
                {
                label: labela1,
                data: data1,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: labela2,
                    data: zeljeno.map( () => zeljeniparam),
                    borderColor: 'rgb(255, 0, 0)',
                    backgroundColor: 'rgba(255, 0, 0, 0.5)',
                }
            ],
        }}
        return data;
    }

    function setoptions (labela) {
        let option = {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
                },
            title: {
                display: true,
                text: labela,
                },
            }
        }
       return option
    }
  
    let data = setdata('Tezina', napredak?.tezina, 'Zeljena tezina', user?.zeljenaTezina)
    let data1 = setdata('Tezina misica', napredak?.tezinaMisica, 'Zeljena tezina misica', user?.zeljenaTezinaMisica)
    let data2 = setdata('Procenat proteina', napredak?.procenatProteina, 'Zeljeni procenat proteina', user?.zeljeniProcenatProteina)
    let data3 = setdata('Procenat masti', napredak?.procenatMasti, 'Zeljena procenat masti', user?.zeljeniProcenatMasti)

    let options = setoptions('Napredak tezina')
    let options1 = setoptions('Napredak misica')
    let options2 = setoptions('Napredak procenat proteina')
    let options3 = setoptions('Napredak procenat masti')

    return (
        <Box>
            <Line className = 'graf' options={options} data={data} />

            <Line className = 'graf' options={options1} data={data1} />

            <Line className = 'graf' options={options2} data={data2} />

            <Line className = 'graf' options={options3} data={data3} />
        </Box>
    )
}

export default NapredakGrafici;