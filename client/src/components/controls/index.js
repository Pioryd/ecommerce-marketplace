import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

export function Group(props) {
  return (
    <fieldset className="a4t_group" {...props}>
      {props.children}
    </fieldset>
  );
}

export function Legend(props) {
  return (
    <legend className="a4t_legend" {...props}>
      {props.children}
    </legend>
  );
}

export function Label(props) {
  return (
    <label className="a4t_label" {...props}>
      {props.children}
    </label>
  );
}

export function Input(props) {
  return <input className="a4t_input" {...props} />;
}

export function Textarea(props) {
  return <textarea className="a4t_textarea" {...props} />;
}

export function Button(props) {
  return (
    <button className="a4t_button" {...props}>
      {props.children}
    </button>
  );
}

export function ButtonLink(props) {
  return (
    <Link className="a4t_button" {...props}>
      {props.text}
    </Link>
  );
}
