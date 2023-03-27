import React from 'react'
 
import styles from './breadcrumb.module.css';

import Link from "next/link"

const Breadcrumb = ({link_meio, nome_meio=null, nome_final}) => {   
    let acora_meio;
    if (nome_meio == null) {      
        acora_meio = "";    
    } 
    else {     
        acora_meio = <li><span className="navborder"  > <Link href={link_meio} legacyBehavior><a >{nome_meio}</a></Link></span></li>
        ;    
    }

    return ( 
    <ul   className={`uk-breadcrumb ${styles.mybreadcrumb} `} > 
        <li><span className="navborder"><Link href="/" legacyBehavior><a >Home</a></Link></span></li> 
        {acora_meio}
        <li><span>{nome_final}</span></li>
    </ul>
                     
    )
}

export default Breadcrumb