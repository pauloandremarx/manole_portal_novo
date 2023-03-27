'use client';

import Layoutv2 from "@/components/Manole/Layoutv2";

import useMeuPerfil from '@/services/GetPerfil/useGetPerfil'

import React, { useEffect, useState } from "react";
import { getLocalStorage, removeStorage } from '@/util/Helpers'

import styles from "./meu-perfil.module.css";
import Link from "next/link";
import {  InputMaskedUnico, Select } from "@/components/Manole/FormElements";

import { fetchCitiesFromUF } from "@/services/IBGE";
import { getUFsLocalJson } from "@/services/IBGE/localDatabase";

import useAtualizarPerfil from '@/services/atualizarPerfil/useAtualizarPerfil'

 
import Swal from 'sweetalert2'

export default function MeuPerfil() {

  const { meuperfil, getMeuPerfil } = useMeuPerfil( getLocalStorage( 'refleshToken' ) )
  
    useEffect(() => {
       getMeuPerfil(getLocalStorage( 'refleshToken' ));
    },  [getLocalStorage( 'refleshToken' )] )
  
 

  const [UFs, setUFs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectUF, setSelectUF] = useState();
  const [selectCity, setSelectCity] = useState();
 
const [phone, setPhone] = useState([]);

 const [ formdata, setFormdata ] = useState({
    nome: "", 
    sobrenome: "",
    data_nasc:"",  
    cep: "",
    estado: "",
    cidade: "",
    telefone: "",
  });


   


  useEffect(() => {
  setFormdata( { ...formdata, nome: meuperfil.nome, sobrenome: meuperfil.sobrenome, data_nasc:meuperfil.data_nascimento, cep: meuperfil.cep, estado: meuperfil.estado, cidade: meuperfil.cidade, telefone: meuperfil.telefone,} );
    },  [meuperfil] )


  useEffect(() => {
    const value = getUFsLocalJson();
    setUFs(value);
  }, []);

  useEffect(() => {
    if (selectUF !== "") {
      fetchCitiesFromUF(String(selectUF)).then((value) => setCities(value));
    }
  }, [selectUF]);

  const [disabledName, setDisabledName] = useState(true);
  const handleClickNome = (e) => {
    setDisabledName(!disabledName);
  };

  const [disabledSobrenome, setDisabledSobrenome] = useState(true);
  const handleClickSobrenome = (e) => {
    setDisabledSobrenome(!disabledSobrenome);
  };

  const [disabledEmail, setDisabledEmail] = useState(true);
  const handleClickEmail = (e) => {
    setDisabledEmail(!disabledEmail);
  };

  const [disabledDescricao, setDisabledDescricao] = useState(true);
  const handleClickDescricao = (e) => {
    setDisabledDescricao(!disabledDescricao);
  };

  const [disabledTelefone, setDisabledTelefone] = useState(true);
  const handleClickTelefone = (e) => {
    setDisabledTelefone(!disabledTelefone);
  };

    useEffect(() => {
     setSelectUF( meuperfil.estado );
    }, [ meuperfil.estado ] );
  
  
 

  
    useEffect(() => { 
    const timer = setTimeout( () => { setSelectCity( meuperfil.cidade ); }, 0);
    return () => clearTimeout(timer);
    }, [ cities ] );
  

  
 
  
  
  const [disabledEndereco, setDisabledEndereco] = useState(true);
    const handleClickEndereco = (e) => {
    setDisabledEndereco(!disabledEndereco);
    };
  
  
  useEffect( () => { setPhone( meuperfil.telefone ); }, [ meuperfil ] )
  
  const submitAtualizar = async ( event ) => {  

  event.preventDefault()
   
  //Remover este setTimeout
    setTimeout( () => { 
    
      const data = {
      ...formdata
      };

      useAtualizarPerfil.atualizacaoPerfil(getLocalStorage( 'token' ), data)
        .then( ( response ) => {  
          Swal.fire({
                icon: 'success',
                title: 'Cadastro',
                text: 'Atualizado com sucesso!',
                confirmButtonText: 'Confirmar'
            });
         
      })
      .catch((error) => {
          Swal.fire({
                icon: 'error',
                title: 'Opps!',
                text: 'Não foi possivel atualizar o cadastro, tente novamente mais tarde!'
            });
          
      }) 
    }, 1000);
  }
  

  return (
    <Layoutv2>
      <>
        <div className={`  ${styles.padding_top_large} `}>
          <section className={`  ${styles.container_painel} `}>
            <p className={`${styles.breadcrumb }`}>
              <span>
                <Link href="/painel/" legacyBehavior>
                  <a>Painel do aluno</a>
                </Link>{" "}
              </span>{" "}
              {">"} <span>Meu perfil</span>
            </p> 

            <div className="uk-grid uk-grid-large uk-child-width-1-2@m">
              <div > 
                <div className={`${styles.box_image} `}>
                  <div
                    className={`${styles.img_user}`}
                    style={{
                      backgroundImage: `url("/manole/perfil/user_people.svg")`,
                    }}
                  ></div>
                  <div className={`${styles.box_image_upload} `}>
                    <label for="file-input">
                      <img src="/manole/perfil/botao_photo.svg" />
                    </label>

                    <input
                      id="file-input"
                      className={`${styles.image_upload_input} `}
                      type="file"
                    />
                  </div>
                </div>

                <div className={`${styles.box_start} `}>
                  <div>
                    <div className={`${styles.star_content} `}>
                      <span>16</span>
                    </div>
                  </div>

                  <div className={`${styles.box_experiencia} `}>
                    <div
                      className={`uk-text-center ${styles.ex} ${styles.color_azul} `}
                    >
                      58<span>XP</span>{" "}
                    </div>
                    <div className={`${styles.barcontent} `}>
                      {" "}
                      <div
                        className={`${styles.barcontentColor} `}
                        style={{ width: "40%" }}
                      ></div>
                    </div>
                    <div className={`${styles.padding_l_r} `}>
                      {" "}
                      <div className={`${styles.ex} `}>
                        10<span>XP</span>{" "}
                      </div>{" "}
                      <span className={`${styles.para_nivel} `}>
                        Para o nivel 7
                      </span>{" "}
                    </div>
                  </div>
                </div>

                <h1 className={`${styles.informacoes_perfil} `}>
                  Informações do perfil
                </h1>

                <form className={ `${ styles.container_form }` } onSubmit={submitAtualizar}>
                  <div>
                    <label>Nome</label>
                    <div className="uk-inline uk-width-1-1">
                      <a
                        className="uk-form-icon uk-form-icon-flip"
                        onClick={handleClickNome}
                        data-uk-icon="icon: file-edit"
                      ></a>
                      <input
                        className={ `uk-input ${ styles.input_perfil } ` }
                        type="text"
                        disabled={ disabledName }
                        
                        defaultValue={meuperfil.nome}
                        onChange={ ( e ) => { 
                          const { value } = e.target;
                          setFormdata( {
                            ...formdata,
                            nome: value
                          } );
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label>Sobrenome</label>
                    <div className="uk-inline uk-width-1-1">
                      <a
                        className="uk-form-icon uk-form-icon-flip"
                        onClick={handleClickSobrenome}
                        data-uk-icon="icon: file-edit"
                      ></a>
                      <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={ disabledSobrenome } 
                        defaultValue={ meuperfil.sobrenome }

                        onChange={ ( e ) => { 
                          const { value } = e.target;
                          setFormdata( {
                            ...formdata,
                            sobrenome: value
                          } );
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label>E-mail</label>
                    <div className="uk-inline uk-width-1-1">
                      <a
                        className="uk-form-icon uk-form-icon-flip"
                        onClick={handleClickEmail}
                        data-uk-icon="icon: file-edit"
                      ></a>
                      <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={ disabledEmail } 
                        defaultValue={ meuperfil.email } 
                      />
                    </div>
                  </div>

                

                  <div>
                    <label>Telefone</label>
                    <div className="uk-inline uk-width-1-1">
                      <a
                        className="uk-form-icon uk-form-icon-flip"
                        onClick={handleClickTelefone}
                        data-uk-icon="icon: file-edit"
                      ></a>
                      <InputMaskedUnico 
                     
                       label="Telefone" 
                       name="telefone"
                  
                       disabled={ disabledTelefone } 
                       value={phone}
                   
                        onChange={ ( e ) => {
                         
                        setPhone(e.target.value)
                       const { value } = e.target;
                       setFormdata({
                           ...formdata,
                           telefone: value
                       });
                       } }
                        
                       mask={ "+(99) 99 9 9999-99999" }
                      />    
                 
                    </div>
                  </div>

 

                  <div>
                    <label>Quem pode ver seu e-mail</label>
                    <div className="uk-form-controls">
                      <label className={`${styles.label_circle} `}>
                        <input
                          className="uk-radio"
                          type="radio"
                          name="radio1"
                        />{" "}
                        Ocultar o meu endereço de e-mail de usuários sem
                        privilégio.
                      </label>
                      <br />
                      <label className={`${styles.label_circle} `}>
                        <input
                          className="uk-radio"
                          type="radio"
                          name="radio1"
                        />{" "}
                        Permitir que todos vejam o meu endereço de e-mail.
                      </label>
                      <br />
                      <label className={`${styles.label_circle} `}>
                        <input
                          className="uk-radio"
                          type="radio"
                          name="radio1"
                        />{" "}
                        Apenas os participantes do curso podem ver meu endereço
                        de e-mail.
                      </label>
                    </div>
                  </div>

                  <div>
                    <label>Descrição</label>
                    <div className="uk-inline uk-width-1-1">
                      <a
                        className="uk-form-icon uk-form-icon-flip"
                        onClick={handleClickDescricao}
                        data-uk-icon="icon: file-edit"
                      ></a>
                      <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={disabledDescricao}
                      />
                    </div>
                  </div>

                  <div className={`painel_select `}>
                    <Select
                      name="estado"
                      label="Estado"
                      placeholder="Selecione um Estado"
                      value={ selectUF }   
                      options={UFs}
                      helperText={ "Selecione um Estado" }
                     
                      onChange={ (e) => {
                        const idUF = e.target.value;
                        const index = e.target.selectedIndex;
                        const nameUF = e.target[ index ].textContent;
                        setFormdata({ ...formdata, estado: nameUF ?? idUF });
                        setSelectUF( idUF );  
                       }}
                    />

                  
                      <Select
                        name="cidade"
                        label="Cidade"
                        placeholder="Selecione uma cidade"
                        helperText={"Selecione uma cidade"}
                        value={ selectCity }
                        options={ cities }
                        defaultValue={meuperfil.cidade}
                        onChange={ ( e ) => { 
                          const index = e.target.selectedIndex;
                          const nameCity = e.target[index].textContent;
                         
                          setFormdata( { ...formdata, cidade: nameCity } );
                          setSelectCity(e.target.value);
                         
                        }}
                    
                      />
                  
                  </div>
                

                <div>
                    <label>Endereço</label>
                    <div className="uk-inline uk-width-1-1">
                      <a
                        className="uk-form-icon uk-form-icon-flip"
                        onClick={handleClickEndereco}
                        data-uk-icon="icon: file-edit"
                      ></a>
                      <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={ disabledEndereco } 
                        defaultValue={ meuperfil.endereco }
                      />
                    </div>
                  </div>


               
                  
                <input className={`${styles.atualizar_btn} `} type="submit" value="Atualizar Informações" />

                <a className={`${styles.cancelar_btn} `}>Cancelar</a>
              
                </form>
                </div>
              <div >
                <div>
                  <div
                    className={`${styles.card_branco} uk-child-width-1-2 uk-grid-medium`}
                  >
                    <div className={`${styles.nivel_star_bg}`}>
                      <div>
                        <div className={`${styles.nivel_text}`}>Nivel 6!</div>
                        <div className="uk-flex uk-flex-center">
                          <div
                            className={`${styles.star_content} ${styles.large_star}`}
                          >
                            <span>16</span>
                          </div>
                        </div>

                        <div className={`${styles.total_text}`}>
                          Total 58<span>XP</span>
                        </div>
                      </div>
                    </div>

                    <div className={`${styles.ranking_bg}`}>
                      <div>
                        <h2 className={`${styles.ranking} `}>Ranking</h2>

                        <div className={`${styles.users_ranking}`}>
                          <div className={`uk-position-relative`}>
                            <div
                              className={`uk-text-center ${styles.number_ranking}`}
                            >
                              7
                            </div>
                            <div
                              className={`${styles.raking_img_user}`}
                              style={{
                                backgroundImage: `url("/manole/perfil/user_people.svg")`,
                              }}
                            ></div>
                            <div
                              className={`uk-text-center ${styles.experienc_ranking}`}
                            >
                              +160
                            </div>
                          </div>

                          <div
                            className={`uk-position-relative ${styles.pincipal_user}`}
                          >
                            <div
                              className={`uk-text-center ${styles.number_ranking}`}
                            >
                              7
                            </div>
                            <div
                              className={`${styles.raking_img_user} ${styles.big}`}
                              style={{
                                backgroundImage: `url("/manole/perfil/user_people.svg")`,
                              }}
                            ></div>
                          </div>

                          <div className={`uk-position-relative`}>
                            <div
                              className={`uk-text-center ${styles.number_ranking}`}
                            >
                              7
                            </div>
                            <div
                              className={`${styles.raking_img_user}`}
                              style={{
                                backgroundImage: `url("/manole/perfil/user_people.svg")`,
                              }}
                            ></div>
                            <div
                              className={`uk-text-center ${styles.experienc_ranking}`}
                            >
                              -50
                            </div>
                          </div>
                        </div>

                        <div
                          className={`${styles.box_start} ${styles.box_star_small}  `}
                        >
                          <div
                            className={`${styles.box_experiencia} ${styles.box_margin_top}`}
                          >
                            <div className={`${styles.barcontent} `}>
                              {" "}
                              <div
                                className={`${styles.barcontentColor} `}
                                style={{ width: "40%" }}
                              ></div>
                            </div>
                            <div className={`${styles.padding_l_r} `}>
                              {" "}
                              <div className={`${styles.ex} `}>
                                10<span>XP</span>{" "}
                              </div>{" "}
                              <span className={`${styles.para_nivel} `}>
                                Para o nivel 7
                              </span>{" "}
                            </div>
                          </div>

                          <div>
                            <div
                              className={`${styles.star_content} ${styles.small_star}`}
                            >
                              <span>16</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className={`${styles.card_title}`}>
                      Atividades de login
                    </h2>

                    <div className={`${styles.barra_login}`}>
                      <div>
                        <span>Primeiro acesso ao site</span>
                      </div>

                      <div>
                        <span>Primeiro acesso ao site</span>
                      </div>

                      <div>
                        <span>ultimo acesso ao site</span>
                      </div>
                    </div>
                  </div>

                  <h2 className={`${styles.card_title}`}>
                    Atividades de login
                  </h2>

                  <div
                    className={`${styles.card_branco} uk-child-width-1-4 uk-grid ${styles.text_msg} `}
                  >
                    <div>
                      <div className="uk-flex uk-flex-center"><img src="/manole/perfil/icone_mensagem.svg" /></div>
                      <div>Mensagens no blog</div>
                    </div>

                    <div>
                      <div className="uk-flex uk-flex-center"><img src="/manole/perfil/mensagem_forun.svg" /></div>
                      <div>Mensagens no fórum</div>
                    </div>

                    <div>
                      <div className="uk-flex uk-flex-center"><img src="/manole/perfil/plano_de_ensino.svg" /></div>
                      <div>Planos de aprendizagem</div>
                    </div>

                    <div>
                      <div className="uk-flex uk-flex-center"><img src="/manole/perfil/icone_mensagem.svg" /></div>
                      <div>Mensagens no blog</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    </Layoutv2>
  );
}
