import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import {getNotas} from "@/services/notas/useNotas";
import {useSession, signOut} from "next-auth/react";
import { useQuery, useQueries, usersQuery } from "@tanstack/react-query";
import styles from './notas.module.css'
import Image from "next/image";
import ContentLoader from "react-content-loader"

export default function ComponenteNotas() {
const { data: session, status } = useSession();
const usu_email = session?.user?.decode?.usu_email;

const [minhas_notas] =
    useQueries({
        queries: [
            {
                queryKey: ["minhas-notas"],
                queryFn: () => getNotas(usu_email),
                refetchOnWindowFocus: false,
                enabled: !!usu_email,
            },
        ],
    });

if (minhas_notas.isLoading) return  (
    <ContentLoader
        speed={12}
        width={676}
        height={124}
        viewBox="0 0 676 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"

    >
        <rect x="53" y="46" rx="3" ry="3" width="466" height="24" />
        <circle cx="24" cy="57" r="23" />
        <rect x="531" y="46" rx="3" ry="3" width="61" height="24" />
    </ContentLoader>

    );

if (minhas_notas.error) return  minhas_notas.error.message;



return (
    <div className={`uk-accordion-content ${styles.acordion_content}`}>

        {minhas_notas?.data.map(function(item, i){
            return (
                <div className={`${styles.card_cursos_notas}`} key={item.course+'_id_notas'}>
                    <div><Image fill={true} className={`uk-position-relative`}  src="/manole/perfil/cursoIcon.svg" /></div>
                    <div className={`${styles.text_curso}`}> {item.course} </div>
                    <div>nota: <span>{item.grade}</span></div>
                </div>
            )
        })}

    </div>
);

}