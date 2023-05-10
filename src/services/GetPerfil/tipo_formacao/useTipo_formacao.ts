


 
import axios from 'axios';
import Config from '@/util/Config'
import { useState } from "react" 

interface Tipo_formacao {
   tipo_id: Number;
   tipo_nome: String;
}

export default function UseTipo_formacoes( ) {

   const headers = {
    'Content-Type': 'application/json',
    'Authorization': Config.API_KEY,
    'Accept': 'application/json'
};

   const [tipo_formacoes, set_tipo] = useState<Tipo_formacao[]>([]);

   function getTipo_formacoes() {
      axios({
         url: Config.API_URL + `auth/profile/academicEducation`,
         method: "GET", 
         headers: headers, 
      }).then((response) => {
          set_tipo(response.data.academicEducation);

     }).catch((error) => { 
      console.log(error);
     }) 
 
   } 

   return {
       tipo_formacoes,
       getTipo_formacoes,
   }
}

 
 