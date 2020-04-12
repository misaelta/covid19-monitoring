import React,{useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';

import { IoIosPeople } from "react-icons/io";
import { FaCross } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdNavigateNext, MdNotificationsActive } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";



function App() {
  const  [paises,setPaises] = useState([])
  const [total , setTotal]=useState([])
  const[noticias,setNoticias] = useState([])
  const ongId='7a25d0b8';
  
async function getFetch(){

  await axios.get('https://api.thevirustracker.com/free-api?countryTotals=ALL',{
  }).then((response)=>{setPaises(Object.values(response.data.countryitems[0]))}).catch((erro)=>{console.log("lento demais")})
}
async function getTotalFetch(){

  await axios.get('https://api.covid19.finspect.me/covid19/total',{
  }).then((response)=>{setTotal(response.data[0])}).catch((erro)=>{console.log("lento demais")})

}
async function getNoticias(){

  await axios.get('https://api.covid19.finspect.me/brcovid19/news',{
  }).then((response)=>{setNoticias(response.data)}).catch((erro)=>{console.log("lento demais")})

}


 useEffect(   ()=>{
  getFetch()
  getTotalFetch()
  getNoticias()
},[ongId])

return (

    <div>
      <div className="flxtop">
      <div className="topdados">
   
     <p className="textoTop"  style={{color:"blue"}} ><span><IoIosPeople/></span>Total de casos confirmados: {total.confirmed} </p>
     <p className="textoTop"  style={{color:"red" ,}}><span><FaCross/></span>Total de mortes : {total.deaths}</p>
     <p className="textoTop"  style={{color:"green" ,}}><span><FaHandHoldingHeart/></span>Total de recuperados :{total.recovered} </p>

      </div>
      </div>
      <div className="headerTop">

        <h1 className="headerText">Estatística mundial</h1>
        <h1  className="headerText"> Notícias  </h1>
      </div>
      <div className="container">
        
      <div className="paises">

 
 {paises.map(pais=>
  
 <div className="item" key={pais.ourid}>
<img src={`https://www.countryflags.io/${pais.code}/shiny/64.png`}></img>
<h4>Pais:{pais.title} </h4>

        <p><strong>total de casos</strong> : { pais.total_cases}</p>
        
        <p><strong>total de casos recuperados :</strong>{ pais.total_recovered}</p>
        <p><strong>total de mortes</strong>:{ pais.total_deaths}</p>
        <p><strong>total de novos casos hoje</strong>:{ pais.total_new_cases_today}</p>
        <p><strong>total de novas mortes hoje</strong>:{ pais.total_new_deaths_today}</p>
        <p><strong>total de casos ativos</strong>:{ pais.total_active_cases}</p>
        <p><strong>total de casos serios</strong>:{ pais.total_serious_cases}</p>

</div>
 )}


</div>
<div className="containerNoticia">
{noticias.map(noticia=>
<div className="noticias" >
<p className="titleNoticia"><strong >{noticia.title}</strong></p>
         <p className="click"><MdNavigateNext/><MdNavigateNext/><a href={noticia.link} target="blank"> <strong> Acessar   notícia</strong>  </a> <MdNavigateBefore/><MdNavigateBefore/></p>
         <p className="fonte">Fonte da Notícia : {noticia.source}</p>   
<p className="data"><strong>Data de publicação:{noticia.date_publish}</strong></p>
        </div>
        )}
        </div>
</div>
</div>
)

}
export default App;
