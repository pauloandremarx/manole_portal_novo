

import Config from '../../util/Config'

export async function getLogs(user_id, qtd) {
    const res1 = await fetch(
        Config.API_URL +
        `aulas-gratuitas/minicurso/?filtro=&currentPage=1&perPage=${qtd}`,
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
        `auth/logs?filter=&usu_id=${user_id}&qtde=${qtd}`,
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

    let merged = [];

    /*
          JUNTAR OS 2 SOMANDO OS DADOS
     */

        for(let i=0; i<minicursos.length; i++) {
            merged.push({
                ...minicursos[i],
                ...logs[i]
            });
        }

        return merged;

        /*
          JUNTAR OS 2 POREM COM OS DADOS SENDO DO MINICURSO

          for(let i=0; i<minicursos.length; i++) {
              merged.push({
                  ...minicursos[i],
                  ...(logs.find((itmInner) => itmInner.conteudo_acessado === minicursos[i].curso_id))}
              );
          }

        return minicursos.filter((object1) => {
            return logs.some((object2) => {
                object2.append
                return object1.curso_id == object2.conteudo_acessado;
            });
        });*/
}