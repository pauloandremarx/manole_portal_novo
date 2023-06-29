
import styles from './cardBusca.module.css';
import {useSession} from "next-auth/react";
import {useQueries} from "@tanstack/react-query";
import Config from "@/util/Config";
import React from "react";

export default function CardBusca(props) {

    const { data: session, status } = useSession();
    const usu_email = session?.user?.decode?.usu_email;


    const fetchBuscarEndpoint = async () => {
        const res = await fetch(
            `https://l09wpoj3oc.execute-api.us-east-1.amazonaws.com/auth/courses/ava2/${props.courseid}`,
            {
                method: "GET",
                headers: {
                    Authorization: Config.API_KEY,
                },
            }
        );
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return await res.json();
    };



    const [BuscarEndpoint] = useQueries({
        queries: [
            {
                queryKey: ["fetchBuscarEndpoint", props.courseid],
                queryFn: () => fetchBuscarEndpoint(),

            },
        ],
    });

    if( BuscarEndpoint?.data?.length > 0) {

        if (!BuscarEndpoint?.data?.[0]?.vtex_prd_var) {

            return (
                <div>
                    <div className={styles.cardBusca}>

                        <h1 className={styles.cardBuscaTitle}>{BuscarEndpoint?.data?.[0]?.NameComplete}</h1>
                        <div
                            className={`${styles.thumbmail}`}
                            style={{
                                backgroundImage: `url( ${BuscarEndpoint?.data?.[0]?.images?.[0]?.ImageUrl})`,
                            }}
                        >

                        </div>
                        <a target='_blank' href={BuscarEndpoint?.data?.[0]?.url} className={styles.btnBuscaCard}>Saiba
                            mais</a>
                    </div>
                </div>

            )
        }
    }
}