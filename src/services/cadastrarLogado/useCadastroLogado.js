 import axios from "axios"
import Config from '../../util/Config'

const headers = { 
    'Content-Type': 'application/json',     
    'Authorization': Config.API_KEY, 
    'Accept': 'application/json'
 };
 
  

class CadastroLogadoService{  

    async cadastroLogadoMiniCursos(data){ 
     
        return axios({
            url: Config.API_URL + `aulas-gratuitas/minicurso/matricula`, 
            method: "POST",
            mode: 'no-cors',
            data: data,
            headers: headers
        }).then((response) => {  
            console.log(response);
            return response;
           
        } ).catch( ( error ) => {  
            alert(error)
            console.log(error);
            console.log('deu errado dentro');
        }) 
    }

 

 
}

const cadastroLogadoM = new CadastroLogadoService()

export default cadastroLogadoM