import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import './DashboardCard.css'; // Make sure to create a corresponding CSS file for styling
import { FaLightbulb } from "react-icons/fa6";
import ToggleSwitch from 'components/ToggleSwitch/ToggleSwitch';
import BrightnessSlider from 'components/Slider/BrightnessSlider';


const DashboardCard = (props) => {
    const [toggle, setToggle] = useState(false);
    const [brightness, setBrightness] = useState(50);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleBrightness = (event)=>{
        console.log(event.target.value)
        setBrightness(event.target.value)
    }


    return (
        <Card>
            <CardBody>
                <div className='icon-switch-container'>
                    <FaLightbulb color={ toggle ? 'yellow' : "grey"} size={30} />
                    <ToggleSwitch 
                    id="test" 
                    name="test" 
                    checked={toggle} 
                    handleToggle={handleToggle} />
                </div>
                <div className='widget-details '>
                    <p>
                        {props.name}
                    </p>
                </div>
                <div className='slider-selector-container'>
                    <BrightnessSlider
                        name={props.name}
                        value={brightness}
                        disabled={!toggle}
                        onChange={handleBrightness}
                    />
                    {/* Implement on change function for brightness */}
                    Brightness: {brightness}
                </div>
            </CardBody>
        </Card>
    );
};

export default DashboardCard;
