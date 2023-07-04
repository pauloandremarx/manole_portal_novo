import styles from './cardBuscav2.module.css';
import React from "react";

export default function CardBusca(props) {

            return (
                <div>
                    <div className={styles.cardBusca}>

                        <h1 className={styles.cardBuscaTitle}>{props.fullname}</h1>

                        <a target='_blank' href={`https://m4.manole.h.codely.com.br/course/view.php?id=${props.courseid}`} className={styles.btnBuscaCard}>
                            Saiba mais
                        </a>
                    </div>
                </div>

            )
        }
