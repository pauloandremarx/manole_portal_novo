"use client";

import styles from "./formPerfil.module.css";
import React, {useState } from "react";
import { getLocalStorage} from "@/util/Helpers";
import { useQuery } from "@tanstack/react-query";
import { InputMaskedUnico, Select } from "@/components/Manole/FormElements";
import useAtualizarPerfil from "@/services/atualizarPerfil/useAtualizarPerfil";
import Swal from "sweetalert2";
import { SelectEstado } from "@/components/Manole/Ufs/SelectEstado";
import { SelectCidade } from "@/components/Manole/Ufs/SelectCidade";
import Config from "@/util/Config";


async function getPerfilNormal(token) {
  const res = await fetch(Config.API_URL + `auth/profile`, {
    method: "GET",
    headers: {
      'Content-Type': "application/json; charset=utf-8",
      Authorization: token,
      'Accept': 'application/json'
    },
  });
  const perfil_normal = await res.json();
  return perfil_normal;
}
export default function PerfilNormal() {

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["perfil-normal"],
    queryFn: () => getPerfilNormal(getLocalStorage("token")),
  });


  //const mask = "[0-9]{0,1}[0-9]{4}-[0-9]{4}";
  const [UFs, setUFs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectUF, setSelectUF ] = useState( "" );
  const [selectCity, setSelectCity] = useState("");
  const [selectedUf, setSelectedUf] = useState("");
  // The user will store more cities here
  const [citiesServed, setCitiesServed] = useState([]);

  const [ phone, setPhone ] = useState( [] );

  const [ formdata, setFormdata ] = useState( {
    nome: "",
    sobrenome: "",
    data_nasc: "",
    cep: "",
    estado: "",
    cidade: "",
    telefone: "",
  } );
  const [errorFormData, setErrorFormData] = useState({
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

  /*
  useEffect( () => {
    setFormdata( {
      ...formdata,
      nome: meuperfil.nome,
      sobrenome: meuperfil.sobrenome,
      data_nasc: meuperfil.data_nascimento,
      cep: meuperfil.cep,
      estado: meuperfil.estado,
      cidade: meuperfil.cidade,
      telefone: meuperfil.telefone,
    } );
  }, [] );*/







  const [ disabledName, setDisabledName ] = useState( true );
  const handleClickNome = ( e ) => {
    setDisabledName( !disabledName );
  };

  const [ disabledSobrenome, setDisabledSobrenome ] = useState( true );
  const handleClickSobrenome = ( e ) => {
    setDisabledSobrenome( !disabledSobrenome );
  };

  const [ disabledEmail, setDisabledEmail ] = useState( true );
  const handleClickEmail = ( e ) => {
    setDisabledEmail( !disabledEmail );
  };

  const [ disabledDescricao, setDisabledDescricao ] = useState( true );
  const handleClickDescricao = ( e ) => {
    setDisabledDescricao( !disabledDescricao );
  };

  const [ disabledTelefone, setDisabledTelefone ] = useState( true );
  const handleClickTelefone = ( e ) => {
    setDisabledTelefone( !disabledTelefone );
  };




  const [ disabledEndereco, setDisabledEndereco ] = useState( true );
  const handleClickEndereco = ( e ) => {
    setDisabledEndereco( !disabledEndereco );
  };



  const submitAtualizar = async ( event ) => {
    event.preventDefault();

    //Remover este setTimeout
    setTimeout( () => {
      const data = {
        ...formdata,
      };

      useAtualizarPerfil
        .atualizacaoPerfil( getLocalStorage( "token" ), data )
        .then( ( response ) => {
          Swal.fire( {
            icon: "success",
            title: "Cadastro",
            text: "Atualizado com sucesso!",
            confirmButtonText: "Confirmar",
          } );
        } )
        .catch( ( error ) => {
          Swal.fire( {
            icon: "error",
            title: "Opps!",
            text: "Não foi possivel atualizar o cadastro, tente novamente mais tarde!",
          } );
        } );
    }, 1000 );
  };

  return (
  <>


    {error ? ('erro de carregar') : isLoading || isFetching ? (
      <div class="loader-manole"></div>
        ) :

        data ? (
            <>
              <form className={`${styles.container_form}`} onSubmit={submitAtualizar}>
                <div>
                  <label>Nome</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickNome}
                        data-uk-icon="icon: file-edit"
                    ></a>
                    <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={disabledName}
                        defaultValue={data.nome}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFormdata({
                            ...formdata,
                            nome: value,
                          });
                        }}
                    />
                  </div>
                </div>

                <div>
                  <label>Sobrenome</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickSobrenome}
                        data-uk-icon="icon: file-edit"
                    ></a>
                    <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={disabledSobrenome}
                        defaultValue={data.sobrenome}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFormdata({
                            ...formdata,
                            sobrenome: value,
                          });
                        }}
                    />
                  </div>
                </div>

                <div>
                  <label>E-mail</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickEmail}
                        data-uk-icon="icon: file-edit"
                    ></a>
                    <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={disabledEmail}
                        defaultValue={data.email}
                    />
                  </div>
                </div>

                <div>
                  <label>Telefone</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickTelefone}
                        data-uk-icon="icon: file-edit"
                    ></a>
                    <InputMaskedUnico
                        label="Telefone"
                        name="telefone"
                        disabled={disabledTelefone}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          const { value } = e.target;
                          setFormdata({
                            ...formdata,
                            telefone: value,
                          });
                        }}
                        mask={"+(99) 99 9 9999-99999"}
                    />
                  </div>
                </div>

                <div>
                  <label>Quem pode ver seu e-mail</label>
                  <div className="uk-form-controls">
                    <label className={`${styles.label_circle} `}>
                      <input className="uk-radio" type="radio" name="radio1" /> Ocultar o
                      meu endereço de e-mail de usuários sem privilégio.
                    </label>
                    <br />
                    <label className={`${styles.label_circle} `}>
                      <input className="uk-radio" type="radio" name="radio1" /> Permitir
                      que todos vejam o meu endereço de e-mail.
                    </label>
                    <br />
                    <label className={`${styles.label_circle} `}>
                      <input className="uk-radio" type="radio" name="radio1" /> Apenas os
                      participantes do curso podem ver meu endereço de e-mail.
                    </label>
                  </div>
                </div>

                <div>
                  <label>Descrição</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
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

                <div>
                  <SelectEstado onChange={setSelectedUf} />

                  {selectedUf ? (<SelectCidade uf={selectedUf} />) : ('')}

                </div>
                <div>
                  <label>Endereço</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickEndereco}
                        data-uk-icon="icon: file-edit"
                    ></a>
                    <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={disabledEndereco}
                        defaultValue={data.endereco}
                    />
                  </div>
                </div>

                <input
                    className={`${styles.atualizar_btn} `}
                    type="submit"
                    value="Atualizar Informações"
                />

                <a className={`${styles.cancelar_btn} `}>Cancelar</a>
              </form>
            </>

        ) : ('não achou nada')

    }


  </>
  );
}
