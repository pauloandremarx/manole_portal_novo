

import React, {useEffect, useState, useRef} from "react";
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

export const SelectEstado = ({ onChange, recover, error }) => {

  const [selectedEstado, setSelectedEstado] = useState<number | null>(null);


  useEffect(() => {
     onChange(recover);
  },[recover]);

  var error_text = "";



  const [estados_data] =
      useQueries({
        queries: [
          {
            queryKey: ["estados"],
            queryFn: () => getEstado(),
          },
        ],
      });


  if (estados_data.isLoading) return "Caregando meu perfil...";

  if (estados_data.error)
    return "An error has occurred: " + estados_data.error.message;


    const estadoOptions = estados_data.data.map((estado) => ({
      value: estado.id,
      label: estado.sigla
    }));

  const selectedOptionEstado = estadoOptions.find(
      (e) => e.value === selectedEstado
  );


  const handleEstadoUpdate = (event) => {
    setSelectedEstado(event.value);
    const selectedUf = estados_data.data.find((e) => e.id === event.value)?.sigla;
    onChange(selectedUf);
  };



  if(error){
    error_text =   <span style={{color:"red"}}>Campo incorreto</span> ;
  }
  else{
    error_text =   <span></span> ;
  }

  return (
      <>
        {error}
          {estados_data.error ? (
                "error"
            ) : (
              <>
                {recover? (

                    <Select
                      placeholder="Selecione um estado"
                      options={estadoOptions}
                      value={selectedOptionEstado}
                      onChange={handleEstadoUpdate}
                      defaultValue={{ label: recover, value: recover }}
                      required
                  />) : (

                      <Select
                      placeholder="Selecione um estado"
                      options={estadoOptions}
                      value={selectedOptionEstado}
                      onChange={handleEstadoUpdate}
                      required

                  />)}
              </>
            )}
        {error_text}

      </>

  );
};
