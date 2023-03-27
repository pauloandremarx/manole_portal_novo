 

 
import axios from 'axios';
import Config from '@/util/Config'
import { useState } from "react" 

interface MeusCursos {
   id: Number;
   nome: String;
   email: String; 
   telefone: string | number;
   data_nascimento: string; 
   cep: string;
   cidade: string;
   endereco: string;
   avatar: string;
   
}


export default function useMeuPerf(token: string | number) { 
   
   const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': token, 
    'Accept': 'application/json'
};

   const [meuperfil, setmeuperfil] = useState<MeusCursos[]>([]);  
 
   function getMeuPerfil() {  
      axios({
         url: Config.API_URL + `auth/profile`,
         method: "GET", 
         headers: headers, 
     }).then((response) => {
      setmeuperfil(response.data); 

     }).catch((error) => { 
      console.log(error);
     }) 
 
   } 

   return { 
      meuperfil, 
      getMeuPerfil,  
   }
}

 
 