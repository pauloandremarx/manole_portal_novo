import styled, { css } from 'styled-components';
import InputMask from 'react-input-mask';

const Pattern = css`
  width: 100%;

 
`;

export const InputFileContainer = styled.div`
  width: 100%;  
  margin-bottom: 32px;  
  display: block;
  border-radius:1em;
  
  p {
    font-size: 12px;
    color: var(--color-text);
  }

  label {
    color: var(--color-blue);
    cursor: pointer;
  }

  input {
    display: none;
    border-radius:1em;
  }
`;

export const InputContainer = styled.input`
  ${ Pattern }
`;

export const InputMaskedContainer = styled(InputMask)`
  ${ Pattern }
  border-radius:0.4em;
`;

export const SelectContainer = styled.select`
  ${ Pattern }
`;

export const InputBlock = styled.div`
  margin-bottom: 32px;
  width: 100%;
`;

export const ErrorBlock = styled.div`
  background: var(--alert-error-background);
  color: red;
  display: flex;
  align-items: center;  
  width: 100%;
  padding: 14px 16px;
  height: 54px;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 8px;
`;

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-ice);
`;

export const Form = styled.form`
  width: 100%;
  max-width: 600px;  
  margin: 32px 8px;
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(33,33,33,0.08);
  -moz-box-shadow: 4px 4px 8px 0px rgba(33,33,33,0.08);
  box-shadow: 4px 4px 8px 0px rgba(33,33,33,0.08);

  @media screen and (max-width: 450px){
    padding: 24px 16px;
  }
`;

export const Title = styled.legend`
  font-size: 24px;
  color: var(--color-blue-dark);
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
`;

export const ContainerAddMoreCities = styled.div`
  padding-bottom: 8px;
  margin-bottom: 16px;  
  width: 100%;
  display: flex;
  justify-content: space-between; 

  span {
    color: var(--text);
    font-size: 14px;
  }
`;

export const BtnAddMoreCities = styled.button`
  font-size: 14px; 
  color: var(--color-blue);
  background: none;
  outline: none !important;
  border: none !important;
`;

export const Inline = styled.div`
  display: inline-flex !important;

  button {
    margin-right: 8px;
  }
`;

export const Logo = styled.img`
  width: 100%; 
  height: auto; 
  min-height: 60px;
  margin-bottom: 24px;
`;

export const InputsContainer = styled.section``;

export const ContentForm = styled.fieldset``;

export const Region = styled.div`
`;
