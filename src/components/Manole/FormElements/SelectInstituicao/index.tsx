import React, { SelectHTMLAttributes, Fragment } from 'react';
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
          <option  defaultValue={'Selecione a opção:'} disabled>Selecione a opção: </option>
        {

          options.map((item, index) => {
            return (
              <Fragment key={`inst_id_${item.inst_id}`}>
                {recover}
              { recover == item.inst_id ? (
                 <option key={`${item.inst_id}_instituico_s`} value={item.inst_id}  defaultValue={recover} >
                {item.inst_nome}

              </option>

              ) : (
                   <option key={`${item.inst_id}_instituico_b`} value={item.inst_id}   >
                {item.inst_nome}

              </option>
              )}
             </Fragment>
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
