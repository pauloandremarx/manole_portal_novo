 

import styles from './sobre-nos.module.css';
import Layout from '@/components/Manole/Layout';
  
 import Image from 'next/image';

export default function Sobrenos() { 

  return (
    <Layout>
    
    <section className={`${styles.bg_degrade}`} >
        <div className='container_padrao'>
            <h1>Mais de 55 anos de história</h1>

            <div className='uk-grid uk-child-width-1-2@m uk-grid-match' data-uk-grid>
                <div className='uk-flex uk-flex-middle'>
                    <div>
                        <p className={`${styles.text_history}`} >Há 55 anos a Manole evolui à frente das tecnologias. Começou como livraria antes de publicar os primeiros livros na área da medicina, mas já naquela época atuava de forma inovadora. O livro alcançava o médico no local de trabalho e isto poderia ser nos confins, no interior, em lugares que não havia sequer livrarias, bibliotecas, universidades ou até mesmo os correios naquele início dos anos de 1960. 
                        </p>

                        <p className={`${styles.text_history}`}>
                        A ideia de publicar o primeiro livro surgiu sem um respaldo financeiro, mas novamente usando a criatividade, característica que até hoje é um dos pilares da gestão da Manole, o fundador conclamou o público de médicos interessados na obra, que adquirindo com antecedência e acreditando no projeto, ajudou a viabilizar o nascimento da Editora Manole. Já se vão 50 anos publicando livros não somente na área da saúde, desde as traduções até os anos 2000 e depois mais fortemente autores nacionais com quem temos o orgulho de manter um profundo respeito e relacionamento, mas todas as áreas do conhecimento que complementam a formação do ser humano.
                        </p>
                    </div>
                </div>

                <div className='uk-flex uk-flex-middle uk-position-relative'>
                    <div>
                        <Image width={800} height={800}  className={`uk-position-relative next_img`}  src="/manole/sobre_nos/Dinu_Manole.webp" alt={`Dinu criador da Manole`} />

                       
                        <div className={`uk-position-bottom-right ${styles.fundador}`} ><strong>Dinu Manole</strong><br /> Fundador </div>
                        
                        
                    </div>
                </div>
            </div>  
        </div>
    </section> 
    <section   className={`${styles.bg_img}`}>
        <div   className={`container_padrao  ${styles.container_historia}`}>  
            <div uk-sticky="bottom: #acabou; offset: 150"  className={styles.z_index_10}>
                <div  className={`  ${styles.navigation_right}`}  >
                    <a href="#a1960" > 1960</a>
                    <a href="#a1967" > 1967</a>
                    <a href="#a1969" > 1969</a>
            
                    <a href="#a1981" > 1981</a>
                    <a href="#a1986" > 1986</a>
                    <a href="#a1991" > 1991</a>
                    <a href="#a1993" > 1993</a>
                    <a href="#a1995" > 1995</a>
                    <a href="#a1994" > 1994 </a>
                    <a href="#a1996" > 1996 </a>
                    <a href="#a2000" > 2000 </a>
                    <a href="#a2003" > 2003 </a>
                    <a href="#a2006" > 2006 </a>
                    <a href="#a2009" > 2009 </a>
                    <a href="#a2011" > 2011 </a>
                    <a href="#a2012" > 2012 </a>
                    <a href="#a2013" > 2013 </a>
                    <a href="#a2014" > 2014 </a>
                </div>
            </div>

            <div  className={` uk-flex uk-flex-center@m uk-flex-left   ${styles.logo_manole_linha}`} >  <Image width={800} height={800}  className={`uk-position-relative next_img`}  src="/manole/sobre_nos/manole_logo.webp"  alt={`Logo da Manole`}  /></div>
            <div   className={`uk-child-width-1-1   ${styles.master_line}`}>
                <div    className={` uk-grid uk-child-width-1-2@m uk-grid-match   ${styles.linha_do_tempo}`} data-uk-grid >
                    <div className={`${styles.text}`} >
                        <div>
                            <h1><span  id="a1960"></span>1960</h1>
                            <p>           O <strong>Fundador Sr. Dinu Manole</strong>, então com 29 anos e recém-chegado da Romênia, trabalha para a Enciclopédia Britânica, como vendedor.</p>

                 
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                            <Image width={800} height={800}  className={`uk-position-relative`}   src="/manole/sobre_nos/linha_do_tempo_1.webp" alt={`Linha do tempo`} />
                        </div>
                    </div> 
                </div>
              
                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text}`}>
                        <div>
                            <h1><span  id="a1967"></span>1967</h1>
                            <p>
                            Começa a trabalhar por conta própria, comprando e vendendo livros no interior de São Paulo. Passa a <strong>importar livros de medicina</strong>.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div    className={`${styles.text}`}>
                        <div>
                            <h1  ><span  id="a1969"></span>1969</h1>
                            <p>
                                <strong>Nasce a Livraria Manole/Gráfica</strong> , no centro de São Paulo, num espaço comercial de 200 metros quadrados na Avenida 13 de maio. A produção se compõe essencialmente de livros técnico- científicos e profissionalizantes na área médica – uma oportunidade sendo explorada, pois nesse momento ninguém publicava livros de Medicina em língua portuguesa.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1><span  id="a1981"></span>1981</h1>
                            <p>
                            A empresa passa a se chamar <strong>EDITORA MANOLE</strong>.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                        <Image width={800} height={800}  className={`uk-position-relative next_img`}  src="/manole/sobre_nos/1981.png" alt={`Linha do 1981`} />
                        </div>
                    </div>

                </div>

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a1986"></span>1986</h1>
                            <p>
                            A empresa passa a operar em sede própria e em novo endereço no centro de Saão Paulo: muda-se para um espaço de 1.100 metros quadrados, na Rua Conselheiro Ramalho.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>


                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a1991"></span>1991/92</h1>
                            <p>
                            Até então conhecida somente na área da Saúde, começa a publicar também livros de interesse geral com alta qualidade, impressos fora do país.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a1993"></span>1993</h1>
                            <p>
                            <strong>Amarylis Manole</strong>, filha caçula do fundador, ingressa na empresa.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                        <Image width={800} height={800}  className={`uk-position-relative next_img`}  src="/manole/sobre_nos/1993.png" alt={`Manole 1993`} />
                        </div>
                    </div>

                </div>

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1><span  id="a1994"></span>1994 a 1999</h1>
                            <p>
                              <strong>A Manole publica livros licenciados da Disney</strong>, mais de 100 títulos, e também licenciados dos Flintstones e dos Jetsons, gerando ampla visibilidade para a empresa.
                            </p>
                        </div>
                    </div> 

                    <div   className={` ${styles.image}  ${styles.padding_top}`}>
                        <div>
                        <Image width={800} height={800}  className={`uk-position-relative next_img`}  src="/manole/sobre_nos/1994.png" alt={`Manole 1994`} />
                        </div>
                    </div>

                </div>

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a1995"></span>1995</h1>
                            <p>
                            O editorial começa a crescer. No final dos anos 1990, a<strong>Manole já tinha dois depósitos</strong>, um próprio e outro alugado, mas precisava de uma infraestrutura maior.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>

             

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a1996"></span>1996</h1>
                            <p>
                            Para formar um novo departamento editorial, a Manole dá início a um programa de seleção de estagiários.
                            <strong>Nesse mesmo ano, ganha o prêmio de melhor editora da América Latina.</strong>
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>
 

                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2000"></span>2000</h1>
                            <p>
                            Daniela Manole, também filha do fundador, passa a trabalhar na empresa junto a Amarylis. A editora realiza nova mudança de endereço e passa agora a atuar no bairro do Tamboré, em Barueri. Antes com foco em obras traduzidas,  <strong> a editora agora passa a priorizar a produção nacional</strong> 
                            e realiza novos saltos em sua gestão de processos e em toda a sua atuação.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>


                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`} >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2003"></span>2003</h1>
                            <p>
                            <strong>Nasce o selo Minha Editora.</strong>. A Manole começa a investir em livros de Direito e desenvolve também grandes projetos em parceria com faculdades de Medicina, livros profissionais em Pediatria, Ortopedia e Oftalmologia.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                        <Image width={800} height={800}  className={`uk-position-relative next_img`}  src="/manole/sobre_nos/2003.png" alt={`Manole 2003`}  />
                        </div>
                    </div>

                </div>



                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`}  id="acabou">
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2006"></span>2006</h1>
                            <p>
                            <strong>Amarylis Manole assume a direção da empresa.</strong>.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                        
                        </div>
                    </div>

                </div>


                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`}  >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2009"></span>2009</h1>
                            <p>
                            <strong>Nasce a Universidade Manole</strong> , uma plataforma on-line com aulas da Associação Médica Brasileira (AMB) para o livro Atualização em Emergências. Criação do selo editorial Amarilys, voltado para projetos literários.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`}>
                        <div>
                       
                        </div>
                    </div>

                </div>


                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`}   >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2011"></span>2011</h1>
                            <p>
                            A Manole oferece <strong>primeiro curso com transmissão ao vivo</strong>, “Direito Processual”, com o Prof. Antonio Claudio da Costa Machado.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`} >
                        <div>
                       
                        </div>
                    </div>

                </div>


                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`}   >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2012"></span>2012</h1>
                            <p>
                            Manole Educação oferece os primeiros grandes cursos presenciais e on-line, com aproximadamente 1600 inscritos.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`} >
                        <div>
                       
                        </div>
                    </div>

                </div>


                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`}   >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2013"></span>2013</h1>
                            <p>
                            Novas turmas da Manole Educação, ampliação do catálogo de cursos oferecidos, aprimoramento da plataforma, crescimento da equipe, início do <strong>oferecimento de soluções personalizadas a sociedades e outros clientes</strong>. Celebra-se também 10 anos do selo Minha Editora.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`} >
                        <div>
                       
                        </div>
                    </div>

                </div>


                <div data-uk-grid   className={` uk-grid uk-child-width-1-2@m   ${styles.linha_do_tempo}`}   >
                    <div   className={`${styles.text }`}>
                        <div>
                            <h1  ><span  id="a2014"></span>2014</h1>
                            <p>
                            <strong>Aniversário de 45 anos da Editora Manole</strong>. Mais de 1.100 títulos no portfólio de pronta entrega.
                            </p>
                        </div>
                    </div> 

                    <div   className={`${styles.image}`} >
                        <div>
                       
                        </div>
                    </div>

                </div>
  
             
            </div>
        </div>
    </section>
    </Layout>
  );
}


 
