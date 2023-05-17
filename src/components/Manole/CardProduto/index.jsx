"use client";
import React, { useEffect, useState } from "react";
import styles from "./card_produto.module.css";
import Link from "next/link";
import Modal from "react-modal";
import useCadastro from "@/services/cadastrar/useCadastro";
import useCadastroLogado from "@/services/cadastrarLogado/useCadastroLogado";
import usePostLogs from "@/services/Postlogs/usePostLogs";
import FormCuston from "../Form";
import InputRadio from "../InputRadio";

import LoadStatus from "../LoadStatus";

import { Input, InputMasked, Select, InputHidden } from "../FormElements";
import { Region } from "../FormElements/style";
import { getLocalStorage } from "@/util/Helpers";
import { useRouter } from "next/navigation";
import { SelectEstado } from "@/components/Manole/Ufs/SelectEstado";
import { SelectCidade } from "@/components/Manole/Ufs/SelectCidade";

import {FaUserAlt} from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { AiFillPhone } from "react-icons/ai";
import { AiFillIdcard } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import {FaStreetView} from "react-icons/fa";
import {FaCity} from "react-icons/fa";
import {BsFillHouseDoorFill} from "react-icons/bs";

import Image from "next/image";

var logado = false;

if (
  getLocalStorage("username") == "undefined" ||
  getLocalStorage("username") == null ||
  getLocalStorage("username") == ""
) {
  logado = false;
} else {
  logado = true;
}

const CardProduto = (props) => {
  const router = useRouter();

  //const mask = "[0-9]{0,1}[0-9]{4}-[0-9]{4}";
  const [UFs, setUFs] = useState([]);
  const [cities, setCities] = useState([]);
  const [ selectUF, setSelectUF ] = useState( "" );
  const [id_uf, set_id_uf] = useState("");
  const [selectedUf, setSelectedUf] = useState("");
  const [SelectedCity, setSelectedCity] = useState("");
  const [statusForm, setStatusForm] = useState("none");
  // The user will store more cities here
  const [citiesServed, setCitiesServed] = useState([]);
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

  function handleSubmitForm(e) {
    event.preventDefault();
    setStatusForm("loading");

    if (handleInvalidInputs()) {
      setStatusForm("invalid");
      return;
    }



    //Remover este setTimeout
    setTimeout(() => {
      resetErrors();
      setStatusForm("sucess");

      const data = {
        ...formdata,
      };

      useCadastro
        .cadastroMiniCursos(data)
        .then((response) => {
          console.log(response);

          if (response) {
            closeModal();
            router.push(localStorage.getItem("url_aula") || "");

            console.log(data);
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Não foi possivel cadastrar o usuário!");
        });
    }, 1000);
  }

  function handleInvalidInputs() {
    resetErrors();

    let hasErrors = false;
    let cloneErrorForm = errorFormData;

    const arrayObjForm = [
      { name: "endereco", value: formdata.endereco },
      { name: "email", value: formdata.email },
      { name: "nome", value: formdata.nome },
      { name: "telefone", value: formdata.telefone },
      { name: "cpf", value: formdata.cpf },
      { name: "nascimento", value: formdata.nascimento },
      { name: "cidade", value: formdata.cidade },
      { name: "estado", value: formdata.estado },
      { name: "cep", value: formdata.cep },
    ];

    arrayObjForm.forEach((element) => {
      const { name, value } = element;
      if (isEmpty(value)) {
        cloneErrorForm = { ...cloneErrorForm, [name]: true };
        hasErrors = true;
      }
    });

    setErrorFormData(cloneErrorForm);

    return hasErrors;
  }

  function resetErrors() {
    setErrorFormData({
      nome: false,
      email: false,
      telefone: false,
      cpf: false,
      cidade: false,
      estado: false,
      endereco: false,
      nascimento: false,
      cep: false,
    });
  }

  function isEmpty(value) {
    if (value === null || String(value) === "" || String(value).length <= 0) {
      return true;
    }

    return false;
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);

    var string_link = "";
    if (props.link) {
      string_link = props.link.replace("%20", " ");
    } else {
      string_link = "";
    }

    var url_aula = "/minicursos/" + string_link;
    localStorage.setItem("url_aula", url_aula);
    localStorage.setItem("curso_id_moodle", props.curso_id_moodle);
    localStorage.setItem("curso_id", props.curso_id);

    setFormdata({
      ...formdata,
      curso_id_moodle: props.curso_id_moodle,
      curso_id: props.curso_id,
    });

    document.getElementsByTagName("html")[0].style.overflow = "hidden";
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    document.getElementsByTagName("html")[0].style.overflow = "auto";

    setIsOpen(false);
  }

  const cadastroLogado = (e) => {
    let data_logado = {
      curso_id_moodle: e.target.attributes.getNamedItem("data-moddleid").value,
      curso_id: e.target.attributes.getNamedItem("data-Id").value,
      usu_id: getLocalStorage("userid"),
    };

    let data_logs = {
      usu_id: getLocalStorage("userid"),
      tipo: "minicurso",
      conteudo: e.target.attributes.getNamedItem("data-Id").value,
    };


    useCadastroLogado
      .cadastroLogadoMiniCursos(data_logado)
      .then((response) => {
        console.log(response);

        if (response.data) {
          window.open(response.data.url, "_blank");

          usePostLogs
            .postLogs(data_logs)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Não foi possivel cadastrar o usuário!");
      });
  };

  return (
    <div>
      <div className={`${styles.card_item_produto} `}>
        <div className="uk-flex uk-flex-center">
          <Image src={props.url_img} width="250" height="250" alt="Imagem produto" className="next_img"/>
        </div>
        <h2>{props.titulo}</h2>

        {logado ? (
          <a
            onClick={cadastroLogado}
            data-id={props.curso_id}
            data-moddleid={props.curso_id_moodle}
          >
            Saiba mais{" "}
          </a>
        ) : (
          <a
            onClick={openModal}
            data-id={props.curso_id}
            data-moddleid={props.curso_id_moodle}
          >
            Saiba mais{" "}
          </a>
        )}
      </div>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={`${styles.Modal} `}
        overlayClassName={`${styles.Overlay} Overlay`}
        contentLabel="Example Modal"
      >
        <div className={`${styles.dentro_modal} `}>
          <FormCuston
            submit={handleSubmitForm}
            titulo="Cadastre-se e receba por e-mail o login e senha para acessar o minicurso."
            tamanho="1400px"
          >
            <button
              className="uk-modal-close-default"
              type="button"
              data-uk-close
              onClick={closeModal}
            ></button>

            <div
              className="uk-child-width-1-2@m uk-margin-medium-bottom"
              data-uk-grid
            >
              <Input
                label="Nome"
                name="nome"
                icon={<FaUserAlt />}
                placeholder=""
                error={errorFormData.nome}
                helperText={"Insira seu nome"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    nome: value,
                  });
                }}
              />

              <Input
                icon={<GoMail/>}
                label="E-mail"
                name="email"
                placeholder=""
                error={errorFormData.email}
                helperText={"Insira seu email"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    email: value,
                  });
                }}
              />

              <InputMasked
                icon={<AiFillPhone/>}
                mask={"(99) 9999-99999"}
                label="Telefone"
                name="telefone"
                placeholder=""
                error={errorFormData.telefone}
                helperText={"Insira um telefone válido"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    telefone: value,
                  });
                }}
              />

              <InputMasked
                icon={<AiFillIdcard />}
                mask={"999.999.999-99"}
                label="CPF"
                type="text"
                name="cpf"
                placeholder=""
                error={errorFormData.cpf}
                helperText={"Insira o cpf"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    cpf: value,
                  });
                }}
              />

              <InputMasked
                icon={<MdDateRange />}
                mask={"99/99/9999"}
                label="Data de nascimento"
                name="nascimento"
                placeholder=""
                error={errorFormData.nascimento}
                helperText={"Insira o cpf"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    nascimento: value,
                  });
                }}
              />

              <InputMasked
                icon={<FaStreetView />}
                mask={"999-999-99"}
                label="Cep"
                name="cep"
                placeholder=""
                error={errorFormData.cep}
                helperText={"Insira o cep"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    cep: value,
                  });
                }}
              />

              <div className="tamanho_select">
                <div>
                  <label>Estado</label>
                  <SelectEstado
                      onChange={setSelectedUf}
                      required

                  />
                </div>
              </div>


              {selectedUf ? (<div className="tamanho_select"><label>Cidade</label><SelectCidade uf={selectedUf} onChange={setSelectedCity}     /></div> ) : ('')}


              <Input
                icon={<BsFillHouseDoorFill />}
                label="Endereço Matriz"
                name="endereco"
                error={errorFormData.endereco}
                helperText={"Insira um endereço"}
                placeholder=""
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    endereco: value,
                  });
                }}
              />
            </div>

            <InputRadio
              name="lgpd"
              legenda="Concordo em fornecer meus dados para receber conteúdos e ofertas por e-mail ou outros meios."
              value="concordo"
            />

            <div
              className="uk-child-width-1-2@m uk-margin-medium-bottom "
              data-uk-grid
            >
              <div>
                <button className="submit" type="submit">
                  Receber aula por e-mail
                </button>{" "}
                <LoadStatus status={statusForm} />
              </div>

              <div>
                <Link
                  className="btn_ja_e_aluno"
                  href="https://www.manoleeducacao.com.br/area-do-aluno/"
                  target="_blank"
                  legacyBehavior
                >
                  Já é aluno Manole? Fazer login
                </Link>
              </div>
            </div>
          </FormCuston>
        </div>
      </Modal>
    </div>
  );
};

export default CardProduto;
