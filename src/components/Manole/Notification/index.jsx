'use client'

import { getNotification } from "@/services/SSO/useSSO_user";
import { useQueries } from "@tanstack/react-query";
import Link from "next/link";  
import { useRouter } from 'next/navigation';
import useCadastro from '@/services/cadastrar/useCadastro'
import { getLocalStorage } from '@/util/Helpers';
import Image from "next/image";
const Notification = (props) => {

    const [notification] =
        useQueries({
            queries: [
                {
                    queryKey: ["notification"],
                    queryFn: () => getNotification(getLocalStorage("username")),
                },

            ],
        });

    if (notification.isLoading) return <img src="/manole/perfil/sino.svg" />;
    if (notification.error)  return "An error has occurred: " + notification.error.message;

    return (
        <aside
            hidden
            className={props.className}
            data-uk-dropdown="mode: click;pos: bottom-center"
        >
            <Link href="/painel/meus-cursos" legacyBehavior>
                <a>
                    •<strong>"Novo aviso"</strong>
                </a>
            </Link>
            <a>"Novo post forum"</a>
            <a>"Nova mensagem privada"</a>
            <a>"Módulo liberado"</a>
            <a>"Atividade liberada"</a>
            <a >
                <Image src="/manole/perfil/preferencias.svg" className="next_img" width={500} height={500} /> 
                Preferencias de notificações
            </a>
        </aside>
    )
}

export default Notification;