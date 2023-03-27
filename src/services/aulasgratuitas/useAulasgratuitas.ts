 
import axios from 'axios';
import Config from '../../util/Config'
import { useState } from "react"
const headers = { 
   'Content-Type': 'application/json',     
   'Authorization': Config.API_KEY, 
};

interface Aulas {
   aula_categoria_id: Number;
   aula_gratuita_titulo: String;
   aula_gratuita_desc: String;
   id_video: Number;
   aula_gratuita_img: String;
   aula_gratuita_embeded: String;

}


export default function useAulasgratuitas (pageLimit: number)  {
   const [aulas, setAulas] = useState<Aulas[]>([{ aula_categoria_id: 0, aula_gratuita_titulo: "", aula_gratuita_desc: "",  id_video:0, aula_gratuita_img: "", aula_gratuita_embeded: "" }]);

   const [Allaulas, setAllaulas] = useState<Aulas[]>([]);


   const [SingleAulas, setSingleAulas] = useState<Aulas>();
 
   function getAulas (page: number) {
      const virtualPage =   page;

 
      axios({
         url: Config.API_URL + `aulas-gratuitas/aulas/?filtro=&perPage=${pageLimit}&currentPage=${virtualPage}`,
         method: "GET", 
         headers: headers

         
     }).then((response) => {
      setAulas(response.data.data);


     }).catch((error) => {
      console.log(error);
     }) 

   }


   function getAllaulas () {  
      axios({
         url: Config.API_URL + `aulas-gratuitas/aulas/?filtro=&perPage=100&currentPage=1`,
         method: "GET", 
         headers: headers 
         
     }).then((response) => {
      setAllaulas(response.data.data);
  

     }).catch((error) => {
      console.log(error);
     }) 

   }


   function getSingleAulas (id: number ) {  
      axios({
         url: Config.API_URL + `aulas-gratuitas/aula/${id}`,
         method: "GET", 
         headers: headers 
         
     }).then((response) => {
      setSingleAulas(response.data[0]);
 

      }).catch((error) => {
         console.log(error);
      }) 

   }
 

   return { 
      aulas, 
      getAulas,
      Allaulas,
      getAllaulas,
      SingleAulas,
      getSingleAulas

   }
}

 
 