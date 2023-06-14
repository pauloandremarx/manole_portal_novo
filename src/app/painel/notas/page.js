
'use client';
import Layoutv2 from "@/components/Manole/Layoutv2";
import React, {useState } from "react";
import styles from "./notas.module.css";
import Link from "next/link";
import Image from "next/image";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

import ComponenteNotas from "@/components/Manole/Notas";
export default function MeuPerfil() {



  /**
   * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
   */
  const AccordionItem = ({ header, ...rest }) => (
      <Item
          {...rest}
          header={
            <>
              {header}
              <Image width={15} height={15} className={ `${styles.chevron } next_img`} src="/manole/perfil/arrow-down.svg" alt="Chevron Down" />
            </>
          }
          className={styles.item}
          buttonProps={{
            className: ({ isEnter }) =>
                `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`
          }}
          contentProps={{ className: styles.itemContent }}
          panelProps={{ className: styles.itemPanel }}
      />
  );


  return (
      <Layoutv2>
        <>
          <div className={`   `}>
            <section className={`  ${styles.container_painel} `}>
              <p className={`${styles.breadcrumb }`}>
              <span>
                <Link href="/painel/" legacyBehavior>
                  <a>Painel do aluno</a>
                </Link>{" "}
              </span>{" "}
                {">"} <span>Notas</span>
              </p>
              <Link href="/painel/" legacyBehavior><a className={`${styles.voltar_perfil}`}><Image  width={40} height={40} src="/manole/perfil/left-sm.svg" />Voltar para meu perfil</a></Link>
              <div className="uk-grid uk-grid-large uk-child-width-1-2@m">
                <div >
                  <h1 className={`${styles.informacoes_perfil} uk-margin-large-top`}>
                    Minhas notas
                  </h1>

                  <div className={`${styles.container_form} `}>
                    <div className={`uk-margin`}>
                      <Accordion>
                        <AccordionItem header="Notas de cursos">
                          <ComponenteNotas />
                        </AccordionItem>

                        <AccordionItem header="Notas de cursos concluidos">

                        </AccordionItem>
                      </Accordion>
                    </div>


                  </div>

                </div>


              </div>
            </section>
          </div>
        </>
      </Layoutv2>
  );
}


