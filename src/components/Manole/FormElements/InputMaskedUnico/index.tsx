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
     <>
       
                <InputMaskedContainer
                    mask={mask}        
                    type="text"
                    name={ name }
                    id={ name }
                    { ...rest }
                    className={ error === true ? "uk-input error" : "uk-input" }
                  />
 
        
            {
              error === true ? <ErrorBlock>{ helperText }</ErrorBlock> : <></>
            }
    </>
  );
};

export default InputMasked;