


 
import axios from 'axios';
import Config from '@/util/Config'
import { useState } from "react" 

interface Tipo_formacao {
    id: Number;
    nome: String;
}

export default function UseTipo_cursos( ) {

   const headers = {
    'Content-Type': 'application/json',
    'Authorization': Config.API_KEY,
    'Accept': 'application/json'
};

   const [tipo_cursos, set_cursos] = useState<Tipo_formacao[]>([]);

   function getTipo_cursos() {
      axios({
         url: Config.API_URL + `auth/profile/courses?search=`,
         method: "GET", 
         headers: headers, 
      }).then((response) => {
          set_cursos(response.data.courses);

     }).catch((error) => { 
      console.log(error);
     }) 
 
   } 

   return {
       tipo_cursos,
       getTipo_cursos,
   }
}

 
 