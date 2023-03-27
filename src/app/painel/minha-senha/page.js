'use client';

import Layoutv2 from "@/components/Manole/Layoutv2";
import React, { useEffect, useState } from "react";
 

import styles from "./minha-senha.module.css";
import Link from "next/link";
import {
  Input,
  InputMasked,
  Select,
  InputHidden,
} from "../../../components/Manole/FormElements";

import { fetchCitiesFromUF } from "../../../services/IBGE";
import { getUFsLocalJson } from "../../../services/IBGE/localDatabase";

export default function MeuPerfil() {
  const [UFs, setUFs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectUF, setSelectUF] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [statusForm, setStatusForm] = useState("nome");

  const [formdata, setFormdata] = useState({
    curso_id: "",
    curso_id_moodle: "",
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cidade: "",
    estado: "",
    endereco: "",
    cep: "",
    nascimento: "",
  });

  useEffect(() => {
    const value = getUFsLocalJson();
    setUFs(value);
  }, []);

  useEffect(() => {
    if (selectUF !== "") {
      fetchCitiesFromUF(Number(selectUF)).then((value) => setCities(value));
    }
  }, [selectUF]);

  const [disabledName, setDisabledName] = useState(true);
  const handleClickNome = (e) => {
    setDisabledName(!disabledName);
  };

  const [isHidePass, setHidePass] = useState(true);
    const toggleClass = () => {
        setHidePass(!isHidePass);
      };

  
  var classHide = isHidePass ? 'uk-block' : 'uk-hidden'
  
  var classBlock = isHidePass ? 'uk-hidden' : 'uk-block' 
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
              {">"} <span>Senha</span>
            </p>
            <Link href="/painel/" legacyBehavior><a className={`${styles.voltar_perfil}`}><img width={40} src="/manole/perfil/left-sm.svg" />Voltar para meu perfil</a></Link>
            <div className="uk-grid uk-grid-large uk-child-width-1-2@m">
              <div > 
                <h1 className={`${styles.informacoes_perfil} `}>
                  Minha Senha
                </h1>

                <div className={`${styles.container_form} `}>
                  <div>
                    <label>Senha</label>
                    <div className={`uk-inline uk-width-1-1" ${styles.box_right_perfil} `} >
                      <a
                         className={`uk-form-icon uk-form-icon-flip`}
                        onClick={handleClickNome}
                        data-uk-icon="icon: file-edit"
                      ></a>
                      <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classBlock}`}
                        onClick={toggleClass}
                        data-uk-icon="icon: eye"
                      ></a>

                          <a
                        className={`uk-form-icon uk-form-icon-flip ${styles.form_visible_icon}  ${classHide}`}
                        onClick={toggleClass}
                        data-uk-icon="icon: eye-slash"
                      ></a>
                      <input
                        className={`uk-input ${styles.input_perfil} `}
                        type={isHidePass ? 'password': 'text'}
                        disabled={disabledName}
                      />
                    </div>
                  </div>
 
                 
                </div>

                <a className={`${styles.atualizar_btn} `}>
                  Atualizar Informações
                </a>

                <a className={`${styles.cancelar_btn} `}>Cancelar</a>
              </div>

           
            </div>
          </section>
        </div>
      </>
    </Layoutv2>
  );
}
