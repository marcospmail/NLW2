import React, { SelectHTMLAttributes } from 'react';

import './styles.css'

interface OptionProps {
  value: string,
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string,
  options: Array<OptionProps>
}

const Select: React.FC<SelectProps> = ({ id, label, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={id}>{label}</label>
      <select defaultValue="" id={id}  {...rest} >
        <option disabled hidden>Select a option</option>

        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}

      </select>
    </div>
  );
}

export default Select;