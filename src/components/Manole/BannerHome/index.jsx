'use client';
 

export default function BannerHome( props ) {

  
  return <>
    <header>
    <div className="uk-position-relative uk-slideshow"  data-uk-slideshow="ratio: 8:3; min-height: 400;">

        <div className="uk-position-relative uk-visible-toggle uk-light" >
                 
            <ul className="uk-slideshow-items">
            {
              
             props.banners.map((item) => (
                  <li key={item.link}>
                     <a href={ item.href } target="_blank"> 
                            
                            <img className="uk-visible@m" src={item.link} alt={item.titulo} data-uk-cover />
                            <img className="uk-hidden@m" src={item.link_mobile} alt={item.titulo} data-uk-cover />
                        </a>
                  </li>

                 ))
                   
                 
                 } 
            
             
            </ul>

            <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#"   
                data-uk-slideshow-item="previous"></a>
            <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#"   
                data-uk-slideshow-item="next"></a>
            <div className="uk-position-bottom">
                <ul className="uk-slideshow-nav  uk-dotnav uk-flex-center uk-margin"></ul>
            </div>
        </div>



    </div>

</header>
 </>
}
 
 