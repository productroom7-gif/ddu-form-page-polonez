import { ErrorMessage } from '../../../styles/global-styles.jsx';
import {CheckboxLabel} from './checkbox-input-styles.jsx';
import { useId } from 'react';

const CheckboxInput = ({ title, name, form, ...props }, ref) => {
  const reactId = useId();
  const inputId = `${name}-${reactId}`;

  const handleChange = (e) => {
    form.setFieldValue(name, e.target.checked);
  };

  return (
    <CheckboxLabel>
      <input
        type="checkbox"
        id={inputId}
        name={name}
        checked={form.values[name]}
        onChange={handleChange}
        onBlur={() => form.setFieldTouched(name, true)}
        ref={ref}
        {...props}
      />
      <label htmlFor={inputId}>{title}</label>
      {form.touched[name] && form.errors[name] && (
        <ErrorMessage>{form.errors[name]}</ErrorMessage>
      )}
    </CheckboxLabel>
  );
};

export default CheckboxInput;
