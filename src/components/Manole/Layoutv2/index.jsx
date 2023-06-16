
import React from 'react'

import Footerv2 from '../Footerv2'
import Headerv2 from '../Headerv2'


export default function Layout ({children}){
    return (

    <>
        <div>
            <Headerv2/>
            {children}
            <Footerv2/>

        </div>
    </> );

}

