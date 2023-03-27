import React from 'react'
 
   
const InputRadio = ({legenda, name, value}) => {  
    return (
    <div>   
        <div className='uk-margin'> 
            <label className='uk-flex uk-flex-middle'>
                <div className=''><input className="uk-radio" type="checkbox" name={name} value={value} required  /></div>
                <span className='uk-margin-small-left text'> {legenda} </span>
            </label> 
        </div>
    </div>
                     
    )
}

export default InputRadio