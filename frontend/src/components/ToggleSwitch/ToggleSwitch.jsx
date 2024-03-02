import React, { useEffect, useState } from 'react';
import './ToggleSwitch.css'; // make sure to link the CSS file

const ToggleSwitch = ({ id, name, checked, handleToggle }) => {

  return (
    <>
      <input
        checked={checked}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: checked && '#06D6A0' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default ToggleSwitch;
