import React, { SelectHTMLAttributes } from 'react';
import { ErrorBlock, InputBlock, SelectContainer } from '../style';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  placeholder: string;
 
  error: boolean;
  helperText?: string;

  UserValue?: String;

  options: Array<{
    value: string,
    label: string;
  }>;
}

export interface OptionsSelect {
  options: {
    value: string,
    label: string;
  };
}

const Select: React.FC<SelectProps> = ({ label, name, options, placeholder, error, helperText, UserValue, defaultValue,  ...rest  }) => {
  return (
    <InputBlock>
      <label htmlFor={ name }> { label } </label>

      <SelectContainer
        id={ name }
        value=""
  
        { ...rest }
        className={ error === true ? "error uk-select" : "uk-select" }
      >
    
        {
          options.map((item, index) => {
            return (
              <option key={ item.value } value={ item.value }   >
                {item.label} 
                
              </option>
            );
          })
        }
      </SelectContainer>

      {
        error === true ? <ErrorBlock>{ helperText }</ErrorBlock> : <></>
      }
    </InputBlock>
  );
};

export default Select;
