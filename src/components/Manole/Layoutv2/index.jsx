
import React from 'react'

import Footerv2 from '../Footerv2'
import Headerv2 from '../Headerv2'
import Auth from "@/components/Manole/Auth";

export default function Layout ({children}){
    return (

    <>
        <Auth>
            <Headerv2/>
            {children}
            <Footerv2/>

        </Auth>
    </> );

}

