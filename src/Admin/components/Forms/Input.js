import React from "react";

const Input = props => {
  //console.log(props.value);
  return (
    <div className="form-group">
      <label for={props.name} className="form-label">
        {props.title}
      </label>
      <input
        className="form-control"
        id={props.name}
        name={props.name}
        min={props.min}
        type={props.inputType}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        readonly={props.readonly}
        disabled={props.disabled}
        required={props.required}
        display={props.display}
        hidden={props.hidden}
        validatemail={props.validatemail}
        onClick={props.handClick}
        onInvalid={props.onInvalid}

        {...props}
      />
    </div>
  );
};

export default Input;
