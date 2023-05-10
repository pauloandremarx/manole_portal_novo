 

 
import axios from 'axios';
import Config from '@/util/Config'
import { useState } from "react" 

  
 interface perfilAcademico {
    formacaoAcademica: Array<formacaoAcademica>;    
    especialidades: Array<especialidades>;
    trabalho: Array<trabalho>;
}

 interface formacaoAcademica {

    id: number;
    inst_id: number;
    tipo_formacao_id: number;
    curso_id: number;
    ano_conclusao: number;
}

 interface especialidades {
    esp_id : number;
    
}

 interface trabalho {
    local_trabalho : string;
    cargo_funcao: string;
 
}


export default function useMinhaformacao(token: string | number) { 
   
   const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': token, 
    'Accept': 'application/json'
};

   const [minhaformacao, setminhaformcao] =  useState<perfilAcademico[]>([]);   
 
   function getProfissao() {  
      axios({
         url: Config.API_URL + `auth/profile/academy`,
         method: "GET", 
         headers: headers, 
      }).then((response) => {  
         setminhaformcao(response.data); 

     }).catch((error) => { 
      console.log(error);
     }) 
 
   } 
 

   return { 
      minhaformacao, 
      getProfissao,  
   }
}

 
 