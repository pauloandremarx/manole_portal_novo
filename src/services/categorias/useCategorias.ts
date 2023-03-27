 
import axios from 'axios';
import Config from '../../util/Config'
import { useState } from "react"
const headers = { 
   'Content-Type': 'application/json',     
   'Authorization': Config.API_KEY, 
};

interface Categorias {
   cat_id: Number;
   cat_nome: String;
   cat_order: Number;
   cat_cat: Number;

   

}


export default function useCategorias ()  {
   const [categorias, setCategorias] = useState<Categorias[]>([]);
 
 
   function getCategorias () {
       
 
      axios({
         url: Config.API_URL + `aulas-gratuitas/categorias`,
         method: "GET", 
         headers: headers

         
     }).then((response) => {
      setCategorias(response.data);
      console.log(response.data)

     }).catch((error) => {
      console.log(error);
     }) 

   }

 
 

   return {  
      categorias,
      getCategorias

   }
}

 
 