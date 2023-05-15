'use client'; 

 
import Layoutv2 from '@/components/Manole/Layoutv2'
import { useEffect, useState } from "react"
 
import HeaderMeusCursos from '@/components/Manole/HeaderMeusCursos' 

import useMeusCursos from '@/services/meusCursos/useMeusCursos' 

import styles from './m_cursos.module.css';
import Link from 'next/link'
import { getLocalStorage, removeStorage } from '@/util/Helpers' 
import { useRouter } from 'next/navigation'
 

export default function MeusCursos() {

    if (getLocalStorage('username') == null) {
    const router = useRouter()
    router.push('/login')
    }
  

  const [key_username, set_key_username] = useState(getLocalStorage('username')); 
  const [key_id, set_key_id] = useState(getLocalStorage('userid') ); 

  const {meuscursos, getMeusCursos} = useMeusCursos(key_username, key_id);
 
  useEffect(() => {
 
    getMeusCursos();

    
}, [getLocalStorage('username')])

 
 

  const [options, setoptions] = useState("andamento");

 

  let return_filter = "";
 
  const andamento =  <HeaderMeusCursos title={`Cursos em andamento `} subtitle={`Continue de onde parou e avance no seu aprendizado!`} break="true" type={`full`} data={meuscursos} /> 
  
  const comecado =  <HeaderMeusCursos title={`Cursos para começar `} subtitle={`Inicie seus cursos e comece a aprender!`} break="true" type={`full`} />

  const finalziado =  <HeaderMeusCursos title={`Cursos finalizados `} subtitle={`Parabéns por sua dedicação!`} break="true" type={`full`} complete={'true'} />
 

    if(options == "andamento"){
      return_filter =  <> {andamento}  {comecado} {finalziado}</>
    
    }else if(options == "comecado"){
      return_filter =   <> {comecado}  {andamento} {finalziado}</>
    
    }else if (options == "finalziado"){
        return_filter = <> {finalziado}  {andamento} {comecado}</> 
      
    }  


 

  return (
   
    <Layoutv2> 


        <section className={` uk-margin-xlarge-top ${styles.container_painel}`} data-uk-filter="target: .js-filter">


          <form>
            <select className={`${styles.myselect}`} value={options} onChange={e => {setoptions(e.target.value);  }}>
                <option  value={"andamento"}  > Cursos em andamento </option>
                <option    value={"comecado"}  > Cursos para começar </option>
                <option   value={"finalziado"}  > Cursos finalizados  </option> 
            </select>
            </form>

   
 
   {return_filter}
      
        
        
      
             
        </section>


       

     

         
    </Layoutv2>
  );
}


 
