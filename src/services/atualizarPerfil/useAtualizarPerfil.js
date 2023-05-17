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

        let result;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify(data)
        };

        return fetch( Config.API_URL + 'auth/profile/academy', requestOptions)
            .then((response) => {
                console.log(response)
                return response;
            })
            .catch((error) => {
                return error;
            });


    }
}

class AtualizarAvatarService{
    async atualizacaoAvatar( token, data ) {

        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': token },
            body:  data
        };

        return fetch( Config.API_URL + 'auth/profile/uploadAvatar', requestOptions)
            .then((response) => {
                console.log(response)
                return response;
            })
            .catch((error) => {
                console.log(error)
                return error;
            });



    }
}



const atualizarPerfil = new AtualizarPerfilService();
const atualizarPerfilAcademic = new AtualizarPerfilAcademicService();

const atualizarAvatar = new AtualizarAvatarService();

export {atualizarPerfilAcademic, atualizarPerfil, atualizarAvatar};