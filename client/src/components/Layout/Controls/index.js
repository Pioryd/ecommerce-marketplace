import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

export const Group = (props) => <fieldset className="a4t_group" {...props} />;
export const Legend = (props) => <legend className="a4t_legend" {...props} />;
export const Label = (props) => <label className="a4t_label" {...props} />;
export const Input = (props) => <input className="a4t_input" {...props} />;
export const Radio = (props) => (
  <div className="a4t_radio-group">
    <input className="a4t_radio-input" {...props} />
    <label className="a4t_radio-label">{props.label}</label>
  </div>
);
export const Select = (props) => <select className="a4t_select" {...props} />;
export const Textarea = (props) => (
  <textarea className="a4t_textarea" {...props} />
);
export const Button = (props) => <button className="a4t_button" {...props} />;
export const ButtonDisabled = (props) => (
  <button className="a4t_button a4t_button-disabled" {...props} />
);
export const ButtonProcessing = (props) => (
  <ButtonDisabled {...props}>Processing...</ButtonDisabled>
);
export const ButtonLink = (props) => <Link className="a4t_button" {...props} />;
export const Info = (props) => <label className="a4t_info" {...props} />;
