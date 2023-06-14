import styles from "./atividdade_login.module.css";
import { getLogs } from "@/services/GetLogs/useGetLogs";
import { useQueries } from "@tanstack/react-query";
import React from "react";
import {useSession} from "next-auth/react";

export default function AtividadeLogin() {
  const { data: session, status } = useSession();

  const usu_id = session?.user?.decode?.usu_id;
  const [meus_logs] = useQueries({
    queries: [
      {
        queryKey: ["atividades-alunos"],
        queryFn: () => getLogs(usu_id, 3),
        enabled: !!usu_id,
      },
    ],
  });

  if (meus_logs.isLoading) return <div className="loader-manole"></div>;
  if (meus_logs.error)
    return "An error has occurred: " + meus_logs.error.message;

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className={`uk-margin-large-top`}>
      <h2 className={`${styles.card_title}`}>Atividades de login</h2>

      <div className={`${styles.barra_login}`}>
        {meus_logs.data?.map(function (item, i) {

          var d = new Date(item.data_acesso );
          return (
            <div key={`logos_key_${item.id}`}>
              <div className={styles.absolute_data}>
                <span className={`uk-text-center`}>{item.curso_titulo_site}</span>
                <span className={`uk-text-center`}>{d.getUTCDay()} de {monthNames[d.getUTCMonth()]} de {d.getUTCFullYear()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
