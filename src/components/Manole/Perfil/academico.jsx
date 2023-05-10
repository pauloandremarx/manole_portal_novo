"use client";

import styles from "./formPerfil.module.css";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/util/Helpers";
import {
    SelectInstituicao,
    SelectTipoFormacao,
} from "@/components/Manole/FormElements";
import useAtualizarPerfil from "@/services/atualizarPerfil/useAtualizarPerfil";
import Swal from "sweetalert2";
import { useQuery, useQueries, usersQuery } from "@tanstack/react-query";


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
        nome: "",
        sobrenome: "",
        data_nasc: "",
        cep: "",
        estado: "",
        cidade: "",
        telefone: "",
    });

    const submitAtualizar = async (event) => {
        event.preventDefault();

        //Remover este setTimeout
        setTimeout(() => {
            const data = {
                ...formdata,
            };

            useAtualizarPerfil
                .atualizacaoPerfil(getLocalStorage("token"), data)
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
                <h1 className={`uk-heading-line uk-text-default`}>
                    <span>Formação Acadêmica</span>
                </h1>
                <div className={`uk-margin`}>
                    <label>Id</label>
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
                            defaultValue={minhaformacao.data.formacaoAcademica[0].id}
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

                {instituicoes.error ? (
                    "error"
                ) : (
                    <div className={`painel_select `}>
                        <SelectInstituicao
                            recover={minhaformacao.data.formacaoAcademica[0].inst_id}
                            name="Instituições"
                            label="Instituições"
                            placeholder="Selecione uma Instituições"
                            value={select_active_tipo_especialidades}
                            options={instituicoes.data}
                            helperText={"Selecione uma Instituições"}
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
                )}

                {academicEducation.error ? (
                    "error"
                ) : (
                    <div className={`painel_select `}>
                        <SelectTipoFormacao
                            recover={minhaformacao.data.formacaoAcademica[0].tipo_formacao_id}
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
                                    estado: idActive,
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
                            recover={minhaformacao.data.formacaoAcademica[0].curso_id}
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
                                minhaformacao.data.formacaoAcademica[0].ano_conclusao
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
            </form>
        </>
    );
}
