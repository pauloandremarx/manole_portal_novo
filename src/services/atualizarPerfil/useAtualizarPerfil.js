import axios from "axios"
import Config from '@/util/Config'
 

class AtualizarPerfilService{  

    async atualizacaoPerfil( token, data ) { 
        
        const headers = { 
            'Content-Type': 'application/json',     
            'Authorization': token,

        };
     
        return axios({
            url: Config.API_URL + `auth/profile`,
            method: "PUT",
            data: JSON.stringify(data),
            headers: headers
        }).then((response) => {  
            return response; 
        }).catch((error) => {  
            return error;
        }) 
    } 
}

const atualizarPerfil = new AtualizarPerfilService()

export default atualizarPerfil