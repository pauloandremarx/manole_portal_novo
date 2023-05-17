"use client";
import Link from "next/link";
import React, {Fragment} from "react";
import styles from "./headerMeusCursos.module.css";
import { useQuery } from "@tanstack/react-query";
import Config from "@/util/Config";

import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import usePostLogs from "@/services/Postlogs/usePostLogs";
import useCadastroLogado from "@/services/cadastrarLogado/useCadastroLogado";
import { getLocalStorage, removeStorage } from "@/util/Helpers";

  
async function getDifference() {
  const res1 = await fetch(
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

  const minicursos_total = await res1.json();
  const minicursos = minicursos_total.data;

  const res = await fetch(
    Config.API_URL +
      `auth/logs?filter=&usu_id=${getLocalStorage("userid")}&qtde=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: Config.API_KEY,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Logs Failed to fetch data");
  }

  const logs = await res.json();

  return minicursos.filter((object1) => {
    return logs.some((object2) => {
      return object1.curso_id == object2.conteudo_acessado;
    });
  });
}

export default function HeaderMeusCursos(props) {


  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["initial-minicursos"],
    queryFn: () => getDifference(),
  });

  var cont = 0;

  if (props.minicursos) {
    var not_border = styles.not_border;
  }
  props.type == "full" ? (cont = 3) : (cont = 4);

  const mandar_pro_curso = (e) => {
    let data_logs = {
      usu_id: getLocalStorage("userid"),
      tipo: "minicurso",
      conteudo: e.target.attributes.getNamedItem("data-id").value,
    };

    let data_logado = {
      curso_id_moodle: e.target.attributes.getNamedItem("data-moddleid").value,
      curso_id: e.target.attributes.getNamedItem("data-id").value,
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

  const hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);

  return (
    <>
      <div
        className={`uk-flex uk-flex-middle uk-grid uk-grid-match  ${styles.width_title}`}
      >
        <div>
          <h2 className={`uk-heading-line   ${styles.myLine}  ${not_border}`}>
            <span>
              {" "}
              {props.title} {props.break ? <br /> : ""}{" "}
              <span> {props.subtitle ? props.subtitle : ""}</span>
            </span>
          </h2>
        </div>

        {props.break ? (
          ""
        ) : (

              <Link  href={`/painel/meus-cursos/`} legacyBehavior >
                <div className={`${styles.vertodos} uk-visible@m`}>
                  <div>Ver todos</div>
                  <Image width={10} height={10} className={`uk-position-relative next_img`} src="/manole/perfil/right-md.svg" alt="Setinha do acordion"/>
                </div>
              </Link>

        )}
      </div>

      <div className={`Mycursos`}>
        {error ? (
          <p>Oh no, there was an error:</p>
        ) : isLoading || isFetching ? (
           <div className="loader-manole"></div>
        ) : data ? (
          <>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation={{ clickable: true }}
              pagination={{ clickable: true, dynamicBullets: true, }}
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
              {props.type == "full" ? (
                <Fragment>
                  {data.map((item, index) => (

                      <SwiperSlide key={`cursos_${index}_${props.page}`}  >
                        <a
                          className={`${styles.curso_card}`}
                          data-id={item.curso_id}
                          data-moddleid={item.curso_id_moodle}
                          onClick={mandar_pro_curso}
                          key={hashCode(index.toString()) + props.page}
                        >
                          <div>
                            <div className="uk-flex uk-flex-top">
                              <div className={styles.min_width_icon}>
                                {props.complete ? (
                                  <Image src="/manole/perfil/completeIcon.svg" width={100} height={100} alt="Icone COmplete" />
                                ) : (
                                  <Image src="/manole/perfil/cursoIcon.svg" width={100} height={100} alt="Icone Curso"  />
                                )}
                              </div>
                              <div>
                                <h2>
                                  {item.curso_nome_completo?.substring(0, 50) ||
                                    item.curso_titulo_site?.substring(0, 50)}
                                  {item.curso_nome_completo?.length >= 50
                                    ? "..."
                                    : "" || item.curso_titulo_site?.length >= 50
                                    ? "..."
                                    : ""}
                                </h2>
                                <p>{item.curso_url}</p>
                              </div>
                            </div>

                            <div
                              className={`uk-flex  uk-flex-middle  ${styles.min_height_40}`}
                            >
                              <progress
                                className={`uk-progress ${styles.myprogress}`}
                                value="20"
                                max="100"
                              ></progress>
                              <span>60%</span>
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>

                  ))}
                </Fragment>
              ) : (
                <>
                  {data.map((item, index) => (
                    <>
                      <SwiperSlide>
                        <a className={`${styles.curso_card}`}>
                          <div>
                            <div className="uk-flex uk-flex-top">
                              <div className={styles.min_width_icon}>
                                {props.complete ? (
                                  <Image src="/manole/perfil/completeIcon.svg" width={100} height={100} alt="Icone COmplete" />
                                ) : (
                                  <Image src="/manole/perfil/cursoIcon.svg" width={100} height={100} alt="Icone COmplete"  />
                                )}
                              </div>
                              <div>
                                <h2>
                                  {item.curso_nome_completo?.substring(0, 50) ||
                                    item.curso_titulo_site?.substring(0, 50)}
                                  {item.curso_nome_completo?.length >= 50
                                    ? "..."
                                    : "" || item.curso_titulo_site?.length >= 50
                                    ? "..."
                                    : ""}
                                </h2>
                                <p>11ª edição - 2022</p>
                              </div>
                            </div>

                            <div
                              className={`uk-flex  uk-flex-middle  ${styles.min_height_40}`}
                            >
                              <progress
                                className={`uk-progress ${styles.myprogress}`}
                                value="20"
                                max="100"
                              ></progress>
                              <span>60%</span>
                            </div>
                          </div>
                        </a>
                      </SwiperSlide>
                    </>
                  ))}
                </>
              )}
            </Swiper>
          </>
        ) : (
          <div>não achou nada</div>
        )}
      </div>
    </>
  );
}
