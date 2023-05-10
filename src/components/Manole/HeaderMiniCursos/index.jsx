"use client";

import Link from "next/link";
import styles from "./headerMinicursos.module.css";
import { useQuery } from "@tanstack/react-query";
import Config from "@/util/Config";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import usePostLogs from "@/services/Postlogs/usePostLogs";
import useCadastroLogado from "@/services/cadastrarLogado/useCadastroLogado";

import { getLocalStorage, removeStorage } from "@/util/Helpers";
import { useState, useEffect } from "react";

async function getAllMinicursos() {
  const res = await fetch(
    Config.API_URL +
      "aulas-gratuitas/minicurso/?filtro=&currentPage=1&perPage=99",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: Config.API_KEY,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Minicursos Failed to fetch data");
  }

  const minicursos_total = await res.json();
  const minicursos = minicursos_total.data;

  return minicursos;
}

export default function HeaderMeusCursos( props ) {
  
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["initial-otthes-minicursos"],
    queryFn: () => getAllMinicursos(),
  });

  const [logado, setLogado] = useState("");

  useEffect(() => {
    if (
      getLocalStorage("userid") == "undefined" ||
      getLocalStorage("userid") == null ||
      getLocalStorage("userid") == ""
    ) {
      setLogado("null");
    } else {
      setLogado(getLocalStorage("userid"));
    }
  }, [getLocalStorage("userid")]);

  var cont = 5;
  var cursos = [];

  props.type == "full" ? (cont = 5) : (cont = 5);

  if (props.break) {
    var not_border = styles.not_border;
  }

  props.type == "full" ? (cont = 3) : (cont = 4);

  if (props.data != "undefined") {
    cursos = props.data;
  }

  const salvar_id = (e) => {
    let data_logs = {
      usu_id: logado,
      tipo: "minicurso",
      conteudo: e.target.attributes.getNamedItem("data-Id").value,
    };

    let data_logado = {
      curso_id_moodle: e.target.attributes.getNamedItem("data-moddleid").value,
      curso_id: e.target.attributes.getNamedItem("data-Id").value,
      usu_id: getLocalStorage("userid"),
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
    <>
      <div
        className={`uk-flex uk-flex-middle uk-grid uk-grid-match  ${styles.width_title}`}
      >
        <div>
          <h2 className={`${styles.mytitle}`}>
            <span> {props.title} </span>
          </h2>
        </div>
      </div>

      <div className={`Mycursos`}>
        {error ? (
          <p>Oh no, there was an error:</p>
        ) : isLoading || isFetching ? (
          <div class="loader-manole"></div> 
        ) : data ? (
          <>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation={{ clickable: true }}
              pagination={{ clickable: true }}
              spaceBetween={30}
              breakpoints={{
                // when window width is >= 640px
                0: {
                  slidesPerView: "auto",
                },
                // when window width is >= 768px
                959: {
                  slidesPerView: cont,
                },
              }}
            >
              <>
                {data.map((item, index) => (
                  <>
                    <SwiperSlide>
                      <div className={`${styles.curso_min_card}`} key={index}>
                        <div className={`${styles.padding}`}>
                          <h2>
                            {item.curso_nome_completo?.substring(0, 50) ||
                              item.curso_titulo_site?.substring(0, 50)}
                            {item.curso_nome_completo?.length >= 50
                              ? "..."
                              : "" || item.curso_titulo_site?.length >= 50
                              ? "..."
                              : ""}
                          </h2>
                          <p>{item.cat_nome}</p>
                        </div>

                        <h1
                          className={`uk-heading-line uk-text-center ${styles.my_heading_line}`}
                        >
                          <span>Gratuito</span>
                        </h1>
                        <div
                          className={`${styles.img_mini_curso}`}
                          style={{
                            backgroundImage: `url( ${item.curso_thumb})`,
                          }}
                        ></div>

                        <div
                          className={`${styles.padding} uk-flex uk-flex-right`}
                        >
                          <a
                            data-Id={item.curso_id}
                            data-moddleid={item.curso_id_moodle}
                            onClick={salvar_id}
                          >
                            Saber mais
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  </>
                ))}
              </>
            </Swiper>
          </>
        ) : (
          <div>não achou nada</div>
        )}
      </div>
    </>
  );
}
