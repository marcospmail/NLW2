import React, { InputHTMLAttributes } from 'react';

import './styles.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string,

}

const Input: React.FC<InputProps> = ({ id, label, ...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...rest} />
    </div>
  );
}

export default Input;