import React from 'react'
  
const InputCuston = ({type, name, placeholder, handleOnchange, icon, value, filter}) => {  
    return (
       
        <div className="margin_card" >
            <div className="uk-inline uk-width-1-1" >
                <span className="uk-form-icon margin_left"  >{icon}</span>
                <input className="uk-input uk-width-1-1 padding_left" name={name} id={name} type={type} placeholder={placeholder} data-js={filter}  onChange={handleOnchange} value={value} />
            </div>
        </div>
                     
    )
}

export default InputCuston