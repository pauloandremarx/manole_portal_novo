'use client' 

import styles from './login.module.css';
import FormCuston from '@/components/Manole/Form';
import InputCuston from '@/components/Manole/InputCuston'
import InputPassword from '@/components/Manole/InputPassword' 
 
import { localStorageExpires, getLocalStorage, setLocalStorage} from '@/util/Helpers'
import useLogin from '@/services/login/useLogin'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';


export default function Login() {

    const router = useRouter();
 
    useEffect(
        () => {
          return () => {
            localStorageExpires() //Auto executa a limpeza
          }
        },
        []
      )

    localStorageExpires(); //Auto executa a limpeza
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 

  const entrar = (e) => {
    e.preventDefault(); 
    let data = {
      username: email,
      password: password
    }

 
    
    useLogin.login(data)
    .then((response) => {
       console.log(response);   
       router.push(`/painel/${getLocalStorage('username')}/${getLocalStorage('userid')}`)
       
    
    })
    .catch((error) => {
        console.log(error);
        alert("Usuário não existe")
     
    })
  }
 

 

  if( getLocalStorage('username') == 'undefined' || getLocalStorage('username') == null || getLocalStorage('username') == '' ){
    console.log( getLocalStorage('username') );
return ( 
    <header className={`${styles.bg_login}`}>
        <div  className={`${styles.container_login}`}>
            <div className='uk-width-1-1 uk-flex uk-flex-center uk-flex-right@m'>
                <FormCuston
                    submit={entrar}
                    titulo = "Área do Aluno"
                    tamanho = "500px"
                > 
                        <InputCuston 
                            name = "email"
                            placeholder ="E-mail"
                            value = {email} 
                            type="email"
                            icon = "icon: mail"
                            handleOnchange = {e => setEmail(e.target.value)}
                        />

                         
              
                        <InputPassword 
                            name = "password"
                            value={password}
                            placeholder ="Senha"
                            handleOnchange = {e => setPassword(e.target.value)}
                        />
                

                        <div className="uk-margin uk-width-1-1">
                            <div className="uk-flex uk-flex-between uk-width-1-1 ">
                                <div> 
                                    <label><input className="uk-radio" type="checkbox"  /> <span className='uk-margin-small-left text'>Lembrar</span></label> 
                                </div>

                                <div className='uk-text-right'>
                                    <a className='text'><i>Esqueceu a senha?</i></a>
                                </div>
                            </div>
                        </div>

                        <div className="uk-margin uk-width-1-1">
                            <input onClick={entrar} type='submit' className='submit' value='Enviar' />
                        </div>

               
                    </FormCuston>

              
                 
            </div>
        </div>
    </header>  
    )

}else{

    return ( 
    window.location.href='/'
    )
}
}
 


 
