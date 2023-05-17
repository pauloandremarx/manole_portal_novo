import {atualizarPerfilAcademic} from "@/services/atualizarPerfil/useAtualizarPerfil";
import {getLocalStorage} from "@/util/Helpers";
import Swal from "sweetalert2";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import styles from "@/components/Manole/Perfil/formPerfil.module.css";
import React, {useState} from "react";
import { useQuery, useQueries, usersQuery } from "@tanstack/react-query";
import {  getFormacao, getInstituicoes,  getMeuCursos,  getMeuSpecialty, getPerfilAcademico } from "@/services/formProfile/useFormProfile";

export default function AdicionarFormacao(props) {

    const [instituicoes, academicEducation, meus_cursos] =
        useQueries({
            queries: [
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
            ],
        });
    const RegisterForm = () => {
        const { register, formState: { errors }, handleSubmit, control } = useForm();
        return { register, formState: { errors }, handleSubmit, control  };
    }

    const forms = {
        profissao: RegisterForm(),
    }

    const [openAdd, setOpenAdd] = useState(false);
    const onOpenModal = () => setOpenAdd(true);
    const onCloseModal = () => setOpenAdd(false);

    const [formdataFormacao, setformdataFormacao] = useState({
        formacaoAcademica: [{
            inst_id: 0,
            curso_id: 0,
            ano_conclusao: 0,
            tipo_formacao_id: 0,
        }]
    });

    const AdicionarFormacao = (props) => {
        //Remover este setTimeout
        setTimeout(() => {
            const data_formacao = {
                ...formdataFormacao,
            };

            atualizarPerfilAcademic
                .atualizacaoPerfilAcademic(getLocalStorage("refleshToken"), data_formacao)
                .then((response) => {

                        Swal.fire({
                            icon: "success",
                            title: "Formação!",
                            text:  response.status == 200 ? "Formação adicionada com sucesso!" : response.status + ": Não foi possível adicionar formação, tente novamente mais tarde!",
                            confirmButtonText: "Confirmar",
                        })
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "Error",
                        title: "Opps!",
                        text: error,
                    });
                });

            setTimeout(() => {
                if (window && window.location) window.location.reload();
            }, 1000);

        }, 500);
    };



    if (instituicoes.isLoading) return "Caregando instituições...";
    if (academicEducation.isLoading) return "Caregando formação...";
    if (meus_cursos.isLoading) return "Caregando cursos...";
    if (instituicoes.error)  return "An error has occurred: " + instituicoes.error.message;
    if (academicEducation.error)  return "An error has occurred: " + academicEducation.error.message;
    if (meus_cursos.error)  return "An error has occurred: " + academicEducation.error.message;

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
            <a className={`${styles.adicionar_formacao} `}  onClick={ onOpenModal }   >Adicionar formação</a>


            {openAdd && (
            <Modal open={openAdd} onClose={onCloseModal }  >
                <div className={`${styles.modal_custom}`}>
                    <a className="uk-modal-close-default" type="button"  ></a>
                    <form className={` uk-margin-top`} onSubmit={forms.profissao.handleSubmit(  AdicionarFormacao )} >
                        <h1 className={`uk-heading-line uk-text-default`}>
                            <span>Adicionar Formação Acadêmica  </span>
                        </h1>

                        <div className={`uk-margin`}>
                            <label>Ano de conclusão</label>
                            <div className="uk-inline uk-width-1-1">
                                <input
                                    className={`uk-input ${styles.input_perfil} `}
                                    type="number"
                                    {...forms.profissao.register("ano", { required: true, max: 2100, min: 1900, valueAsNumber: true })}
                                    aria-invalid={forms.profissao.formState.errors.ano ? "true" : "false"}
                                    onChange={(e) => {
                                        const { value } = e.target;

                                        setformdataFormacao({
                                            ...formdataFormacao,
                                            formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], ano_conclusao: parseInt(value)}],
                                        });
                                    }}
                                />

                            </div>
                            {forms.profissao.formState.errors.ano?.type === 'required' && <p className="uk-alert-danger">Campo de ano requerido!</p>}
                            {forms.profissao.formState.errors.ano?.type === "max" && <p className="uk-alert-danger">Campo de ano tem que ser menor do que 2100!</p>}
                            {forms.profissao.formState.errors.ano?.type === 'min' && <p className="uk-alert-danger">Campo de ano tem que ser maior do que 1900!</p>}
                            {forms.profissao.formState.errors.ano?.type === 'valueAsNumber' && <p className="uk-alert-danger">Campo de ano tem que ser uma valor numérico!</p>}
                        </div>

                        <div className={`painel_select uk-margin`}>
                            <label>Nome da instituição</label>
                            <Controller
                                name="instituicao"
                                control={forms.profissao.control}
                                render={({field  }) => (
                                    <Select
                                        isClearable
                                        {...field}
                                        placeholder="Selecione a instituição"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setformdataFormacao({
                                                ...formdataFormacao,
                                                formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], inst_id: parseInt(e.value)}],
                                            });
                                        }
                                        }
                                        value={field.value}
                                        options={instituicoesOptions}

                                    />
                                )}
                                rules={{ required: true }}
                            />

                            {forms.profissao.formState.errors.instituicao?.type === 'required' && <p className="uk-alert-danger"> Campo de instituição é requerido!</p>}
                        </div>


                        <div className={`painel_select uk-margin`}>
                            <label>Tipo de Formação</label>
                            <Controller
                                name="tipo_formacao"
                                control={forms.profissao.control}
                                render={({field  }) => (
                                    <Select
                                        isClearable
                                        {...field}
                                        placeholder="Selecione o tipo de formação"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setformdataFormacao({
                                                ...formdataFormacao,
                                                formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], tipo_formacao_id: parseInt(e.value)}],
                                            });
                                        }
                                        }
                                        value={field.value}
                                        options={academicEducationOptions}

                                    />
                                )}
                                rules={{ required: true }}
                            />

                            {forms.profissao.formState.errors.tipo_formacao?.type === 'required' && <p className="uk-alert-danger"> Campo de tipo de formação é requerido!</p>}
                        </div>


                        <div className={`painel_select `}>
                            <label>Curso</label>
                            <Controller
                                name="cursos"
                                control={forms.profissao.control}
                                render={({field  }) => (
                                    <Select
                                        isClearable
                                        {...field}
                                        placeholder="Selecione o curso"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setformdataFormacao({
                                                ...formdataFormacao,
                                                formacaoAcademica: [{ ...formdataFormacao.formacaoAcademica[0], curso_id:  parseInt(e.value)}],
                                            });
                                        }}
                                        value={field.value}
                                        options={coursesOptions}

                                    />
                                )}
                                rules={{ required: true }}
                            />
                            {forms.profissao.formState.errors.cursos?.type === 'required' && <p className="uk-alert-danger"> Campo de cursos é requerido!</p>}
                        </div>
                        <div className={`uk-margin`}>
                            <input type="submit"  className="uk-button uk-button-primary" value={"Cadastrar"}   />
                        </div>
                    </form>
                </div>
            </Modal>
            )}
        </>
        );

}