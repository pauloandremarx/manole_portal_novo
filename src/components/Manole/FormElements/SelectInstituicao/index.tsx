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
    inst_id: number,
    inst_nome: string;
  }>;
}



const SelectInstituicao: React.FC<SelectProps> = ({ label, name, options, placeholder, error, helperText, UserValue, defaultValue, recover,  ...rest  }) => {
  return (
    <InputBlock>
      <label htmlFor={ name }> { label } </label>

      <SelectContainer
        id={ name }
        value=""
        required
        { ...rest }
        className={ error === true ? "error uk-select" : "uk-select" }
      >
          <option selected disabled>Selecione a opção: </option>
        {

          options.map((item, index) => {
            return (
              <>
                {recover}
              { recover == item.inst_id ? (
                 <option key={item.inst_id} value={item.inst_id}  selected >
                {item.inst_nome}

              </option>

              ) : (
                   <option key={item.inst_id} value={item.inst_id}   >
                {item.inst_nome}

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
