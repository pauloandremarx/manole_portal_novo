import React, { InputHTMLAttributes } from 'react';
import { ErrorBlock } from '../style';
 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; 
  icon: string;
  secondLabel?: string;
  name: string;
  error: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ icon, label, name, secondLabel, error, helperText, ...rest }) => {
  return (
    <div className="margin_card" >
            <label>{label}</label>
            <div className="uk-inline uk-width-1-1" >
                <span className="uk-form-icon margin_left" data-uk-icon={icon}></span>
                <input className={ error === true ? "uk-input uk-width-1-1 padding_left error" : "uk-input uk-width-1-1 padding_left" }  { ...rest }  id={ name } type="text" name={ name } placeholder={helperText} />
            </div>
            {
          error === true ? <ErrorBlock>{ helperText }</ErrorBlock> : <></>
        }
        </div>

   
  );
};

export default Input;