import React from 'react';
import './BrightnessSlider.css'; // Make sure to link to the CSS file

const BrightnessSlider = ({name, value, onChange, disabled }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="slider"
        id={name}
        onChange={onChange}
        onMouseUp={(event)=>{console.log(event.target)}}
        onTouchEnd={(event)=>{console.log(event.target)}}
        disabled={disabled}
      />
    </div>
  );
};

export default BrightnessSlider;
