 

 
import axios from 'axios';
import Config from '../../util/Config'
import { useState } from "react"
 
const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': Config.API_KEY, 
    'Accept': 'application/json'
};

interface MeusCursos {
   id: Number;
   tipo: String;
   conteudo_acessado: String; 
    
}


export default function useMeusLogs ()  { 

   const [meuslogs, setmeuslogs] = useState<MeusCursos[]>([{ id: 0,   tipo: "",  conteudo_acessado:"" }]);  
 
   function getMeusLogs(user:any, qtd:Number) {  
      axios({
         url: Config.API_URL + `auth/logs?filter=&usu_id=${user}&qtde=${qtd}`,
         method: "GET", 
         headers: headers, 
     }).then((response) => {
      setmeuslogs(response.data); 

     }).catch((error) => {
     
      console.log(error);
     }) 
 
   } 

   return { 
      meuslogs, 
      getMeusLogs,  
   }
}

 
 