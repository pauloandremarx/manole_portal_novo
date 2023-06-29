"use client";

import Layoutv2 from "@/components/Manole/Layoutv2";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { redirect, useRouter } from "next/navigation";
import { getLocalStorage } from "@/util/Helpers";

import Image from "next/image";
import styles from "./minha-senha.module.css";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { atualizarPerfilPassword } from "@/services/atualizarPerfil/useAtualizarPerfil";
import { useSession } from "next-auth/react";


export default function MeuPerfil() {
  const { data: session, status } = useSession();


  const createSchema = Yup.object().shape({
    senha_antiga: Yup.string()
        .required("A senha é obrigatória")
        .min(3, "A senha dever ter mais que 3 caracteres"),
    senha_nova: Yup.string()
        .required("A senha é obrigatória")
        .min(3, "A senha dever ter mais que 3 caracteres"),
    senha_confirmar: Yup.string()
        .required("A senha é obrigatória")
        .oneOf([Yup.ref("senha_nova")], "As senhas não correspondem"),
  });

  const RegisterForm = (schema) => {
    const {
      register,
      trigger,
      formState: { errors },
      handleSubmit,
      control,
    } = useForm(schema);
    return { register, trigger, formState: { errors }, handleSubmit, control };
  };

  const forms = {
    password: RegisterForm({
      mode: "all",
      resolver: yupResolver(createSchema),
    }),
  };

  const [MeuError, setMeuError] = useState(null);

  useEffect(() => {
    if (MeuError != null) {
      alert(MeuError);
    }
  }, [MeuError]);

  const [formdataPassword, setformdataPassword] = useState({
    senha_atual: "",
    nova_senha: "",
  });

  const ChangePassword = (props) => {
    //Remover este setTimeout
    setTimeout(() => {
      const data_password = {
        ...formdataPassword,
      };

      atualizarPerfilPassword
          .atualizacaoPerfilPassword(
              getLocalStorage("refleshToken"),
              data_password
          )
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Formação!",
              text:
                  response.status == 200
                      ? "Senha trocada com sucesso!"
                      : response.status +
                      ": Não foi possível trocar a senha, tente novamente mais tarde!",
              confirmButtonText: "Confirmar",
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "Error",
              title: "Opps!",
              text: error,
            });
          });
    }, 500);
  };

  const [isHidePass, setHidePass] = useState(true);
  const toggleClass = () => {
    setHidePass(!isHidePass);
  };

  var classHide = isHidePass ? "uk-block" : "uk-hidden";
  var classBlock = isHidePass ? "uk-hidden" : "uk-block";

  return (

        <Layoutv2>
          <>
            <form onSubmit={forms.password.handleSubmit(ChangePassword)}>
              <section className={`  ${styles.container_painel} `}>
                <p className={`${styles.breadcrumb}`}>
                <span>
                  <Link href="/painel/" legacyBehavior>
                    <a>Painel do aluno</a>
                  </Link>
                </span>
                  {" ❯ "}
                  <span>Senha</span>
                </p>
                <Link href="/painel/" legacyBehavior>
                  <a className={`${styles.voltar_perfil}`}>
                    <Image
                        width={40}
                        height={40}
                        src="/manole/perfil/left-sm.svg"
                    />
                    Voltar para meu perfil
                  </a>
                </Link>
                <div className="uk-grid uk-grid-large uk-child-width-1-2@m">
                  <div className={`uk-margin-large-top`}>
                    <h1 className={`${styles.informacoes_perfil} `}>
                      Minha Senha
                    </h1>

                    <div className={`${styles.container_form} `}>
                      <div>
                        <label>Senha antiga</label>
                        <div
                            className={`uk-inline uk-width-1-1" ${styles.box_right_perfil} `}
                        >
                          <a className={`uk-form-icon uk-form-icon-flip`}>
                            <RiLockPasswordFill />
                          </a>
                          <a
                              className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classBlock}`}
                              onClick={toggleClass}
                          >
                            <AiFillEye />
                          </a>

                          <a
                              className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classHide}`}
                              onClick={toggleClass}
                          >
                            <AiFillEyeInvisible />{" "}
                          </a>
                          <input
                              name={`senha_antiga`}
                              className={`uk-input ${styles.input_perfil} `}
                              type={isHidePass ? "password" : "text"}
                              {...forms.password.register("senha_antiga")}
                              onChange={(e) => {
                                const { value } = e.target;
                                setformdataPassword({
                                  ...formdataPassword,
                                  senha_atual: value,
                                });
                              }}
                          />
                        </div>
                        {forms.password.formState.errors?.senha_antiga && (
                            <p className={`uk-alert-danger`}>
                              {" "}
                              {
                                forms.password.formState.errors?.senha_antiga
                                    ?.message
                              }{" "}
                            </p>
                        )}
                      </div>

                      <div>
                        <label>Senha nova</label>
                        <div
                            className={`uk-inline uk-width-1-1" ${styles.box_right_perfil} `}
                        >
                          <a className={`uk-form-icon uk-form-icon-flip`}>
                            <RiLockPasswordFill />
                          </a>
                          <a
                              className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classBlock}`}
                              onClick={toggleClass}
                          >
                            <AiFillEye />
                          </a>

                          <a
                              className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classHide}`}
                              onClick={toggleClass}
                          >
                            <AiFillEyeInvisible />{" "}
                          </a>
                          <input
                              name={`senha_nova`}
                              className={`uk-input ${styles.input_perfil} `}
                              type={isHidePass ? "password" : "text"}
                              {...forms.password.register("senha_nova")}
                              onChange={(e) => {}}
                          />
                        </div>

                        {forms.password.formState.errors?.senha_nova && (
                            <p className={`uk-alert-danger`}>
                              {" "}
                              {
                                forms.password.formState.errors?.senha_nova?.message
                              }{" "}
                            </p>
                        )}
                      </div>

                      <div>
                        <label>Confirmar senha nova</label>
                        <div
                            className={`uk-inline uk-width-1-1" ${styles.box_right_perfil} `}
                        >
                          <a className={`uk-form-icon uk-form-icon-flip`}>
                            <RiLockPasswordFill />
                          </a>
                          <a
                              className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classBlock}`}
                              onClick={toggleClass}
                          >
                            <AiFillEye />
                          </a>

                          <a
                              className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classHide}`}
                              onClick={toggleClass}
                          >
                            <AiFillEyeInvisible />{" "}
                          </a>
                          <input
                              className={`uk-input ${styles.input_perfil} `}
                              type={isHidePass ? "password" : "text"}
                              name={`senha_confirmar`}
                              {...forms.password.register("senha_confirmar")}
                              onChange={(e) => {
                                const { value } = e.target;
                                setformdataPassword({
                                  ...formdataPassword,
                                  nova_senha: value,
                                });
                              }}
                          />
                        </div>

                        {forms.password.formState.errors?.senha_confirmar && (
                            <p className={`uk-alert-danger`}>
                              {" "}
                              {
                                forms.password.formState.errors?.senha_confirmar
                                    ?.message
                              }{" "}
                            </p>
                        )}
                      </div>
                    </div>

                    <div className={`uk-margin`}>
                      <input
                          type="submit"
                          className={`uk-button uk-button-primary uk-width-1-1 ${styles.atualizar_btn} `}
                          value={"Cadastrar"}
                      />
                    </div>

                    <a className={`${styles.cancelar_btn} `}>Cancelar</a>
                  </div>
                </div>
              </section>
            </form>
          </>
        </Layoutv2>

  );
}
