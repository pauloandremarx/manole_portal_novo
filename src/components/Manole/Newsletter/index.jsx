'use client';
import React, { useState } from 'react';
 import axios from 'axios'
import styles from './newsletter.module.css';  
 
import Swal from 'sweetalert2'
 

const Newsletter =  (props) => {
   
const [email, setEmail] = useState("");
     
    const formPost = async (e) => {
        
        e.preventDefault();
     
        var request = axios({
            method: 'post',
            url: 'https://links.manole-news.com.br/Subscription/Add/50673/34',
            data: { email },
            headers: { 'Content-Type': 'multipart/form-data' },
        });

     

        request.then(function (msg) { 

            Swal.fire({
                icon: 'success',
                title: 'Parabens!',
                text: 'Cadastrado com sucesso!',
                confirmButtonText: 'Confirmar'
            });

        });


        request.catch(function (error) {
           
            console.log(error);
         
            Swal.fire({
                icon: 'error',
                title: 'Erro ao se cadastrar...',
                text: error
            });
        });
    }
   


     


  return (
    <section className={`${styles.bg_cinza_t1}`}  >
                <div   className={`${styles.newsletter}`}>
                    <div>
                        <div>
                            <h2>Esteja sempre atualizado!</h2>
                            <p>Assine nossa newsletter para ficar por dentro de todas as novidades!</p>
                            <form   className={`${styles.newsleter_container}`} id="newslleter" onSubmit={formPost}>
                                <div data-uk-grid className="uk-grid uk-grid-collapse uk-grid">
                                    <div className="uk-width-3-5@m uk-width-1-1">
                                        <input type="email" id="Email" placeholder="Seu melhor e-mail"  onChange={e => setEmail(e.target.value)} value={email} />
                                    </div>
                                    <div className="uk-width-2-5@m uk-width-1-1">
                                        <input type="submit" value="Inscrava-se" />
                                    </div>
                                </div>
                                
                                 <div className='uk-margin-top'><input type='checkbox'  className={` uk-checkbox ${styles.uk_checkbox}`}  required /><label   className={` ${styles.text_plotica}`}  >Ao se cadastrar você irá concordar com nossa <a href="https://politicas.manole.com.br/?_ga=2.219415001.1921928094.1665054127-286631793.1664888369" target="_blank">politica de privacidade</a></label></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
  )
}



export default Newsletter