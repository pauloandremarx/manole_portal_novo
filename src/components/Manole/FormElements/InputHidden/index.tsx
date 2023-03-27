import React, { InputHTMLAttributes } from 'react';
import { ErrorBlock } from '../style';
 

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { 
 
  name: string;
  value: string;
}

const InputHidden: React.FC<InputProps> = ({ name, value, ...rest  }) => {
  return (
  
          <input  { ...rest }  id={ name } type="text" name={ name }   value={value} />
           
    
   
  );
};

export default InputHidden;