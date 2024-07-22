import React from "react";

export default function FormInput(props) {
  return (
    <>
      <label className="col-md-12 form-label text-center fw-bold fs-5" htmlFor={props.name}>
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        id={props.name}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
      />
    </>
  );
}
