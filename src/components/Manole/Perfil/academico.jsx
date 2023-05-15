"use client";

import styles from "./formPerfil.module.css";
import React, { useEffect, useState, useRef } from "react";
import { useEffectX } from "use-effect-x";
import { getLocalStorage } from "@/util/Helpers";
import { SelectInstituicao, SelectTipoFormacao,
} from "@/components/Manole/FormElements";
import {atualizarPerfilAcademic, atualizarPerfil} from "@/services/atualizarPerfil/useAtualizarPerfil";
import Swal from "sweetalert2";
import { useQuery, useQueries, usersQuery } from "@tanstack/react-query";

import { usePathname, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { getPerfilAcademico, getInstituicoes, getFormacao, getMeuCursos, getMeuSpecialty } from "@/services/formProfile/useFormProfile";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from 'react-select';

import AdicionarFormacao from "@/components/Manole/Perfil/AdicionarFormacao";
import EditarFormacao from "@/components/Manole/Perfil/EditarFormacao";
import {FaEdit} from "react-icons/fa";
export default function PerfilAcademico() {

    const registerForm = () => {
        const { register, formState: { errors }, handleSubmit, control } = useForm();
        return { register, formState: { errors }, handleSubmit, control  };
    }


    const forms = {
        profissao: registerForm(),
        perfil: registerForm(),
        especialidade: registerForm(),
    }


    const router = useRouter();

    const [minhaformacao, instituicoes, academicEducation, meus_cursos, meu_specialty] =
        useQueries({
            queries: [
                {
                    queryKey: ["minhaformacao"],
                    queryFn: () => getPerfilAcademico(getLocalStorage("refleshToken")),
                },

                {
                    queryKey: ["instituicoes"],
                    queryFn: () => getInstituicoes(),
                },

                {
                    queryKey: ["academicEducation"],
                    queryFn: () => getFormacao(),
                },

                {
                    queryKey: ["meus_cursos"],
                    queryFn: () => getMeuCursos(),
                },

                {
                    queryKey: ["meu_specialty"],
                    queryFn: () => getMeuSpecialty(),
                },

            ],
        });

    /* ------------------------------------------------- Fim chamando instituicoes ------------------------------------------------- */

    /* ------------------------------------------------- Fim tipo de  cursos ------------------------------------------------- */

    const [select_active_tipo_especialidades, set_select_active_tipo_especialidades] = useState();


    const [formdata, setFormdata] = useState({
        formacaoAcademica: [{
            inst_id: 0,
            curso_id: 0,
            ano_conclusao: 0,
            tipo_formacao_id: 0,
        },
            {
                id: "",
                delete: true
            }
        ],
        especialidades:[
            { esp_id:  "", delete: true
            },
            { esp_id: "" }
        ],
        trabalho: {
            local_trabalho: "",
            cargo: "",
        },
    });





    const submitAtualizar = async (event) => {
        event.preventDefault();

        //Remover este setTimeout
        setTimeout(() => {
            const data = {
                ...formdata,
            };

            alert(JSON.stringify(formdata));

            atualizarPerfilAcademic
                .atualizacaoPerfilAcademic(getLocalStorage("refleshToken"), data)
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Cadastro",
                        text:  response == 200 ? "Cadastro atualizado com sucesso!" : "Não foi possivel atualizar o cadastro, tente novamente mais tarde!",
                        confirmButtonText: "Confirmar",
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Opps!",
                        text: "Não foi possivel atualizar o cadastro, tente novamente mais tarde!",
                    });
                });
        }, 1000);
    };

    const [disabledName, setDisabledName] = useState(true);
    const handleClickNome = () => {
        setDisabledName(!disabledName);
    };


    const excluirFormcao = async (event) => {
      const formacaoExclude= {
          formacaoAcademica: [
              {
                  id:  parseInt( event.target.closest(`a`).dataset.exclude),
                  delete: true
              }
          ]};


        setTimeout(() => {
            const data_formacao_exclude = {
                ...formacaoExclude,
            };

            atualizarPerfilAcademic
                .atualizacaoPerfilAcademic(getLocalStorage("refleshToken"), data_formacao_exclude)
                .then((response) => {

                    response == 200
                        ?
                    Swal.fire({
                        icon: "success",
                        title: "Formação!",
                        text:  "Formação excluida com sucesso!",
                        confirmButtonText: "Confirmar",
                    }) :
                        Swal.fire({
                            icon: "error",
                            title: "Opps!",
                            text: "Não foi possivel cadastrar a formação, tente novamente mais tarde!",
                        });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Opps!",
                        text: "Não foi possivel cadastrar a formação, tente novamente mais tarde!",
                    });
                });

            setTimeout(() => {if (window && window.location) window.location.reload(); }, 1000);

        }, 500);

    };



    const EditarFormcao = async (event) => {

        const formacaoExclude= {
            formacaoAcademica: [
                {
                    id:  parseInt(event.target.dataset.exclude),
                    delete: true
                }
            ]};

        setTimeout(() => {
            const data_formacao = {
                ...formdataFormacao,
            };

            atualizarPerfilAcademic
                .atualizacaoPerfilAcademic(getLocalStorage("refleshToken"), formacaoExclude)
                .then((response) => {

                    response == 200
                        ?
                        Swal.fire({
                            icon: "success",
                            title: "Formação!",
                            text:  "Formação excluida com sucesso!",
                            confirmButtonText: "Confirmar",
                        }) :
                        Swal.fire({
                            icon: "error",
                            title: "Opps!",
                            text: "Não foi possivel cadastrar a formação, tente novamente mais tarde!",
                        });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Opps!",
                        text: "Não foi possivel cadastrar a formação, tente novamente mais tarde!",
                    });
                });

            setTimeout(() => {if (window && window.location) window.location.reload(); }, 1000);

        }, 500);

    };

    useEffect(() => {
        if(!minhaformacao.error && !minhaformacao.isLoading && !minhaformacao.isFetching && minhaformacao.data) {
            setFormdata({
                ...formdata,
                formacaoAcademica: [{
                    inst_id: minhaformacao.data.formacaoAcademica[0]?.inst_id,
                    curso_id:  minhaformacao.data.formacaoAcademica[0]?.curso_id,
                    ano_conclusao: minhaformacao.data.formacaoAcademica[0]?.ano_conclusao,
                    tipo_formacao_id: minhaformacao.data.formacaoAcademica[0]?.tipo_formacao_id,
                },
                    {
                        id: minhaformacao.data.formacaoAcademica[0]?.id,
                        delete: true
                    }
                ],
                especialidades:[
                    { esp_id:  minhaformacao.data.especialidades[0]?.esp_id, delete: true
                    },
                    { esp_id: minhaformacao.data.especialidades[0]?.esp_id}
                ],
                trabalho: {
                    local_trabalho: minhaformacao.data.trabalho[0]?.local_trabalho,
                    cargo: minhaformacao.data.trabalho[0]?.cargo_funcao
                },
            });


        }
    },[!minhaformacao.isLoading]);


    const [openEdit, setOpenEdit] = useState(false);
    const [openExclude, setOpenExclude] = useState(false);
    const [editar_id, setEditar_id] = useState(false);

    const onOpenEditModal = () => setOpenEdit(true);
    const onCloseEditModal = () => setOpenEdit(false);

    if (minhaformacao.isLoading) return "Caregando meu perfil...";
    if (instituicoes.isLoading) return "Caregando instituições...";
    if (academicEducation.isLoading) return "Caregando formação...";
    if (meus_cursos.isLoading) return "Caregando cursos...";
    if (meu_specialty.isLoading) return "Caregando cursos...";


    if (minhaformacao.error)
        return "An error has occurred: " + minhaformacao.error.message;
    if (instituicoes.error)
        return "An error has occurred: " + instituicoes.error.message;
    if (academicEducation.error)
        return "An error has occurred: " + academicEducation.error.message;
    if (meus_cursos.error)
        return "An error has occurred: " + academicEducation.error.message;
    if (meu_specialty.error)
        return "An error has occurred: " + meu_specialty.error.message;



    const instituicoesOptions = instituicoes.data.map((item) => ({
        value: item.inst_id,
        label: item.inst_nome
    }));

    const coursesOptions = meus_cursos.data.map((item) => ({
        value: item.id,
        label: item.nome
    }));

    const academicEducationOptions = academicEducation.data.map((item) => ({
        value: item.id,
        label: item.nome
    }));


   return (
        <>

            <AdicionarFormacao   />
                {/*Start*/}
                {minhaformacao.data?.formacaoAcademica.map(function(item, i){

                    return (
                        <>
                            <h1 className={`uk-text-default  uk-flex uk-flex-between`}>
                                    <span className={`uk-heading-bullet`}>
                                        Formação Acadêmica {i + 1}
                                    </span>
                                    <span>
                                        <a className={styles.hover_icone} onClick={excluirFormcao} data-exclude={item.id}> <img width={25} src="/manole/perfil/icons8-x-67.png" /></a>
                                          <EditarFormacao  id_formation={item.id}   />
                                    </span>
                            </h1>


                            <div className={`uk-margin`}>
                                <label>Instituicoes</label>
                                <div className="uk-inline uk-width-1-1">
                                    <input
                                        className={`uk-input ${styles.input_perfil} `}
                                        type="text"
                                        disabled
                                        defaultValue={instituicoes?.data.find(word => word.inst_id ===  item.inst_id ).inst_nome }
                                    />
                                </div>
                            </div>

                            <div className={`uk-margin`}>
                                <label>Tipo de formação</label>
                                <div className="uk-inline uk-width-1-1">
                                    <input
                                        className={`uk-input ${styles.input_perfil} `}
                                        type="text"
                                        disabled
                                        defaultValue={academicEducation?.data.find(word => word.id ===  item.tipo_formacao_id ).nome }
                                    />
                                </div>
                            </div>

                            <div className={`uk-margin`}>
                                <label>Curso</label>
                                <div className="uk-inline uk-width-1-1">
                                    <input
                                        className={`uk-input ${styles.input_perfil} `}
                                        type="text"
                                        disabled
                                        defaultValue={meus_cursos?.data.find(word => word.id ===  item.curso_id ).nome }
                                    />
                                </div>
                            </div>
                            <div className={`uk-margin`}>
                                <label>Ano de conclusão</label>
                                <div className="uk-inline uk-width-1-1">
                                    <input
                                        className={`uk-input ${styles.input_perfil} `}
                                        type="text"
                                        disabled
                                        defaultValue={
                                            item.ano_conclusao
                                        }
                                    />
                                </div>
                            </div>
                            <hr />
                        </>
                    )
                })}
            <form className={`${styles.container_form}`} onSubmit={submitAtualizar}>
                {/*END*/}
                {meu_specialty.error ? (
                    "error"
                ) : (<>
                <h1 className={`uk-heading-line uk-text-default`}>
                    <span>Especialidades</span>
                </h1>

                <div className={`painel_select `}>
                    <SelectTipoFormacao
                        recover={minhaformacao.data.especialidades[0].esp_id}
                        name="Especialidade"
                        label="Especialidade"
                        placeholder="Selecione uma especialidade"
                        value={select_active_tipo_especialidades}
                        options={meu_specialty.data}
                        helperText={"Selecione uma especialidade"}
                        onChange={(e) => {
                            const idActive = e.target.value;
                            setFormdata({
                                ...formdata,
                                especialidades: [{ ...formdata.especialidades[0], esp_id: parseInt(idActive)}],
                            });
                            set_select_active_tipo_especialidades(idActive);
                        }}
                    />
                </div>
                    </>
            )}
                <h1 className={`uk-heading-line uk-text-default`}>
                    <span>Trabalho </span>
                </h1>
                <div className={`uk-margin`}>
                    <label>Local de trabalho</label>
                    <div className="uk-inline uk-width-1-1">
                        <a  className="uk-form-icon uk-form-icon-flip"
                             >
                            <FaEdit />
                        </a>
                        <input
                            className={`uk-input ${styles.input_perfil} `}
                            type="text"

                            defaultValue={minhaformacao.data.trabalho[0].local_trabalho}
                            onChange={(e) => {
                                const { value } = e.target;
                                setFormdata({
                                    ...formdata,
                                    trabalho: { ...formdata.trabalho, local_trabalho:  value}
                                });
                            }}
                        />
                    </div>
                </div>

                <div className={`uk-margin`}>
                    <label>Cargo/Função</label>
                    <div className="uk-inline uk-width-1-1">
                        <a
                            className="uk-form-icon uk-form-icon-flip"


                        >   <FaEdit />  </a>
                        <input
                            className={`uk-input ${styles.input_perfil} `}
                            type="text"

                            defaultValue={minhaformacao.data.trabalho[0].cargo_funcao}

                            onChange={(e) => {
                                const { value } = e.target;
                                setFormdata({
                                    ...formdata,
                                    trabalho: { ...formdata.trabalho, cargo:  value}
                                });
                            }}


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
    );
}
