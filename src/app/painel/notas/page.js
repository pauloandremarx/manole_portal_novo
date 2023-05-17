'use client';
import Layoutv2 from "@/components/Manole/Layoutv2";
import React, {useState } from "react";
 
import { useRouter } from 'next/navigation'
import { getLocalStorage } from '@/util/Helpers'
import styles from "./notas.module.css";
import Link from "next/link";

import Image from "next/image";

export default function MeuPerfil() {

  const router = useRouter()
    if (getLocalStorage('username') == null) {
    router.push('/login')
  }

  const [disabledName, setDisabledName] = useState(true);
  const handleClickNome = (e) => {
    setDisabledName(!disabledName);
  };

  const [isHidePass, setHidePass] = useState(true);
    const toggleClass = () => {
        setHidePass(!isHidePass);
      };

  
  var classHide = isHidePass ? 'uk-block' : 'uk-hidden'
  
  var classBlock = isHidePass ? 'uk-hidden' : 'uk-block' 
  return (
    <Layoutv2>
      <>
        <div className={`  ${styles.padding_top_large} `}>
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
                <h1 className={`${styles.informacoes_perfil} `}>
                  Minhas notas
                </h1>

                <div className={`${styles.container_form} `}>
                  <div>
                    <ul data-uk-accordion>
                      <li>
                        <a   className={`uk-accordion-title ${styles.accordion_title}`} href="#">Cursos em andamento</a>
                        <div className={`uk-accordion-content ${styles.acordion_content}`}>

                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/cursoIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div> 
                          
                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/cursoIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div>  

                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/cursoIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div>  

                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/cursoIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div>  

                        </div>
                      </li>


                      <li>
                        <a   className={`uk-accordion-title ${styles.accordion_title}`} href="#">Cursos em concluidos</a>
                        <div className={`uk-accordion-content ${styles.acordion_content}`}>

                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/completeIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div> 
                          
                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/completeIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div>  

                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/completeIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div>  

                          <div className={`${styles.card_cursos_notas}`}>
                            <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/completeIcon.svg" /></div>
                            <div className={`${styles.text_curso}`}>Curso de Obstetrícia e Ginecologia </div>
                            <div>nota: <span>8,5</span></div>
                          </div>  

                        </div>
                      </li>
                    </ul>
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
