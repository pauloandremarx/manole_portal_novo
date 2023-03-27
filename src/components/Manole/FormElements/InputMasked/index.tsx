import React, { InputHTMLAttributes } from 'react';
import { InputMaskedContainer, InputBlock, ErrorBlock } from '../style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: string;
  secondLabel?: string;
  name: string;
  error: boolean;
  helperText?: string;
  mask: string | (string | RegExp)[];
}

const InputMasked: React.FC<InputProps> = ({ icon, label, name, secondLabel, error, helperText, mask, ...rest }) => {
  return (
    <div className="margin_card" >
            <label>{label}</label>
            <div className="uk-inline uk-width-1-1" >
                <span className="uk-form-icon margin_left" data-uk-icon={icon}></span>
                  <InputMaskedContainer
                    mask={mask}        
                    type="text"
                    name={ name }
                    id={ name }
                    { ...rest }
                    className={ error === true ? "uk-input uk-width-1-1 padding_left error" : "uk-input uk-width-1-1 padding_left" }
                  />
 
            </div>
            {
              error === true ? <ErrorBlock>{ helperText }</ErrorBlock> : <></>
            }
    </div>
  );
};

export default InputMasked;