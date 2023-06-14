import React, {useEffect, useState} from "react";
import styles from "@/components/Manole/Headerv2/headerv2.module.css";

import {useQueries} from "@tanstack/react-query";
import { getPerfilNormal } from "@/services/formProfile/useFormProfile";
import Link from "next/link";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Notification from "@/components/Manole/Notification";
import {useSession, signOut, getSession } from "next-auth/react";
import ContentLoader from "react-content-loader";


export default function LogadoHeaderv2() {
    const { data: session } = useSession();

    const refleshToken = session?.user?.refleshToken;

        const [meuperfilheader] =
            useQueries({
                queries: [
                    {
                        queryKey: ["meuperfilheader_v2"],
                        queryFn: () => getPerfilNormal(refleshToken),
                        enabled: !!refleshToken,
                    },
                ],
            });

        if (meuperfilheader.isLoading) return (
            <ContentLoader
                speed={12}
                width={150}
                height={70}
                viewBox="0 0 150 60"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <circle cx="13" cy="33" r="8" />
                <circle cx="39" cy="34" r="8" />
                <circle cx="69" cy="34" r="8" />
                <circle cx="114" cy="32" r="29" />
            </ContentLoader>
        );
        if (meuperfilheader.error)
            return meuperfilheader.error.message;

    return(
        <>
            <aside className={`${styles.flex_user}`}>
                <div
                    className={`uk-flex uk-flex-middle ${styles.margin_itens}`}
                >
                    <div className="uk-visible@m">
                        <a uk-toggle="target: .toggle-search; animation: uk-animation-fade">
                            <Image
                                className={`toggle-search ${styles.close_lupa} next_img`}
                                src="/manole/perfil/lupa.svg"
                                width={ 100 }
                                height={ 100 }
                                alt="Icone da lupa"
                            />
                            <Image
                                hidden
                                className={`toggle-search ${styles.close_lupa} next_img`}
                                src="/manole/perfil/close.svg"
                                width={ 100 }
                                height={ 100 }
                                alt="Icone de fechar"
                            />
                        </a>
                    </div>
                    <Notification className={`${styles.username_dropdown}`} />
                    <div className="uk-visible@m">
                        <a title="ajuda">
                            <Image src="/manole/perfil/ajuda.svg"
                                   className="next_img"
                                   width={ 100 }
                                   height={ 100 }
                                   alt="Icone de ajudar"/>
                        </a>
                    </div>

                    <div
                        className={`${styles.img_user}`}
                        style={{
                            backgroundImage: `url(${meuperfilheader.data.avatar})`
                        }}>
                     </div>
                    <aside
                        hidden
                        className={`${styles.username_dropdown} uk-visible@m`}
                        data-uk-dropdown="mode: click;pos: bottom-center"
                    >
                        <Link
                            href={`/painel/meu-perfil`}
                            legacyBehavior
                        >
                            <a>
                                <Image src="/manole/perfil/meu_perfil.svg"
                                       className="next_img"
                                       width={ 100 }
                                       height={ 100 }
                                       alt="Icone de perfil"
                                /> Meu
                                Perfil <span className={`${styles.star}`}>9</span>
                            </a>
                        </Link>
                        <Link
                            href={`/painel/minha-senha`}
                            legacyBehavior
                        >
                            <a>
                                <Image src="/manole/perfil/minha_senha.svg"
                                       className="next_img"
                                       width={ 100 }
                                       height={ 100 }
                                       alt="Icone da minha senha" /> Minha
                                Senha
                            </a>
                        </Link>
                        <Link
                            href={`/painel/notas`}
                            legacyBehavior>
                            <a>
                                <Image src="/manole/perfil/notas.svg"
                                       className="next_img"
                                       width={ 100 }
                                       height={ 100 }
                                       alt="Icone de notas" /> Notas
                            </a>
                        </Link>
                        <a>
                            <Image src="/manole/perfil/mensagens.svg"
                                   className="next_img"
                                   width={ 100 }
                                   height={ 100 }
                                   alt="Icone de mensagem" />
                            Menssagens
                        </a>
                        <a>
                            <Image src="/manole/perfil/arquivos.svg"
                                   className="next_img"
                                   width={ 100 }
                                   height={ 100 }
                                   alt="Icone de arquivos"/> Arquivos
                            Privados
                        </a>
                        <a onClick={signOut}>
                            <Image src="/manole/perfil/fi_log-out.svg"
                                   className="next_img"
                                   width={ 100 }
                                   height={ 100 }
                                   alt="Icone de deslogar" /> Sair
                        </a>
                    </aside>
                </div>
            </aside>
        </>
    )
}
