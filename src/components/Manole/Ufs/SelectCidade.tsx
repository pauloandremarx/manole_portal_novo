import Select from "react-select";
import {useQueries, useQuery, useInfinityQueries } from "@tanstack/react-query";
import Config from "@/util/Config";
import {useEffect} from "react";



async function getCidades(UF) {
    const res = await fetch( `https://brasilapi.com.br/api/ibge/municipios/v1/${UF}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Falha ao carregar, tentando novamente...");
    }

    const cidades_data = await res.json();
    return cidades_data;
}

export const SelectCidade = (props) => {



  const [cidades_data] =
      useQueries({
        queries: [
          {
            queryKey: ["cidades_data"],
            queryFn: () => getCidades(props.uf),
          },

        ],
      });

    useEffect(() => {
        cidades_data.refetch();
    }, [props.uf]);

  if (cidades_data.isLoading) return "Caregando cidades...";

  if (cidades_data.error)
    return "An error has occurred: " + cidades_data.error.message;


  const cidadeOptions = cidades_data.data.map((cidade) => ({
    value: cidade.codigo_ibge,
    label: cidade.nome
  }));


    return (
        <>
          {cidades_data.error ? (
              "error"
          ) : (
              <Select
              isLoading={cidades_data.isLoading}
              loadingMessage={() => "Estamos carregando as cidades, aguarde ..."}
              isDisabled={cidades_data.isLoading }
              options={cidadeOptions}
              placeholder="Selecione uma cidade"
          />
          )}</>

);
};






