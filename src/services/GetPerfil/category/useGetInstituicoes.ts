
import axios from 'axios';
import Config from '@/util/Config'
import { useState } from "react" 

interface Instituicoes {
   inst_id: Number;
   inst_nome: String;
   inst_sigla: String; 
   inst_regiao: string;
   inst_est_nome: string; 
   inst_est_sigla: string;
   inst_cidade: string; 
}


export default function useInstituicoes() { 
   
   const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': Config.API_KEY, 
    'Accept': 'application/json'
};

   const [instituicoes, set_instituicoes] = useState<Instituicoes[]>([]);  
 
   function getInstituicoes() {  
      axios({
         url: Config.API_URL + `auth/profile/institutions?search=`,
         method: "GET", 
         headers: headers, 
      }).then((response) => { 
         set_instituicoes(response.data.instituicoes);  
            

     }).catch((error) => { 
      console.log(error);
     }) 
 
   } 

     
   return { 
      instituicoes, 
      getInstituicoes,  
   }
}

 
 