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

class AtualizarPerfilAcademicService{
    async atualizacaoPerfilAcademic( token, data ) {


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify(data)
        };

        return fetch( Config.API_URL + 'auth/profile/academy', requestOptions)
            .then((response) => {
                if(!response.ok) throw new Error(response.status);
                else return 200;
            })
            .catch((error) => {
                return error;
            });

    }
}

const atualizarPerfil = new AtualizarPerfilService();
const atualizarPerfilAcademic = new AtualizarPerfilAcademicService();


export {atualizarPerfilAcademic, atualizarPerfil};