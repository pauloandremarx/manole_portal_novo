'use client'
import React, { useEffect, useState } from "react";
import styles from './card_produto.module.css';
import Link from "next/link";  
import Modal from 'react-modal';
import useCadastro from '@/services/cadastrar/useCadastro'
import useCadastroLogado from '@/services/cadastrarLogado/useCadastroLogado'
import usePostLogs from '@/services/Postlogs/usePostLogs'
import FormCuston from '../Form' 
import InputRadio from '../InputRadio'

import LoadStatus from '../LoadStatus';

import { Input, InputMasked, Select, InputHidden } from '../FormElements';
import { Region } from '../FormElements/style';
import { getLocalStorage } from '@/util/Helpers' 
import { fetchCitiesFromUF } from '@/services/IBGE';
import { getUFsLocalJson } from '@/services/IBGE/localDatabase';
 

import { useRouter } from 'next/navigation'

var logado  = false;

if (getLocalStorage('username') == 'undefined' || getLocalStorage('username') == null || getLocalStorage('username') == '') {
    logado = false;
} else {
    logado = true;
} 

const CardProduto = (props) => {

    const router = useRouter();

  //const mask = "[0-9]{0,1}[0-9]{4}-[0-9]{4}"; 
  const [ UFs, setUFs ] = useState([]);
  const [ cities, setCities ] = useState([]);
  const [ selectUF, setSelectUF ] = useState("");
  const [ selectCity, setSelectCity ] = useState("");
  const [ statusForm, setStatusForm ] = useState("none");
  // The user will store more cities here
  const [ citiesServed, setCitiesServed ] = useState([]);
  const [ formdata, setFormdata ] = useState({
  curso_id: "",
  curso_id_moodle:"",
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  cidade: "",
  estado: "",
  endereco: "",
  cep: "",
  nascimento: "",  
  });

  const [ errorFormData, setErrorFormData ] = useState({
  nome: false,
  email: false,
  cpf: false,
  telefone: false,
  cidade: false,
  estado: false,
  endereco: false,
  cep: false,
  nascimento: false,

  
  });

  useEffect(() => {
  const value = getUFsLocalJson();
  setUFs(value);
  }, []);

  useEffect(() => {
  if(selectUF !== "") {
      fetchCitiesFromUF(Number(selectUF)).then((value => setCities(value)));
  }
  }, [ selectUF ]);



  function handleSubmitForm(e) { 

  event.preventDefault();
  setStatusForm("loading");

  if(handleInvalidInputs()) {
      setStatusForm("invalid");
      return;
  }

  //Remover este setTimeout
  setTimeout(() => {
      resetErrors();
      setStatusForm("sucess"); 
    

      const data = {
      ...formdata
      };

      useCadastro.cadastroAulasGratuitas(data)
      .then((response) => { 

         console.log(response);
        
         if(response){ 

            closeModal(); 
            router.push(localStorage.getItem('url_aula') || "")
         
          console.log(data);
         } 
  
       
      })
      .catch((error) => {
          console.log(error);
          alert("Não foi possivel cadastrar o usuário!")
       
      })
      
  }, 1000);
  }

  function handleInvalidInputs() {
  resetErrors();

  let hasErrors = false;
  let cloneErrorForm = errorFormData;

  const arrayObjForm = [ 
      { name: "endereco", value: formdata.endereco },
      { name: "email", value: formdata.email },
      { name: "nome", value: formdata.nome },
      { name: "telefone", value: formdata.telefone },
      { name: "cpf", value: formdata.cpf },
      { name: "nascimento", value: formdata.nascimento },
      { name: "cidade", value: formdata.cidade },
      { name: "estado", value: formdata.estado },
      { name: "cep", value: formdata.cep },
     

  ];

  arrayObjForm.forEach((element) => {
      const { name, value } = element;
      if(isEmpty(value)) {
      cloneErrorForm = ({ ...cloneErrorForm, [ name ]: true });
      hasErrors = true;
      }
  });

  setErrorFormData(cloneErrorForm);

  return hasErrors;
  }

  function resetErrors() {
  setErrorFormData({
      nome: false,
      email: false,
      telefone: false,
      cpf: false,
      cidade: false,
      estado: false,
      endereco: false,
      nascimento: false,
      cep: false,
     
  });
  }

  function isEmpty(value) {
  if(value === null || String(value) === '' || String(value).length <= 0) {
      return true;
  }

  return false;
  }


  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
      setIsOpen(true);

      var string_link = "";
      if (props.link){
       string_link = props.link.replace("%20", " "); 
      }else{
         string_link = "";
      }
     
      var url_aula = '/minicursos/' + string_link;
      localStorage.setItem('url_aula', url_aula); 
      localStorage.setItem('curso_id_moodle', props.curso_id_moodle);
      localStorage.setItem('curso_id', props.curso_id);

     

      setFormdata({
          ...formdata,
          curso_id_moodle: props.curso_id_moodle, curso_id: props.curso_id
      }); 



      document.getElementsByTagName("html")[0].style.overflow = "hidden";
  }

  function afterOpenModal() {
      // references are now sync'd and can be accessed.  
  }

  function closeModal() {
      document.getElementsByTagName("html")[0].style.overflow = "auto";

      setIsOpen(false);
  }

 
    
     const cadastroLogado = ( e ) => {
     

    let data_logado = {
        curso_id_moodle: e.target.attributes.getNamedItem( "data-moddleid" ).value,
        curso_id: e.target.attributes.getNamedItem( "data-Id" ).value,
        usu_id: getLocalStorage( 'userid' ), 
    }
         
         
    let data_logs = {
        usu_id: getLocalStorage( 'userid' ),
        tipo: "minicurso",
        conteudo: e.target.attributes.getNamedItem( "data-Id" ).value,
    }
         
         
      useCadastroLogado.cadastroLogadoMiniCursos(data_logado)
      .then((response) => { 

          console.log( response ); 
        
         if(response.data){  
             
             window.open( response.data.url, '_blank' );
             
             usePostLogs.postLogs( data_logs )
                .then( ( response ) => { 
                    console.log( response );  
                            
                })
                .catch( ( error ) => {
                    console.log( error );
                } );
                    } 
  
       
      })
      .catch((error) => {
          console.log(error);
          console.log("Não foi possivel cadastrar o usuário!")
       
      })
    }



    return ( 
       
        <div>
            <div  className={`${styles.card_item_produto} `}>
                
                    <div className="uk-flex uk-flex-center"><img src={props.url_img} width="250" height="250"  /></div>
                    <h2>
                        {props.titulo}
                    </h2>  

                    {logado ?(
                   
                   <a onClick={cadastroLogado} data-id={props.curso_id} data-moddleid={props.curso_id_moodle}>Saiba mais </a> 
                    
                    ):(
                        <a onClick={openModal} data-id={props.curso_id} data-moddleid={props.curso_id_moodle}>Saiba mais </a>
                    )}
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
                 <div className={`${styles.dentro_modal} `}>
                    
                   
                 <FormCuston
                    
                    submit={ handleSubmitForm }
                    titulo="Cadastre-se e receba por e-mail o login e senha para acessar o minicurso."
                    tamanho='1400px'
                   >
                   <button className="uk-modal-close-default" type="button" data-uk-close onClick={closeModal}></button>

                   <div className="uk-child-width-1-2@m uk-margin-medium-bottom" data-uk-grid>

                      
                       
                           <Input
                               label="Nome"
                               name="nome"
                               icon="user"
                               placeholder=""
                               error={ errorFormData.nome }
                               helperText={ "Insira seu nome" }
                               onChange={ (e) => {
                               const { value } = e.target;
                               setFormdata({
                                   ...formdata,
                                   nome: value
                               }); 

                               } }
                           />

                            <Input
                             icon="mail"
                           label="E-mail"
                           name="email"
                           placeholder=""
                           error={ errorFormData.email }
                           helperText={ "Insira seu email" }
                           onChange={ (e) => {
                           const { value } = e.target;
                           setFormdata({
                               ...formdata,
                               email: value
                           });
                           } }
                       />

                   <InputMasked
                       icon = "phone"
                       mask={ "(99) 9999-99999" }
                       label="Telefone"
                       
                       name="telefone"
                       placeholder=""
                       error={ errorFormData.telefone }
                       helperText={ "Insira um telefone válido" }
                       onChange={ (e) => {
                       const { value } = e.target;
                       setFormdata({
                           ...formdata,
                           telefone: value
                       });
                       } }
                   /> 

                       <InputMasked
                       icon = "hashtag"
                       mask={ "999.999.999-99" }
                       label="CPF"
                       type="text"
                       name="cpf"
                       placeholder=""
                       error={ errorFormData.cpf }
                       helperText={ "Insira o cpf" }
                       onChange={ (e) => {
                       const { value } = e.target;
                       setFormdata({
                           ...formdata,
                           cpf: value
                       });
                       } }
                   /> 


                       <InputMasked
                       icon = "clock"
                       mask={ "99/99/9999" }
                       label="Data de nascimento"
                       
                       name="nascimento"
                       placeholder=""
                       error={ errorFormData.nascimento }
                       helperText={ "Insira o cpf" }
                       onChange={ (e) => {
                       const { value } = e.target;
                       setFormdata({
                           ...formdata,
                           nascimento: value
                       });
                       } }
                   /> 


                   <InputMasked
                       icon = "world"
                       mask={ "999-999-99" }
                       label="Cep" 
                       name="cep"
                       placeholder=""
                       error={ errorFormData.cep }
                       helperText={ "Insira o cep" }
                       onChange={ (e) => {
                       const { value } = e.target;
                       setFormdata({
                           ...formdata,
                           cep: value
                       });
                       } }
                   /> 


<Region>
              
               <Select
                 name="estado"
                 label="Estado"
                 placeholder="Selecione um Estado"
                 value={ selectUF }
                 options={ UFs }
                 error={ errorFormData.estado }
                 helperText={ "Selecione um Estado" }
                 onChange={ (e) => {
                   const idUF = e.target.value;
                   const index = e.target.selectedIndex;
                   const nameUF = e.target[ index ].textContent;
                   setFormdata({ ...formdata, estado: nameUF ?? idUF });
                   setSelectUF(idUF);
                 } }
               />

               {
                 selectUF !== "" && <Select
                   name="cidade"
                   label="Cidade"
                   placeholder="Selecione uma cidade"
                   error={ errorFormData.cidade }
                   helperText={ "Selecione uma cidade" }
                   value={ selectCity }
                   onChange={ (e) => {
                     const index = e.target.selectedIndex;
                     const nameCity = e.target[ index ].textContent;
                     setSelectCity(e.target.value);
                     setFormdata({ ...formdata, cidade: nameCity ?? "-" });
                   }
                   }
                   options={ cities }
                 />
               }

             </Region>

             <Input
               icon = "world"
                 label="Endereço Matriz"
                 name="endereco"
                 error={ errorFormData.endereco }
                 helperText={ "Insira um endereço" }
                 placeholder=""
                 onChange={ (e) => {
                   const { value } = e.target;
                   setFormdata({
                     ...formdata,
                     endereco: value
                   });
                 } }
               />
                     
                       </div>

                       <InputRadio 
                           name="lgpd"
                           legenda="Concordo em fornecer meus dados para receber conteúdos e ofertas por e-mail ou outros meios."
                           value="concordo"
                        />

                        
                       <div className="uk-child-width-1-2@m uk-margin-medium-bottom " data-uk-grid >
                      
             
                           <div><button className="submit" type="submit" >Receber aula por e-mail</button> <LoadStatus status={ statusForm } /></div>
                   
                           <div><a className="btn_ja_e_aluno" href="https://www.manoleeducacao.com.br/area-do-aluno/" target='_blank'>Já é aluno Manole? Fazer login</a></div>
                       </div>
                   </FormCuston>
                </div>


           
           </Modal>
        </div>
         
    )
}

export default CardProduto