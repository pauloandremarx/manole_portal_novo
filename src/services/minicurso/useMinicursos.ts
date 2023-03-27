 
import axios from 'axios';
import Config from '../../util/Config'
import { useState } from "react"
const headers = { 
   'Content-Type': 'application/json',     
   'Authorization': Config.API_KEY, 
};

interface Minicursos {
   curso_id: Number;
   curso_titulo_site: String;
   curso_thumb: String;
   curso_url: String;
   curso_id_moodle: String;

}


export default function useMinicursos (pageLimit: number)  {
   const [minicursos, setMinicursos] = useState<Minicursos[]>([{curso_id:0, curso_titulo_site:"", curso_thumb:"", curso_url:"", curso_id_moodle:"" }]);

   const [Allminicursos, setAllMinicursos] = useState<Minicursos[]>([]);

   const [Singleminicursos, setSingleminicursos] = useState<Minicursos>();
 
   function getMinicursos (page: number) {
      const virtualPage =   page;


      axios({
         url: Config.API_URL + `aulas-gratuitas/minicurso/?filtro=&perPage=${pageLimit}&currentPage=${virtualPage}`,
         method: "GET", 
         headers: headers

         
     }).then((response) => {
      setMinicursos(response.data.data);


     }).catch((error) => {
      console.log(error);
     }) 

   }

   function getAllMinicursos () {  

        axios({
         url: Config.API_URL + `aulas-gratuitas/minicurso/?filtro=&perPage=999999999&currentPage=1`,
         method: "GET", 
         headers: headers 
         
     }).then((response) => {
      
      setAllMinicursos(response.data.data);
      console.log(response.data.data);

     }).catch((error) => {
      console.log(error);
     }) 

   }


   function getSingleMinicursos (name: string ) {  

      axios({
       url: Config.API_URL + `aulas-gratuitas/minicurso/?filtro=&perPage=999999999&currentPage=1`,
       method: "GET", 
       headers: headers 
       
   }).then((response) => { 
      const result = response.data.data.find((item: { curso_titulo_site: string; }) => item.curso_titulo_site === name)
      setSingleminicursos(result);

   }).catch((error) => {
    console.log(error);
   }) 

 }
 

   return { 
      minicursos,
      Allminicursos,
      Singleminicursos,
      getMinicursos,
      getAllMinicursos,
      getSingleMinicursos
   }
}

 
 