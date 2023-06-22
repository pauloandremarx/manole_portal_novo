'use client'

import { getNotification } from "@/services/SSO/useSSO_user";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import useCadastro from '@/services/cadastrar/useCadastro'
import {useSession, signOut, getSession } from "next-auth/react";

import styles from "./notification.module.css";
import Image from "next/image";
const Notification = (props) => {
    const { data: session } = useSession();
    const usu_email = session?.user?.decode?.usu_email

    const [notification] =
        useQueries({
            queries: [
                {
                    queryKey: ["notification"],
                    queryFn: () => getNotification(usu_email),
                    enabled: !!usu_email,
                },
            ],
        });

    if (notification.isLoading) return <img src="/manole/perfil/sino.svg" />;
    if (notification.error)  return "An error has occurred: " + notification.error.message;

    var contador = 0;


    if (!notification.error) {
        notification?.data?.forEach(notificacao => {
            if (notificacao.timeread === null) {
                contador++;
            }
        });
    }

    // @ts-ignore
    return (
        <>
            <div className={`uk-position-relative`}>
                <a>
                    <Image src="/manole/perfil/sino.svg"
                           className="next_img"
                           width={ 100 }
                           height={ 100 }
                           alt="Icone do sino" />
                </a>
                <span className={styles.contador}>{contador}</span>
            </div>
            <aside
                hidden
                className={props.className}
                data-uk-dropdown="mode: click;pos: bottom-center"
            >


                {notification.data !== undefined && notification.data.length !== 0 && (
                    // Use parênteses em vez de chaves aqui
                    notification.data?.slice(0, 6).map(function (item, i) {
                        return (
                            <a key={i} href="/painel/meus-cursos">
                                {item.timeread === null ? <strong>• {item.subject}</strong> : item.subject}
                            </a>
                        );
                    })
                )}

                <a className={`uk-text-center uk-flex-center`} target="_blank" href="https://m4.manole.h.codely.com.br/message/output/popup/notifications.php">
                    Ver mais
                </a>

                <a target="_blank" href="https://m4.manole.h.codely.com.br/message/notificationpreferences.php">
                    <Image src="/manole/perfil/preferencias.svg" className="next_img" width={500} height={500} />
                    Preferencias de notificações
                </a>
            </aside>
        </>
    )
}

export default Notification;