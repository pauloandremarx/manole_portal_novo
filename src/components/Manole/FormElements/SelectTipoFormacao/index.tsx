import React, { SelectHTMLAttributes } from 'react';
import { ErrorBlock, InputBlock, SelectContainer } from '../style';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  placeholder: string;
  recover: number;

  error: boolean;
  helperText?: string;

  UserValue?: String;

  options: Array<{
      id: number,
      nome: string;
  }>;
}



const SelectInstituicao: React.FC<SelectProps> = ({ label, name, options, placeholder, error, helperText, UserValue, defaultValue, recover,  ...rest  }) => {
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
              <>
                {recover}
              { recover == item.id ? (
                 <option key={item.id} value={item.id}  selected >
                {item.nome}

              </option>

              ) : (
                   <option key={item.id} value={item.id}   >
                {item.nome}

              </option>
              )}
             </>
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

export default SelectInstituicao;
