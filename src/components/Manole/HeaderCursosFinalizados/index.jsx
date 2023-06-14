"use client";
import Link from "next/link";
import React, {Fragment} from "react";
import styles from "./headerMeusCursosF.module.css";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import usePostLogs from "@/services/Postlogs/usePostLogs";
import useCadastroLogado from "@/services/cadastrarLogado/useCadastroLogado";
import {getLogs} from "@/services/GetLogs/useGetLogs";
import {useSession} from "next-auth/react";

export default function HeaderCursosFinalizados(props) {
  const { data: session, status } = useSession()
  const usu_id = session?.user?.decode?.usu_id;

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["logos-dos-minicursos"],
    queryFn: () => getLogs(usu_id,5),
    enabled: !!usu_id,
  });

  var cont = 0;

  if (props.minicursos) {
    var not_border = styles.not_border;
  }
  props.type == "full" ? (cont = 3) : (cont = 4);

  const mandar_pro_curso = (e) => {
    let data_logs = {
      usu_id: usu_id,
      tipo: "minicurso",
      conteudo: e.target.attributes.getNamedItem("data-id").value,
    };

    let data_logado = {
      curso_id_moodle: e.target.attributes.getNamedItem("data-moddleid").value,
      curso_id: e.target.attributes.getNamedItem("data-id").value,
      usu_id: usu_id,
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
        className={`uk-flex uk-flex-middle uk-grid uk-grid-match uk-margin-large-top ${styles.width_title}`}
      >
        <div>
          <h2 className={`  ${styles.myLine}  ${not_border}`}>
            <span>
              {props.title} {props.break ? <br /> : ""}
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
                <div className="uk-grid uk-margin-top uk-child-width-1-3@m uk-child-width-1-1" data-uk-grid>

                  {data.map((item, index) => (

                      <div key={`cursos_${index}_${props.page}`}  >
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
                      </div>

                  ))}

           </div>

          </>
        ) : (
          <div>não achou nada</div>
        )}
      </div>
    </>
  );
}
