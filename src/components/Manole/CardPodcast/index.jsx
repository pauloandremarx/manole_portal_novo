import React from 'react'
import styles from'./podecastcard.module.css';
 import Image from 'next/image';


const CardPodcast = ({titulo, lista, resumo, img, spotify }) => {
    return (

        <div>
            <div  className={` uk-position-relative ${styles.podcast_card} `}>
                <div className="uk-grid uk-grid-small">

                    <div className='uk-width-1-3@m'>
                        <div><img src={img} /></div>
                    </div>

                    <div className='uk-width-2-3@m'>
                        <div>
                            <h2>{titulo} </h2>
                            <p  className={` uk-position-relative ${styles.resumo} `}>{resumo}</p>

                            <div>
                                <p className={` ${styles.ultimos_episodios} `}>Ultimos Episdoios</p>
                                <ul className={` ${styles.lista_epsodios} `} >
                                { lista.map( (item) => <li key={item.titulo } className="uk-flex uk-flex-between uk-flex-middle"><div><p>{  item.titulo }</p></div>

                                {item.players.map( (player) => <div key={player.id_player}>{ <a href={player.url}><Image className={` ${styles.iconPodcast} next_img`}  src={player.icon} alt="Item podcast" width={200} height={200} /></a> }</div> )} </li>) }
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default CardPodcast