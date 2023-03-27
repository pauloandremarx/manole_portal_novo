 
import axios from 'axios';
import Config from '../../util/Config'
import { useState } from "react"
 
const headers = { 
   'Content-Type': 'application/json',     
   'Authorization': Config.API_KEY, 
};

interface MeusCursos {
   curso_nome_completo: String;
   curso_id_moodle: Number;
   instancia_moodle: String;
   curso_moodle_url: String;
   curso_categoria: String;
   linkLogin: String;
    
}


export default function useAMeusCursos (key_username: String, key_id: Number)  { 

   const [meuscursos, setmeuscursos] = useState<MeusCursos[]>([{ curso_nome_completo: "", curso_id_moodle: 0, instancia_moodle: "",  curso_moodle_url:"", curso_categoria: "", linkLogin: "" }]);  
 
   function getMeusCursos() {  
      axios({
         url: Config.API_URL + `auth/courses/ava2/${key_username}/${key_id}`,
         method: "GET", 
         headers: headers

     }).then((response) => {
      setmeuscursos(response.data); 

     }).catch((error) => {
     
      console.log(error);
     }) 
 
   } 

   return { 
      meuscursos, 
      getMeusCursos,  
   }
}

 
 