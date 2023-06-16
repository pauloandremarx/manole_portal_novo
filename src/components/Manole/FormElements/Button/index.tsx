
import React, { useState } from 'react';
import { Btn, BtnInfo } from './styles';
import { BsQuestion } from 'react-icons/bs';

interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  text: string;
  type: "submit" | "button" | "reset";
};

interface ButtonInfoProps {
  message: string;
}

const Button: React.FC<Props> = ({ text, type, ...rest }) => {
  return <Btn { ...rest } type={ type }>{ text }</Btn>;
};


export const ButtonInformation: React.FC<ButtonInfoProps> = ({ message }) => {
  const [ popoverOpen, setPopoverOpen ] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <React.Fragment>
      <BtnInfo id={ "popover" } type="button">
        <BsQuestion />
      </BtnInfo>


    </React.Fragment>
  );
};

export default Button;