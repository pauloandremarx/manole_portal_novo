


 
import axios from 'axios';
import Config from '@/util/Config'
import { useState } from "react" 

interface Tipo_especialidades {
   tipo_id: Number;
   tipo_nome: String;
}

export default function UseTipo_especialidades( ) {

   const headers = {
    'Content-Type': 'application/json',
    'Authorization': Config.API_KEY,
    'Accept': 'application/json'
};

   const [tipo_especialidades, set_tipo_especialidades] = useState<Tipo_especialidades[]>([]);

   function getTipo_especialidades() {
      axios({
         url: Config.API_URL + `auth/profile/specialty?search=`,
         method: "GET", 
         headers: headers, 
      }).then((response) => {
          set_tipo_especialidades(response.data.specialty);
     }).catch((error) => { 
      console.log(error);
     })
   }

   return {
       tipo_especialidades,
       getTipo_especialidades,
   }
}

 
 