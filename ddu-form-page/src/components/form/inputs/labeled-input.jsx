import React, { forwardRef } from "react";
import {InputHolder} from "./labeled-input-styles.jsx";
import {ErrorMessage} from "../../../styles/global-styles.jsx";

const LabeledInput = forwardRef(
  ({ title, name, type, form, placeholder, disabled, ...props }, ref) => {
    return (
      <InputHolder>
        <label htmlFor={name}>{title}</label>
        <input
          id={name}
          name={name}
          type={type}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values[name] || ""}
          className="form-input form-control"
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {form.touched[name] && form.errors[name] && (
          <ErrorMessage>{form.errors[name]}</ErrorMessage>
        )}
      </InputHolder>
    );
  }
);

export default LabeledInput;