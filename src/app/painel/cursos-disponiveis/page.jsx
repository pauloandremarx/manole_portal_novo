 'use client'

 
import Layoutv2 from '@/components/Manole/Layoutv2'
import BannerCursosDisponiveis from '@/components/Manole/bannerCursosDisponiveis'
 import { useRouter } from 'next/navigation'
import styles from './cdisponiveis.module.css';
import { getLocalStorage } from '@/util/Helpers'

export default function CursosDisponiveis() {
 

  return (
    <Layoutv2>
      
        <BannerCursosDisponiveis />


            <div className={`${styles.widht_100Over}`}>

            </div>
         
    </Layoutv2>
  );
}


 
