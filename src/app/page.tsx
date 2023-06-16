import styles from './Home.module.css';
import Layout from '@/components/Manole/Layout';
import YoutubeEmbed from '@/components/Manole/Youtube'
import Newsletter from '@/components/Manole/Newsletter'
import BannerHome from '@/components/Manole/BannerHome'

import Image from 'next/image';

import {Carosel1, Carosel2, Carosel3} from '@/components/Manole/CaroselItensManole';

export default function Home() {
    return (
        <Layout>
            <BannerHome/>

            <section className="uk-margin-large-top">
                <div className="container_padrao ">
                    <div className={`${styles.sobre_nos} uk-child-width-1-2@m  uk-grid`} data-uk-grid>

                        <div>
                            <h4 className={`${styles.text_border}`}>Sobre nós</h4>
                            <div className={`${styles.label_200} uk-margin-top`}>
                                <div className={`${styles.label}`}>
                                    <span>EdTech</span>
                                    <span>HealthTech</span>
                                </div>
                            </div>


                            <h1>A manole</h1>

                            <p>
                                Comprometidos com a excelência em cada detalhe e por meio de relacionamentos próximos
                                com todos os envolvidos – colaboradores, parceiros e clientes –, trabalhamos para a
                                realização
                                do nosso objetivo: promover um ecossistema acessível e altamente qualificado de produtos
                                e
                                serviços que unem conhecimento e tecnologia para transformar a carreira do profissional
                                nas
                                áreas da saúde e científica ao longo de toda sua jornada.
                            </p>


                        </div>

                        <div className="uk-flex uk-flex-center">
                            <div>
                                <a data-uk-toggle="target: #modal-video"> <Image width={800} height={800}
                                                                                 src="/manole/home/video-home.webp"
                                                                                 alt="Video Manole"
                                                                                 className='uk-position-relative next_img'/>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

            </section>


            <div id="modal-video" className={`${styles.youtube_modal}`} data-uk-modal>
                <div className="uk-modal-dialog uk-modal-body">
                    <button className="uk-modal-close-default" type="button"></button>
                    <YoutubeEmbed embedId='aY59ZZ5nXEY'/>
                </div>
            </div>


            <section>
                <div className={`${styles.container_icons} uk-margin-large-bottom`}>
                    <h1 className={`${styles.title} uk-margin-large-bottom uk-margin-large-top uk-margin-medium-bottom`}>Nosso
                        impacto</h1>

                    <div className={`${styles.icons_home} uk-child-width-1-4@m uk-child-width-1-2  uk-grid`}
                         data-uk-grid>
                        <div>
                            <div>
                                <div className="uk-flex uk-flex-center">

                                    <Image width={300} height={300} src="/manole/home/icon-home-1.webp"
                                           alt="Icone de colaboradores da Manole"
                                           className='uk-position-relative next_img'/>
                                </div>
                                <h3>+ de 900</h3>
                                <p>colaboradores</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div className="uk-flex uk-flex-center"><Image width={300} height={300}
                                                                               src="/manole/home/icon-home-2.webp"
                                                                               alt="Icone de publicações da Manole"
                                                                               className='uk-position-relative next_img'/>
                                </div>
                                <h3>+ de 4000</h3>
                                <p>publicações</p>
                            </div>

                        </div>

                        <div>
                            <div>
                                <div className="uk-flex uk-flex-center"><Image width={300} height={300}
                                                                               src="/manole/home/icon-home-3.webp"
                                                                               alt="Icone de estudantes da Manole"
                                                                               className='uk-position-relative next_img'/>
                                </div>
                                <h3>+ de 3M</h3>
                                <p>estudantes</p>
                            </div>

                        </div>

                        <div>
                            <div>
                                <div className="uk-flex uk-flex-center"><Image width={300} height={300}
                                                                               src="/manole/home/icon-home-4.webp"
                                                                               alt="Icone de profissionais"
                                                                               className='uk-position-relative next_img'/>
                                </div>
                                <h3>+ de 900</h3>
                                <p>profissionais de saúde</p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            <section className={`${styles.bg_branco} ${styles.bg_cinza_t1}`}>

                <Image width={300} height={300} className={`${styles.bg_home_patters_1} uk-position-absolute`}
                       src="/manole/home/bg_home_1.webp" alt="Trinangulo da Manole como background"/>
                <Image width={300} height={300} className={`${styles.bg_home_patters_2} uk-position-absolute`}
                       src="/manole/home/bg_home_2.webp" alt="Trinangulo da Manole como background"/>
                <Image width={300} height={300} className={`${styles.bg_home_patters_3} uk-position-absolute`}
                       src="/manole/home/bg_home_3.webp" alt="Trinangulo da Manole como background"/>
                <Image width={300} height={300} className={`${styles.bg_home_patters_4} uk-position-absolute`}
                       src="/manole/home/bg_home_4.webp" alt="Trinangulo da Manole como background"/>
                <Image width={300} height={300} className={`${styles.bg_home_patters_5} uk-position-absolute`}
                       src="/manole/home/bg_home_5.webp" alt="Trinangulo da Manole como background"/>

                <div className={`${styles.bg_cinza} `}>
                    <div className="container_padrao">
                        <span id='solucoes'></span>
                        <div className={`${styles.itens_bg_cinza} ${styles.i_verde}  uk-grid`} data-uk-grid>
                            <div
                                className={`   uk-width-2-5@m uk-width-1-1 uk-flex uk-flex-middle ${styles.border_right}`}>
                                <div className="">
                                    <h2>HealthTech+</h2>
                                    <h3>soluções</h3>
                                </div>

                            </div>

                            <div className="uk-width-3-5@m uk-width-1-1">
                                <p>
                                    Reunindo sua sólida experiência na produção de conteúdos técnico-científicos e seu
                                    compromisso com a evolução permanente aliada à incorporação de novas tecnologias a
                                    serviço do conhecimento, a Manole oferece soluções personalizadas e altamente
                                    eficientes
                                    para instituições e sociedades de classe, contribuindo para alavancar seu sucesso e
                                    posicionamento no mercado. Estas soluções incluem: criação de conteúdo digital
                                    multiplataforma, publicação de livros físicos e e-books, produção de cursos e
                                    treinamentos, elaboração de plataforma educacional (LMS) e e-congress, com a
                                    cobertura
                                    on-line de congressos, simpósios e workshops.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.container_slider} ${styles.slider_container_direita} slider_container_direita`}>


                        <Carosel1/>

                    </div>


                    <div className="container_padrao uk-margin-xlarge-top">
                        <span id='educacao'></span>
                        <div className={`${styles.itens_bg_cinza}  ${styles.i_laranja} uk-grid`} data-uk-grid>

                            <div className="uk-width-3-5@m uk-width-1-1 ">
                                <p className={`${styles.max_width_p} `}>
                                    Há 10 anos no mercado, a Manole Educação vem cumprindo o objetivo de organizar
                                    conteúdos
                                    de alta complexidade e torná-los acessíveis a profissionais e acadêmicos em todo o
                                    Brasil e no mundo por meio de recursos tecnológicos de aprendizagem ágeis e
                                    funcionais.
                                    Contamos com centenas de cursos realizados em diferentes especialidades médicas e de
                                    saúde e celebramos até o momento mais de 120 mil alunos, criando pontes entre
                                    pessoas e os
                                    conhecimentos reunidos por renomadas instituições e professores que são referências
                                    em
                                    seus campos de atuação.
                                </p>
                            </div>

                            <div
                                className={`uk-width-2-5@m uk-width-1-1 uk-flex uk-flex-middle ${styles.border_left} `}>
                                <div className="">
                                    <h2>Saúde+</h2>
                                    <h3>educação</h3>
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className={`${styles.container_slider} `}>


                        <Carosel2/>


                    </div>


                    <div className="container_padrao uk-margin-xlarge-top">
                        <span id='editora'></span>
                        <div className={`${styles.i_azul} ${styles.itens_bg_cinza}   uk-grid`} data-uk-grid>

                            <div
                                className={`${styles.border_right} uk-width-2-5@m uk-width-1-1 uk-flex uk-flex-middle `}>
                                <div className="">
                                    <h2>EdTech+</h2>
                                    <h3>editora</h3>
                                </div>

                            </div>

                            <div className="uk-width-3-5@m uk-width-1-1">
                                <p>
                                    Há mais de 50 anos, a Manole produz e lança no mercado títulos selecionados que
                                    contribuem para a expansão do conhecimento nas áreas da Saúde e no segmento
                                    técnico-científico. Em seu percurso editorial, cada obra recebe um cuidado
                                    diferenciado e altamente especializado que, somado às parcerias com autores e
                                    instituições de grande renome, garante a indiscutível qualidade que é marca
                                    registrada das publicações sob a marca Manole. São mais de 4 mil títulos publicados
                                    até o momento, diversos best sellers e projetos premiados.
                                </p>
                            </div>


                        </div>
                    </div>

                    <div className={`${styles.container_slider} `}>

                        <Carosel3/>

                    </div>
                </div>


                <Newsletter/>
            </section>


        </Layout>
    );
}



