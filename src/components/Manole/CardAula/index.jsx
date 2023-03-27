'use client'

import React, { useEffect, useState } from "react"; 
import styles from './Cardaula.module.css'; 
import Link from "next/link";  
import { useRouter } from 'next/navigation'; 
import Modal from 'react-modal'; 
import useCadastro from '@/services/cadastrar/useCadastro'
import { Input, InputMasked, Select, InputHidden } from '../FormElements';
import FormCuston from '../Form'  
import InputCuston from '../InputCuston';
import InputRadio from '../InputRadio' 
 
import { getLocalStorage } from '@/util/Helpers' 
 
let logado = true;

 
    if (getLocalStorage('username') == 'undefined' || getLocalStorage('username') == null || getLocalStorage('username') == '' ){
        logado = false;
    }else{
        logado = true;
    }
 

 
const CardAula = ({url_img="", titulo, professores, link=null, modal_link=null}) => { 
              
 
    const router = useRouter();

             /*Form*/

             const [firstName, setFirstName] = useState(''); 
             const [email, setEmail] = useState('');
             const [telefone, setTelefone] = useState('');
    let error = 0

     useEffect(() => {
        if (logado == true) {
        settexto_card( 'Veja Agora' );    
        }
     }, [logado] );
    
    
    
    
           
        const [ texto_card, settexto_card ] = useState( 'Saiba Mais');
         
             const cadastrar = (e) => { 

                if(firstName == "" ){
                    error = error + 1;
                    document.getElementById("nome").classList.add("uk-form-danger");
                    
    
                }else{
                    error = 0;
                    document.getElementById("nome").classList.remove("uk-form-danger");
                     
    
                }
    
                if(email == "" ){
                    error = error + 1;
                    document.getElementById("email").classList.add("uk-form-danger");
                     
    
    
                }else{
                    error = 0;
                    document.getElementById("email").classList.remove("uk-form-danger");
                }
    
                if(telefone == "" ){
                    error = error + 1;
                    document.getElementById("tel").classList.add("uk-form-danger");
                     
    
    
                }else{
                    error = 0;
                    document.getElementById("tel").classList.remove("uk-form-danger");
                }


                 e.preventDefault(); 
                 let data = {
                     email: email,
                     telefone: telefone,
                     nome:firstName
                 }
 
                 if(error == 0){
                 useCadastro.cadastroAulasGratuitas(data)
                 .then((response) => { 

                    console.log(response);
                     
                    if(response == 200){ 
                        closeModal();
                        router.push(localStorage.getItem('url_aula') || "")
                      
                    } 
             
                 
                 })
                 .catch((error) => {
                     console.log(error);
                     
                alert(error);
                     alert("Não foi possivel cadastrar o usuário!")
                  
                 })
               } }
          
           
          
               
                 const [modalIsOpen, setIsOpen] = React.useState(false);
                
                 function openModal() {
                       
                        setIsOpen(true);
                        var url_aula = '/aulas-gratuitas/' + link;
                        localStorage.setItem('url_aula', url_aula);
                         
                        document.getElementsByTagName("html")[0].style.overflow = "hidden";
                        
                   
                 }
         
                 function afterOpenModal() {
                     // references are now sync'd and can be accessed.
                    
                 }
         
                 function closeModal() {
                    document.getElementsByTagName("html")[0].style.overflow = "auto";
                
                     setIsOpen(false);
                 }

  
   

    return ( 
        <div>
            <div   className={`${styles.card_item_aula} `}>
                <img src={url_img || ""}  />
                <h2>
                    {titulo}
                </h2>

                <p>
                   {professores}
                </p> 

                {logado ?(
                    <Link href={ `/aulas-gratuitas/${ link }` }  className={ `${ styles.notStyle } ` }>{texto_card}</Link> 
                ):(
                    <a onClick={openModal} >{texto_card }</a>
               
                )}


                { /* isLogged ? "<Link to={`/minicursos-single-post/${link}`}><button>Saiba mais</button> </Link>" : '<a uk-toggle={modal_link} >Assistir</a>' */ }

            </div>


            <Modal 
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal} 
                className={`${styles.Modal} `}
                overlayClassName={`${styles.Overlay} Overlay`}
                contentLabel="Example Modal"
            >
                 <div className={`${styles.dentro_modal}    margin_bottom_aulas_modal`}>
                    
                   
                    <FormCuston
                     submit={cadastrar}
                     titulo="Preencha o formulário e receba uma aula gratuita."
                     tamanho='1000px'
                    >
                    <button className="uk-modal-close-default" type="button" data-uk-close onClick={closeModal}></button>
                        <InputCuston 
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            icon="icon: user"
                            value={firstName} 
                            handleOnchange = {e => setFirstName(e.target.value)}
                            filter = "name"
                           
                        />

                        <InputCuston 
                            type="text"
                            name="email"
                            placeholder="E-mail"
                            icon="icon: mail"

                            value={email} 
                            handleOnchange = {e => setEmail(e.target.value)}
                        />

<InputMasked
                       icon = "phone"
                       mask={ "(99) 9999-99999" }
                      
                       
                       name="tel"
                       placeholder=""
                   
                       helperText={ "Insira um telefone válido" }

                       value={telefone}
                       onChange={e => setTelefone(e.target.value)}
                   /> 
                   
                        <InputRadio 
                            legenda="Concordo em fornecer meus dados para receber conteúdos e ofertas por e-mail ou outros meios."
                            value="concordo"
                         />

                        <button className="submit"   type="submit" >Assistir Aula</button>
                       
                  
                        <a className="btn_ja_e_aluno" href="https://www.manoleeducacao.com.br/area-do-aluno/" target='_blank'>Já é aluno Manole? Fazer login</a>
                    </FormCuston>
                 </div>


            
            </Modal>
        </div> 
    )
}

export default CardAula