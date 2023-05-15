import React, {useState} from 'react'
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

const InputPassword = ({name, placeholder, handleOnchange, value}) => {  

    const [isHidePass, setHidePass] = useState(true);

    const toggleClass = () => {
        setHidePass(!isHidePass);
      };
 
     var hide = isHidePass ? 'uk-hidden' : 'uk-block'

      var block = isHidePass ? 'uk-block': 'uk-hidden'
    return (
       
        <div className="uk-margin uk-width-1-1">
            <div className="uk-inline uk-width-1-1 ">
                <a onClick={ toggleClass } className={ `uk-form-icon uk-form-icon-flip ${hide}`}  > <AiFillEye /> </a>
                <a onClick={toggleClass}    className={ `uk-form-icon uk-form-icon-flip ${block}`}   > <AiFillEyeInvisible /> </a>
                <span className="uk-form-icon margin_left" ><RiLockPasswordFill /></span>
                <input onChange={handleOnchange} className="uk-input uk-width-1-1 padding_left" name={name} type={isHidePass ? 'password': 'text'} value={value}  placeholder={placeholder} />
            </div>
        </div>
                     
    )
}

export default InputPassword  