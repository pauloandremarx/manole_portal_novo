import {atualizarPerfilAcademic} from "@/services/atualizarPerfil/useAtualizarPerfil";
import {getLocalStorage} from "@/util/Helpers";
import Swal from "sweetalert2";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import styles from "@/components/Manole/Perfil/formPerfil.module.css";
import React, {useState} from "react";
import { useQueries } from "@tanstack/react-query";
import { getMeuSpecialty  } from "@/services/formProfile/useFormProfile";

export default function AdicionarEspecialidade(props) {

    const [especialidade,] =
        useQueries({
            queries: [
                {
                    queryKey: ["adicionar-especialidade"],
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

    const AdicionarEspecialidade = (props) => {

        alert(JSON.stringify(formdataEspecialidade));

        setTimeout(() => {
            const data_formacao = {
                ...formdataEspecialidade,
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

    const [openAdd, setOpenAdd] = useState(false);
    const onOpenModal = () => setOpenAdd(true);
    const onCloseModal = () => setOpenAdd(false);

    const [formdataEspecialidade, setformdataEspecialidade] = useState({
        especialidades:[
            { esp_id:  0 }
        ]
    });

    if (especialidade.isLoading) return "Caregando especialidades...";
    if (especialidade.error)  return "An error has occurred: " + especialidade.error.message;


    const especialidadeOptions = especialidade.data.map((item) => ({
        value: item.id,
        label: item.nome
    }));

    return (
        <>
            <a className={`${styles.adicionar_formacao} `}  onClick={ onOpenModal }   >Adicionar especialidade</a>
            
            {openAdd && (
            <Modal open={openAdd} onClose={onCloseModal }  >
                <div className={`${styles.tamanho_largura_modal}`}>
                    <a className="uk-modal-close-default" type="button" data-uk-close></a>
                    <form className={` uk-margin-top`} onSubmit={forms.especialidade_form.handleSubmit(  AdicionarEspecialidade )} >
                        <h1 className={`uk-heading-line uk-text-default`}>
                            <span>Adicionar especialidade  </span>
                        </h1>

                        <div className={`painel_select uk-margin`}>
                            <label>Especialidade</label>
                            <Controller
                                name="tipo_formacao"
                                control={forms.especialidade_form.control}
                                render={({field  }) => (
                                    <Select
                                        isClearable
                                        {...field}
                                        placeholder="Selecione o tipo de formação"
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setformdataEspecialidade({
                                                ...formdataEspecialidade,
                                                especialidades: [{ ...formdataEspecialidade.especialidades[0], esp_id: parseInt(e.value)}],
                                            });
                                        }
                                        }
                                        value={field.value}
                                        options={especialidadeOptions}
                                    />
                                )}
                                rules={{ required: true }}
                            />

                            {forms.especialidade_form.formState.errors.tipo_formacao?.type === 'required' && <p className="uk-alert-danger"> Campo de tipo de formação é requerido!</p>}
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