"use client";

import styles from "./formPerfil.module.css";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/util/Helpers";
import {
    SelectInstituicao,
    SelectTipoFormacao,
} from "@/components/Manole/FormElements";
import {atualizarPerfilAcademic, atualizarPerfil} from "@/services/atualizarPerfil/useAtualizarPerfil";
import Swal from "sweetalert2";
import { useQuery, useQueries, usersQuery } from "@tanstack/react-query";

import { usePathname, useRouter } from "next/navigation";
import Config from "@/util/Config";

async function getPerfilAcademico(token) {
    const res = await fetch(Config.API_URL + `auth/profile/academy`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: token,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const minhaformacao = await res.json();
    return minhaformacao;
}

async function getInstituicoes() {
    const res = await fetch(
        Config.API_URL + `auth/profile/institutions?search=`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: Config.API_KEY,
                Accept: "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const instituicoes_total = await res.json();
    const instituicoes = instituicoes_total.instituicoes;
    return instituicoes;
}

async function getFormacao() {
    const res = await fetch(Config.API_URL + `auth/profile/academicEducation`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: Config.API_KEY,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const academicEducation_total = await res.json();
    const academicEducation = academicEducation_total.academicEducation;
    return academicEducation;
}

async function getMeuCursos() {
    const res = await fetch(Config.API_URL + `auth/profile/courses?search=`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: Config.API_KEY,
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const meus_cursos_total = await res.json();
    const meus_cursos = meus_cursos_total.courses;
    return meus_cursos;
}



async function getMeuSpecialty() {
    const res = await fetch(
        Config.API_URL + `auth/profile/specialty?search=`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: Config.API_KEY,
                Accept: "application/json",
            },
        }
    );

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const meu_specialty_total = await res.json();
    const meu_specialty = meu_specialty_total.specialty
    return meu_specialty;
}

export default function PerfilAcademico() {

    const router = useRouter();

    const [minhaformacao, instituicoes, academicEducation, meus_cursos, meu_specialty] =
        useQueries({
            queries: [
                {
                    queryKey: ["academico-total"],
                    queryFn: () => getPerfilAcademico(getLocalStorage("token")),
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


    const { select_active_tipo_formacoes, set_select_active_tipo_formacoes } =  useState();

    const [campo_cursos, set_campo_cursos] = useState([]);
    const [select_active_tipo_cursos, set_select_active_tipo_cursos] = useState();
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
            cargo: ""
        },
    });


    const [formdataFormacao, setformdataFormacao] = useState({
        formacaoAcademica: [{
            inst_id: 0,
            curso_id: 0,
            ano_conclusao: 0,
            tipo_formacao_id: 0,
        }]
    });





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
    },[minhaformacao]);

    const submitAtualizar = async (event) => {
        event.preventDefault();

        //Remover este setTimeout
        setTimeout(() => {
            const data = {
                ...formdata,
            };

            atualizarPerfil
                .atualizacaoPerfil(getLocalStorage("refleshToken"), data)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Cadastro",
                        text: "Atualizado com sucesso!",
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


    const AdicionarFormacao = async (event) => {
        //Remover este setTimeout
        setTimeout(() => {
            const data_formacao = {
                ...formdataFormacao,
            };


            alert(JSON.stringify(formdataFormacao))

            atualizarPerfilAcademic
                .atualizacaoPerfilAcademic(getLocalStorage("refleshToken"), data_formacao)
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        title: "Cadastro",
                        text:  JSON.stringify(response),
                        confirmButtonText: "Confirmar",
                    });
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Opps!",
                        text: "Não foi possivel cadastrar a formação, tente novamente mais tarde!",
                    });
                });

            setTimeout(() => {if (window && window.location) window.location.reload(); }, 91000);

        }, 1000);
    };


    const excluirFormcao = async (event) => {

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
                    Swal.fire({
                        icon: "success",
                        title: "Formação!",
                        text:  response.status == 200 ? "Formação excluida com sucesso!" : "Erro ao excluir formação!",
                        confirmButtonText: "Confirmar",
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



    return (
        <>
            <form className={`${styles.container_form}`} onSubmit={submitAtualizar}>

                {/*Start*/}

                <button className="uk-button uk-button-default" type="button"
                        uk-toggle="target: .toggle-animation-queued; animation: uk-animation-fade; queued: true; duration: 300">Adicionar formação
                </button>
                <div className={`toggle-animation-queued uk-margin-top`} hidden>
                    <h1 className={`uk-heading-line uk-text-default`}>
                        <span>Adcionar Formação Acadêmica  </span>
                    </h1>

                    <div className={`uk-margin`}>
                        <label>Ano de conclusão</label>
                        <div className="uk-inline uk-width-1-1">
                            <a
                                className="uk-form-icon uk-form-icon-flip"
                                onClick={handleClickNome}
                                data-uk-icon="icon: file-edit"
                            ></a>
                            <input
                                className={`uk-input ${styles.input_perfil} `}
                                 type="number" min="1900" max="2100" required


                                onChange={(e) => {
                                    const { value } = e.target;

                                    setformdataFormacao({
                                        ...formdataFormacao,
                                        formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], ano_conclusao: parseInt(value)}],
                                    });
                                }}
                            />
                        </div>
                    </div>

                        <div className={`painel_select `}>
                            <SelectInstituicao
                                name="Instituições"
                                label="Instituições"
                                placeholder="Selecione uma Instituições"
                                value={select_active_tipo_especialidades}
                                options={instituicoes.data}
                                helperText={"Selecione uma Instituições"}
                                onChange={(e) => {
                                    const idActive = e.target.value;
                                    setformdataFormacao({
                                        ...formdataFormacao,
                                        formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], inst_id:  parseInt(idActive)}],
                                    });

                                }}
                            />
                        </div>


                        <div className={`painel_select `}>
                            <SelectTipoFormacao

                                name="Formação"
                                label="Formação"
                                placeholder="Selecione um formação"
                                value={select_active_tipo_formacoes}
                                options={academicEducation.data}
                                helperText={"Selecione um Formação"}
                                onChange={(e) => {
                                    const idActive = e.target.value;

                                    setformdataFormacao({
                                        ...formdataFormacao,
                                        formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], tipo_formacao_id:  parseInt(idActive)}],
                                    });

                                }}
                            />
                        </div>




                        <div className={`painel_select `}>
                            <SelectTipoFormacao

                                name="Curso"
                                label="Curso"
                                placeholder="Selecione um curso"
                                value={select_active_tipo_formacoes}
                                options={meus_cursos.data}
                                helperText={"Selecione um Curso"}
                                onChange={(e) => {
                                    const idActive = e.target.value;

                                    setformdataFormacao({
                                        ...formdataFormacao,
                                        formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], curso_id:  parseInt(idActive)}],
                                    });

                                }}
                            />
                        </div>



                    <a className="uk-button uk-button-primary"  onClick={AdicionarFormacao} >Cadastrar</a>
                </div>


                {minhaformacao.data?.formacaoAcademica.map(function(item, i){
                    return (
                        <>
                            <h1 className={`uk-heading-line uk-text-default`}>
                                <span>Formação Acadêmica {i + 1}   <a style={{color:"red"}} onClick={excluirFormcao} data-exclude={item.id}>Excluir</a> </span>

                            </h1>

                            {instituicoes.error ? (
                                "error"
                            ) : (
                                <div className={`painel_select `}>
                                    <SelectInstituicao
                                        recover={item?.inst_id}
                                        name="Instituições"
                                        label="Instituições"
                                        placeholder="Selecione uma Instituições"
                                        value={select_active_tipo_especialidades}
                                        options={instituicoes?.data}
                                        helperText={"Selecione uma Instituições"}
                                        onChange={(e) => {
                                            const idActive = e.target.value;

                                            setFormdata({
                                                ...formdata,

                                            });
                                            set_select_active_tipo_especialidades(idActive);
                                        }}
                                    />
                                </div>
                            )}

                            {academicEducation.error ? (
                                "error"
                            ) : (
                                <div className={`painel_select `}>
                                    <SelectTipoFormacao
                                        recover={item.tipo_formacao_id}
                                        name="Formação"
                                        label="Formação"
                                        placeholder="Selecione um formação"
                                        value={select_active_tipo_formacoes}
                                        options={academicEducation.data}
                                        helperText={"Selecione um Formação"}
                                        onChange={(e) => {
                                            const idActive = e.target.value;

                                            setFormdata({
                                                ...formdata,

                                            });
                                            set_select_active_tipo_formacoes(idActive);
                                        }}
                                    />
                                </div>
                            )}

                            {meus_cursos.error ? (
                                "error"
                            ) : (
                                <div className={`painel_select `}>
                                    <SelectTipoFormacao
                                        recover={item.curso_id}
                                        name="Curso"
                                        label="Curso"
                                        placeholder="Selecione um curso"
                                        value={select_active_tipo_formacoes}
                                        options={meus_cursos.data}
                                        helperText={"Selecione um Curso"}
                                        onChange={(e) => {
                                            const idActive = e.target.value;

                                            setFormdata({
                                                ...formdata,
                                                estado: idActive,
                                            });
                                            set_select_active_tipo_formacoes(idActive);
                                        }}
                                    />
                                </div>
                            )}

                            <div className={`uk-margin`}>
                                <label>Ano de conclusão</label>
                                <div className="uk-inline uk-width-1-1">
                                    <a
                                        className="uk-form-icon uk-form-icon-flip"
                                        onClick={handleClickNome}
                                        data-uk-icon="icon: file-edit"
                                    ></a>
                                    <input
                                        className={`uk-input ${styles.input_perfil} `}
                                        type="text"
                                        disabled={disabledName}
                                        defaultValue={
                                            item.ano_conclusao
                                        }
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
                        </>
                    )
                })}

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
                                estado: idActive,
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
                        <a
                            className="uk-form-icon uk-form-icon-flip"
                            onClick={handleClickNome}
                            data-uk-icon="icon: file-edit"
                        ></a>
                        <input
                            className={`uk-input ${styles.input_perfil} `}
                            type="text"
                            disabled={disabledName}
                            defaultValue={minhaformacao.data.trabalho[0].local_trabalho}
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
                    <label>Cargo/Função</label>
                    <div className="uk-inline uk-width-1-1">
                        <a
                            className="uk-form-icon uk-form-icon-flip"
                            onClick={handleClickNome}
                            data-uk-icon="icon: file-edit"
                        ></a>
                        <input
                            className={`uk-input ${styles.input_perfil} `}
                            type="text"
                            disabled={disabledName}
                            defaultValue={minhaformacao.data.trabalho[0].cargo_funcao}
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
