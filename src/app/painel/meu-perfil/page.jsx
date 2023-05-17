'use client'

import Layoutv2 from "@/components/Manole/Layoutv2";
import PerfilNormal from "@/components/Manole/Perfil/normal.jsx";
import PerfilAcademico from "@/components/Manole/Perfil/academico.jsx";
import styles from "./meu-perfil.module.css";
import Link from "next/link";
import {getLocalStorage} from '@/util/Helpers'
import {useRouter} from 'next/navigation'
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";

import ImagePerfil from "@/components/Manole/Perfil/imagePerfil.jsx";

import Image from "next/image";

export default function MeuPerfil() {

    const router = useRouter();

    if (getLocalStorage('username') == null) {
        router.push('/login');
    }

    /**
     * @type {React.ExoticComponent<import('@szhsin/react-accordion').AccordionItemProps>}
     */
    const AccordionItem = ({ header, ...rest }) => (
        <Item
            {...rest}
            header={
                <>
                    {header}
                    <Image width={20} height={20} className={ `${styles.chevron } next_img`} src="/manole/perfil/arrow-down.svg" alt="Chevron Down" />
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
                <div className={`${styles.padding_top_large} `}>
                    <section className={`  ${styles.container_painel} `}>
                        <p className={`${styles.breadcrumb}`}>
                  <span>
                    <Link href="/painel/" legacyBehavior>
                      <a>Painel do aluno</a>
                    </Link>{" "}
                  </span>{" "}
                            {">"} <span>Meu perfil</span>
                        </p>

                        <div className="uk-grid uk-grid-large uk-child-width-1-2@m">
                            <div>

                                <ImagePerfil />

                                <div className={`${styles.box_start} `}>
                                    <div>
                                        <div className={`${styles.star_content} `}>
                                            <span>16</span>
                                        </div>
                                    </div>

                                    <div className={`${styles.box_experiencia} `}>
                                        <div
                                            className={`uk-text-center ${styles.ex} ${styles.color_azul} `}
                                        >
                                            58<span>XP</span>{" "}
                                        </div>
                                        <div className={`${styles.barcontent} `}>
                                            {" "}
                                            <div
                                                className={`${styles.barcontentColor} `}
                                                style={{width: "40%"}}
                                            ></div>
                                        </div>
                                        <div className={`${styles.padding_l_r} `}>
                                            {" "}
                                            <div className={`${styles.ex} `}>
                                                10<span>XP</span>{" "}
                                            </div>
                                            {" "}
                                            <span className={`${styles.para_nivel} `}>
                            Para o nivel 7
                          </span>{" "}
                                        </div>
                                    </div>
                                </div>

                                <div className={`uk-margin`}>
                                <Accordion>
                                    <AccordionItem header="Informações do perfil">
                                        <PerfilNormal/>
                                    </AccordionItem>

                                    <AccordionItem header="Formacão Acadêmica">
                                        <PerfilAcademico/>
                                    </AccordionItem>
                                </Accordion>
                                </div>

                            </div>
                            <div>
                                <div>
                                    <div
                                        className={`${styles.card_branco} uk-child-width-1-2 uk-grid-medium`}
                                    >
                                        <div className={`${styles.nivel_star_bg}`}>
                                            <div>
                                                <div className={`${styles.nivel_text}`}>Nivel 6!</div>
                                                <div className="uk-flex uk-flex-center">
                                                    <div
                                                        className={`${styles.star_content} ${styles.large_star}`}
                                                    >
                                                        <span>16</span>
                                                    </div>
                                                </div>

                                                <div className={`${styles.total_text}`}>
                                                    Total 58<span>XP</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`${styles.ranking_bg}`}>
                                            <div>
                                                <h2 className={`${styles.ranking} `}>Ranking</h2>

                                                <div className={`${styles.users_ranking}`}>
                                                    <div className={`uk-position-relative`}>
                                                        <div
                                                            className={`uk-text-center ${styles.number_ranking}`}
                                                        >
                                                            7
                                                        </div>
                                                        <div
                                                            className={`${styles.raking_img_user}`}
                                                            style={{
                                                                backgroundImage: `url("/manole/perfil/user_people.svg")`,
                                                            }}
                                                        ></div>
                                                        <div
                                                            className={`uk-text-center ${styles.experienc_ranking}`}
                                                        >
                                                            +160
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`uk-position-relative ${styles.pincipal_user}`}
                                                    >
                                                        <div
                                                            className={`uk-text-center ${styles.number_ranking}`}
                                                        >
                                                            7
                                                        </div>
                                                        <div
                                                            className={`${styles.raking_img_user} ${styles.big}`}
                                                            style={{
                                                                backgroundImage: `url("/manole/perfil/user_people.svg")`,
                                                            }}
                                                        ></div>
                                                    </div>

                                                    <div className={`uk-position-relative`}>
                                                        <div
                                                            className={`uk-text-center ${styles.number_ranking}`}
                                                        >
                                                            7
                                                        </div>
                                                        <div
                                                            className={`${styles.raking_img_user}`}
                                                            style={{
                                                                backgroundImage: `url("/manole/perfil/user_people.svg")`,
                                                            }}
                                                        ></div>
                                                        <div
                                                            className={`uk-text-center ${styles.experienc_ranking}`}
                                                        >
                                                            -50
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`${styles.box_start} ${styles.box_star_small}  `}
                                                >
                                                    <div
                                                        className={`${styles.box_experiencia} ${styles.box_margin_top}`}
                                                    >
                                                        <div className={`${styles.barcontent} `}>
                                                            {" "}
                                                            <div
                                                                className={`${styles.barcontentColor} `}
                                                                style={{width: "40%"}}
                                                            ></div>
                                                        </div>
                                                        <div className={`${styles.padding_l_r} `}>
                                                            {" "}
                                                            <div className={`${styles.ex} `}>
                                                                10<span>XP</span>{" "}
                                                            </div>
                                                            {" "}
                                                            <span className={`${styles.para_nivel} `}>
                                    Para o nivel 7
                                  </span>{" "}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div
                                                            className={`${styles.star_content} ${styles.small_star}`}
                                                        >
                                                            <span>16</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className={`${styles.card_title}`}>
                                            Atividades de login
                                        </h2>

                                        <div className={`${styles.barra_login}`}>
                                            <div>
                                                <span>Primeiro acesso ao site</span>
                                            </div>

                                            <div>
                                                <span>Primeiro acesso ao site</span>
                                            </div>

                                            <div>
                                                <span>ultimo acesso ao site</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className={`${styles.card_title}`}>
                                        Atividades de login
                                    </h2>

                                    <div
                                        className={`${styles.card_branco} uk-child-width-1-4 uk-grid ${styles.text_msg} `}
                                    >
                                        <div>
                                            <div className="uk-flex uk-flex-center">
                                                <Image width={35} height={35} className={`uk-position-relative next_img`} src="/manole/perfil/icone_mensagem.svg" alt={"Icon mensagem"}/>
                                            </div>
                                            <div>Mensagens no blog</div>
                                        </div>

                                        <div>
                                            <div className="uk-flex uk-flex-center">
                                                <Image width={35} height={35} className={`uk-position-relative next_img`} src="/manole/perfil/mensagem_forun.svg" alt={"Icon forum"}/>
                                            </div>
                                            <div>Mensagens no fórum</div>
                                        </div>

                                        <div>
                                            <div className="uk-flex uk-flex-center">
                                                <Image width={35} height={35} className={`uk-position-relative next_img`} src="/manole/perfil/plano_de_ensino.svg" alt="plano de ensino"/>
                                            </div>
                                            <div>Planos de aprendizagem</div>
                                        </div>

                                        <div>
                                            <div className="uk-flex uk-flex-center">
                                                <Image width={35} height={35} className={`uk-position-relative next_img`} src="/manole/perfil/icone_mensagem.svg" alt='mensagem'/>
                                            </div>
                                            <div>Mensagens no blog</div>
                                        </div>
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
