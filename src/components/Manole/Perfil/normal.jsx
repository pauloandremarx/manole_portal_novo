"use client";

import styles from "./formPerfil.module.css";
import React, {useEffect, useState} from "react";
import { getLocalStorage} from "@/util/Helpers";
import { useQuery } from "@tanstack/react-query";
import { InputMaskedUnico } from "@/components/Manole/FormElements";
import { atualizarPerfil as useAtualizarPerfil } from "@/services/atualizarPerfil/useAtualizarPerfil";
import Swal from "sweetalert2";
import { SelectEstado } from "@/components/Manole/Ufs/SelectEstado";
import { SelectCidade } from "@/components/Manole/Ufs/SelectCidade";
import Config from "@/util/Config";
import Select from "react-select";
import { getPerfilNormal } from "@/services/formProfile/useFormProfile";
import { FaEdit } from "react-icons/fa";


export default function PerfilNormal() {

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["perfil-normal"],
    queryFn: () => getPerfilNormal(getLocalStorage("refleshToken")),
    refetchOnWindowFocus: false,
  });



  const [selectedUf, setSelectedUf] = useState("");
  const [SelectedCity, setSelectedCity] = useState("");


  const [ formdata, setFormdata ] = useState( {
    nome:  "",
    sobrenome:  "",
    data_nasc:  "",
    cep:  "",
    estado:  "",
    cidade:  "",
    telefone: "",
    sexo: "",
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
    sexo: false,
  });



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

  useEffect(() => {
    setFormdata({
      ...formdata,
      estado: selectedUf,
    });
  },[selectedUf]);

  useEffect(() => {
    setFormdata({
      ...formdata,
      cidade: SelectedCity,
    });
  },[SelectedCity]);


  const submitAtualizar = async ( event ) => {
    event.preventDefault();



    const data = {
      ...formdata,
    };


    //Remover este setTimeout
    setTimeout( () => {
      useAtualizarPerfil
        .atualizacaoPerfil( getLocalStorage( "refleshToken" ), data )
        .then( ( response ) => {
          Swal.fire( {
            icon: "success",
            title: "Cadastro",
            text: response.data.message,
            confirmButtonText: "Confirmar",
          } );
        } )
        .catch( ( error, response ) => {
          Swal.fire( {
            icon: "error",
            title: "Opps!",
            text: error,
          } );
        } );
    }, 1000 );
  };

  const options_sexo = [
    { value: 'M', label: 'masculino' },
    { value: 'F', label: 'feminino' },
  ]
  const [selectedSexo, setSelectedSexo] = useState(null);


  const selectedOptionSexo = options_sexo.find(
      (e) => e.value === selectedSexo
  );


  useEffect(() => {
    if(!error && !isLoading && !isFetching && data) {
      setFormdata({
        ...formdata,
        nome: data.nome,
        sobrenome: data.sobrenome,
        data_nasc: data.data_nascimento,
        cep: data.cep,
        estado: data.estado,
        cidade: data.cidade,
        telefone:data.telefone,
        sexo:data.sexo,
      });

      setSelectedSexo(data.sexo);
    }
  },[data]);

  return (
  <>


    {error ? ('erro de carregar') : isLoading || isFetching ? (
      <div class="loader-manole"></div>
        ) :

        data ? (
            <>
              <form className={`${styles.container_form} form_border`} onSubmit={submitAtualizar}>
                <div className={`uk-margin`}>
                  <label>Nome</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickNome}

                    >
                        <FaEdit />
                    </a>
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

                <div className={`uk-margin`}>
                  <label>Sobrenome</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickSobrenome}

                    >   <FaEdit />  </a>
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

                <div className={`uk-margin`}>
                  <label>E-mail</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickEmail}

                    >   <FaEdit />  </a>
                    <input
                        className={`uk-input ${styles.input_perfil} `}
                        type="text"
                        disabled={disabledEmail}
                        defaultValue={data.email}
                    />
                  </div>
                </div>

                <div className={`uk-margin`}>
                  <label>Telefone</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickTelefone}

                    >   <FaEdit />  </a>
                    <InputMaskedUnico
                        label="Telefone"
                        name="telefone"
                        disabled={disabledTelefone}
                        value={data.telefone}
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

                <div className={`uk-margin`}>
                  <label>Sexo</label>
                  <Select
                      placeholder="Selecione um sexo"
                      options={options_sexo}
                      defaultValue={{ label: data.sexo === 'M' ? 'Masculino' : 'Feminino', value: data.sexo }}

                      onChange={(e) => {
                        setFormdata({
                          ...formdata,
                          sexo: e.value,
                        });
                      }}
                  />

                </div>

                <div className={`uk-margin`}>
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



                <div className={`uk-margin`}>
                  <div>
                    <label>Estado</label>
                    <SelectEstado
                        onChange={setSelectedUf}
                        recover={data.estado}

                    />
                  </div>


                  {selectedUf ? (<div className={`uk-margin`}><label>Cidade</label><SelectCidade uf={selectedUf} onChange={setSelectedCity} recover={data.cidade} /></div> ) : ('')}

                </div>
                <div>
                  <label>Endereço</label>
                  <div className="uk-inline uk-width-1-1">
                    <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.myicon}`}
                        onClick={handleClickEndereco}

                    >   <FaEdit />  </a>
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
