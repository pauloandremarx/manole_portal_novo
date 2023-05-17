import {atualizarPerfilAcademic} from "@/services/atualizarPerfil/useAtualizarPerfil";
import {getLocalStorage} from "@/util/Helpers";
import Swal from "sweetalert2";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import styles from "@/components/Manole/Perfil/formPerfil.module.css";
import React, {useEffect, useState, Fragment} from "react";
import { useQueries } from "@tanstack/react-query";
import { getPerfilAcademico, getMeuSpecialty } from "@/services/formProfile/useFormProfile";
import Image from "next/image";
export default function EditarEspecialidade(props) {

    const [minhaformacao, especialidade] =
        useQueries({
            queries: [
                {
                    queryKey: ["minhaformacao_edit"],
                    queryFn: () => getPerfilAcademico(getLocalStorage("refleshToken")),
                },
                {
                    queryKey: ["minha_especialidade_edit"],
                    queryFn: () => getMeuSpecialty(),
                },
            ],
        });
    const RegisterForm = () => {
        const { register, formState: { errors }, handleSubmit, control } = useForm();
        return { register, formState: { errors }, handleSubmit, control  };
    }

    const forms = {
        especialidade_form: RegisterForm(),
    }

    const [formdataFormacao, setformdataFormacao] = useState({
        especialidades:[
            { esp_id: 0, delete: true },
            { esp_id: 0 }
        ]
    });

    useEffect(() => {
        if(!minhaformacao.error && !minhaformacao.isLoading && !minhaformacao.isFetching && minhaformacao.data) {
            setformdataFormacao({
                ...formdataFormacao,
                especialidades:[
                    { esp_id: minhaformacao.data.especialidades[0]?.esp_id, delete: true },
                    { esp_id: minhaformacao.data.especialidades[0]?.esp_id }
                ]
            });
        }
    },[minhaformacao.isLoading]);

    const EditarEspecialidade = (props) => {

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
                            text:  response.status == 200 ? "Edição feita com sucesso!" : response.status + ": Não foi possivel editar, tente novamente mais tarde!",
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

    const [openEspAdd, setopenEspAdd] = useState(false);
    const onopenEspModal = () => {setopenEspAdd(true);  };
    const onCloseTModal = () => setopenEspAdd(false);


    if (minhaformacao.isLoading) return "Caregando meu perfil...";
    if (especialidade.isLoading) return "Caregando cursos...";
    if (minhaformacao.error)  return "An error has occurred: " + minhaformacao.error.message;
    if (especialidade.error) return "An error has occurred: " + especialidade.error.message;



    const especialidadeOptions = especialidade.data.map((item) => ({
        value: item.id,
        label: item.nome
    }));




    return (
            <>
                <a className={`${styles.hover_icone} `}  onClick={ onopenEspModal }   > <Image width={25} height={25} src="/manole/perfil/icons8-edit-67.png" alt={"Icone Editar Imagem"} /> </a>

                {minhaformacao.data?.especialidades.map(function(item, i){
                    if(item.esp_id == props.id_especiality){
                    return (
                        <Fragment key={`editar_especialidade_${item.esp_id}`}>
                            {openEspAdd && (
                            <Modal open={openEspAdd} onClose={onCloseTModal }   >
                                <div className={styles.tamanho_largura_modal}>

                                    <form className={`toggle-animation-queued uk-margin-top`} onSubmit={forms.especialidade_form.handleSubmit(  EditarEspecialidade )} >
                                        <h1 className={`uk-heading-line uk-text-default`}>
                                            <span>Editar especialidade</span>
                                        </h1>

                                        <div className={`painel_select uk-margin`}>
                                            <label>Especialidade</label>
                                            <Controller
                                                name="especialidade"
                                                control={forms.especialidade_form.control}
                                                render={({field  }) => (
                                                    <Select
                                                        isClearable
                                                        {...field}
                                                        placeholder="Selecione uma especialidade"
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setformdataFormacao({
                                                                ...formdataFormacao,
                                                                especialidades: [{ ...formdataFormacao.especialidades[0], esp_id: item.esp_id, delete: true }, { esp_id: e.value }],
                                                            });
                                                        }
                                                        }
                                                        value={field.value}
                                                        options={especialidadeOptions}

                                                        defaultValue={{ label:  especialidadeOptions.find(w => w.value ===  item.esp_id ).label, value: item.esp_id}}
                                                    />
                                                )}
                                                rules={{ required: false }}
                                            />

                                            {forms.especialidade_form.formState.errors.especialidade?.type === 'required' && <p className="uk-alert-danger"> Campo de especialidade é requerido!</p>}
                                        </div>

                                        <div className={`uk-margin`}>
                                            <input type="submit"  className="uk-button uk-button-primary" value={"Atualizar"}   />
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                            )}
                        </Fragment>
                    );
                }})}
            </>

        );

}