import React from "react";
import styles from "@/components/Manole/Header/header.module.css";
import {getLocalStorage, removeStorage} from "@/util/Helpers";
import {useQueries} from "@tanstack/react-query";
import { getPerfilNormal } from "@/services/formProfile/useFormProfile";
import Link from "next/link";
import {useRouter} from "next/navigation";
export default function LogadoHeaderv1() {

    const router = useRouter();
    function handleLogout(e) {
        e.preventDefault();
        removeStorage("token");
        removeStorage("userid");
        removeStorage("refleshToken");
        removeStorage("username");
        removeStorage("email");
        removeStorage("avatar");
        router.push("/login");
        setTimeout(() => {
            if (window && window.location) window.location.reload();
        }, 500);
    }


    const [meuperfilheader] =
        useQueries({
            queries: [
                {
                    queryKey: ["meuperfilheader"],
                    queryFn: () => getPerfilNormal(getLocalStorage("refleshToken")),
                },
            ],
        });

    if (meuperfilheader.isLoading) return "Caregando dados de usuário...";
    if (meuperfilheader.error)
        return "An error has occurred: " + meuperfilheader.error.message;

    return(
        <>
        <aside className={`${styles.flex_user}`}>
            <div className="uk-flex uk-flex-middle">
                <div className={`${styles.img_user}`}
                     style={{
                         backgroundImage: `url(${meuperfilheader.data.avatar})`
                     }}>

                </div>
            </div>


            <div>
                <p className={`${styles.seja_bemvindo}`}>
                    Seja Bem-vindo
                </p>
                <span className={`${styles.username}`}>

                                                     {meuperfilheader.data.nome}
                    <span data-uk-icon="icon: chevron-down; ratio: 1"></span>
                                                 </span>
            </div>
        </aside>
    <div
        className={`${styles.username_dropdown}`}
        data-uk-dropdown="mode: click"
    >
        <Link href={`/painel/`} legacyBehavior>
            <a>Painel</a>
        </Link>
        <Link href={`/painel/meu-perfil `} legacyBehavior>
            <a>Meu perfil</a>
        </Link>

        <a>Alterar Senha</a>
        <div className={`${styles.laranja}`}> </div>
        <a onClick={handleLogout}>Sair</a>
    </div>
        </>
    )
}