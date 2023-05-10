

import { useState } from "react";
import Select from "react-select";
import { useEstados } from "@/services/ufs/useEstado";
import Config from "@/util/Config";
import {useQueries} from "@tanstack/react-query";
import {getLocalStorage} from "@/util/Helpers";

async function getEstado() {
  const res = await fetch( `https://brasilapi.com.br/api/ibge/uf/v1`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Falha ao carregar, tentando novamente...");
  }

  const estados_data = await res.json();
  return estados_data;
}

export const SelectEstado = ({ onChange }) => {

  const [estados_data] =
      useQueries({
        queries: [
          {
            queryKey: ["estados"],
            queryFn: () => getEstado(),
          },

        ],
      });


  const [selectedEstado, setSelectedEstado] = useState<number | null>(null);

  if (estados_data.isLoading) return "Caregando meu perfil...";

  if (estados_data.error)
    return "An error has occurred: " + estados_data.error.message;


    const estadoOptions = estados_data.data.map((estado) => ({
      value: estado.id,
      label: estado.nome
    }));

    const selectedOptionEstado = estadoOptions.find(
        (e) => e.value === selectedEstado
    );




  const handleEstadoUpdate = (event) => {
    setSelectedEstado(event.value);
    const selectedUf = estados_data.data.find((e) => e.id === event.value)?.sigla;
    onChange(selectedUf);
  };

  return (
      <>
          {estados_data.error ? (
                "error"
            ) : (
                <Select
                  placeholder="Selecione um estado"
                  options={estadoOptions}
                  value={selectedOptionEstado}
                  onChange={handleEstadoUpdate}
                />
            )}
      </>
  );
};
