import React from "react";
import ContentLoader from "react-content-loader"
import styles from "@/components/Manole/Header/header.module.css";
import {getLocalStorage, removeStorage} from "@/util/Helpers";
import {useQueries} from "@tanstack/react-query";
import { getPerfilNormal } from "@/services/formProfile/useFormProfile";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useSession, signOut} from "next-auth/react";

export default function LogadoHeaderv1() {

    const { data: session, status } = useSession();
    const refleshToken = session?.user?.refleshToken;


    const [meuperfilheader] =
        useQueries({
            queries: [
                {
                    queryKey: ["meuperfilheader"],
                    queryFn: () => getPerfilNormal(refleshToken),
                    enabled: !!refleshToken,
                },
            ],
        });

    if (meuperfilheader.isLoading) return (

        <ContentLoader
            speed={1}
            width={200}
            height={60}
            viewBox="0 0 150 50"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="48" y="12" rx="3" ry="3" width="188" height="6" />
            <rect x="48" y="30" rx="3" ry="3" width="152" height="6" />
            <circle cx="20" cy="25" r="20" />

        </ContentLoader>
    );

    if (meuperfilheader.error )
        return (
            <div>{meuperfilheader.error.message}</div>
        );

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
        <a onClick={signOut}>Sair</a>
    </div>
        </>
    )
}