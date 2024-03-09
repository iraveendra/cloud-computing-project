import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Switch from "react-switch";
import ColorPicker from "components/ColorPicker"; // Import ColorPicker component
import Slider from "@mui/material/Slider"; // Import Slider component from Material-UI
import Alert from '@mui/material/Alert'; // Import Alert component
import { dashboardBackendUrl, deviceIntegrationUrl } from "config";

function Dashboard() {
  const [widgetsData, setWidgetsData] = useState([]);
  const [isVisible, setIsVisible] = useState({});
  const [sliderValues, setSliderValues] = useState({});
  const [colorValues, setColorValues] = useState({});
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const fetchLIFXWidgetState = async (widgets) => {
    for (const widget of widgets) {
      try {
        const response = await fetch(`${deviceIntegrationUrl}/lifx/lights/${widget._id}`);
        const data = await response.json();
        
        // Update switch state
        setIsVisible(prevState => ({
          ...prevState,
          [widget._id]: data[0].power === 'on'? true:  false,
        }));
  
        // Convert brightness value
        const brightness = Math.round(data[0].brightness* 100);
        // Update slider value
        setSliderValues(prevState => ({
          ...prevState,
          [widget._id]: brightness,
        }));
  
        // Convert color to hex
        const hexColor = rgbToHex(data[0].color.hue, data[0].color.sat, data[0].color.kelvin);
        // Update color picker value
        setColorValues(prevState => ({
          ...prevState,
          [widget._id]: hexColor,
        }));

          // Handle offline light
        if (!data[0].connected) {
          setAlert({ show: true, type: 'error', message: `Light with ${widget.name} is offline` });
          setTimeout(() => {
            setAlert({ show: false, type: '', message: '' });
          }, 3000);
        }

      } catch (error) {
        console.error('Error fetching LIFX widget state:', error);
      }
    }
  };
  
  const fetchPhilipsWidgetState = async (widgets) => {
    for (const widget of widgets) {
      try {
        const response = await fetch(`${deviceIntegrationUrl}/philips/lights/${widget._id}`);
        const data = await response.json();
  
        // Update switch state
        setIsVisible(prevState => ({
          ...prevState,
          [widget._id]: data.state.on? true: false,
        }));
  
        // Convert brightness value
        const brightness = Math.round((data.state.bri / 255) * 100);
        // Update slider value
        setSliderValues(prevState => ({
          ...prevState,
          [widget._id]: brightness,
        }));

        // Convert hue and sat to hex
        const hexColor = hueSatToHex(data.state.hue, data.state.sat);
        // Update color picker value
        setColorValues(prevState => ({
          ...prevState,
          [widget._id]: hexColor,
        }));

        // Handle unreachable light
        if (!data.reachable) {
          setAlert({ show: true, type: 'error'  , message: `Light with ${widget.name} is offline` });
          setTimeout(() => {
            setAlert({ show: false, type: '', message: '' });
          }, 3000);
        }
      } catch (error) {
        console.error('Error fetching Philips widget state:', error);
      }
    }
  };

  useEffect(() => {
    fetch(`${dashboardBackendUrl}/apps/latest`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setWidgetsData(data.data.widgets);
          
          // Fetch LIFX and Philips widget state data
        
            const lifxWidgets = data.data.widgets.filter(widget => widget.brand === 'LIFX');
            fetchLIFXWidgetState(lifxWidgets);
            
            const philipsWidgets = data.data.widgets.filter(widget => widget.brand === 'Philips');
            fetchPhilipsWidgetState(philipsWidgets);
        } else {
          setAlert({ show: true, type: 'error', message: data.message });
        }
      })
      .catch(error => console.error('Error fetching widgets:', error));
  }, []);
  
  const getBrand = (widgetId) => {
    const widget = widgetsData.find(widget => widget._id === widgetId);
    return widget ? widget.brand : '';
  };

  const handleSwitchChange = (widgetId, checked) => {
    console.log(widgetId, checked)
    const brand = getBrand(widgetId);
    const powerPayload = brand === 'LIFX' ? { power: checked ? 'on' : 'off' } : { on: checked }; // Construct power payload based on brand
    
    setIsVisible(prevState => ({
      ...prevState,
      [widgetId]: checked,
    }));

    // Make API call to control power
    fetch(`${deviceIntegrationUrl}/${brand.toLowerCase()}/lights/${widgetId}/state`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(powerPayload),
    })
      .then(response => response.json())
      .then(data => console.log(`${brand} response:`, data))
      .catch(error => console.error(`Error controlling ${brand} light:`, error));
  
    console.log('Widget ID:', widgetId);
    console.log('Brand:', brand);
    console.log('Power:', checked);
  };
  
  const handleSliderChange = (widgetId, value) => {
    const brand = getBrand(widgetId);
    const brightnessVal = brand === 'LIFX' ? value / 100 : Math.round((value / 100) * 255); // Calculate brightness based on brand
    
      // Update the brightness value in the state immediately
    setSliderValues(prevState => ({
      ...prevState,
      [widgetId]: value, // Update the slider value immediately
    }));

    const brightnessPayload = brand === 'LIFX' ? { brightness: brightnessVal } : { bri: brightnessVal }; // Construct brightness payload based on brand
  
    // Make API call to control brightness
    fetch(`${deviceIntegrationUrl}/${brand.toLowerCase()}/lights/${widgetId}/state`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(brightnessPayload),
    })
      .then(response => response.json())
      .then(data => console.log(`${brand} response:`, data))
      .catch(error => console.error(`Error controlling ${brand} light:`, error));
  
    console.log('Widget ID:', widgetId);
    console.log('Brand:', brand);
    console.log('Brightness:', brightnessVal);
  };
  
  const handleColorChange = (widgetId, color) => {
    console.log(color, colorValues);
    const brand = getBrand(widgetId);
    const { r, g, b } = hexToRgb(color);
    const [hue, sat] = rgbToHueSat(r, g, b);
    const colorPayload = brand === 'LIFX' ? { color: color } : { hue: hue, sat: sat }; // Construct color payload based on brand

      // Update the color value in the state immediately
    setColorValues(prevState => ({
      ...prevState,
      [widgetId]: color,
    }));

    // Make API call to control color
    fetch(`${deviceIntegrationUrl}/${brand.toLowerCase()}/lights/${widgetId}/state`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(colorPayload),
    })
        .then(response => response.json())
        .then(data => console.log(`${brand} response:`, data))
        .catch(error => console.error(`Error controlling ${brand} light:`, error));

    console.log('Widget ID:', widgetId);
    console.log('Brand:', brand);
    console.log('Color:', color);
};

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
                break;
            case g:
                h = ((b - r) / d + 2) * 60;
                break;
            case b:
                h = ((r - g) / d + 4) * 60;
                break;
            default:
                break;
        }
    }

    return [h, s];
};

const rgbToHueSat = (r, g, b) => {
    const [h, s] = rgbToHsl(r, g, b);
    return [Math.round(h * 182.04), Math.round(s * 255)];
};

const hexToRgb = (hexColor) => {
  // hexColor = hexColor.trim(); // Remove leading/trailing spaces
  if (!hexColor) return null;
  let rgb = null;

  // Check if the input is a valid hex color string
  if (/^#?([a-f\d]{3}){1,2}$/i.test(hexColor)) {
    // Remove hash if present
    hexColor = hexColor.replace(/^#/, '');

    // Convert shorthand hex color to full form
    if (hexColor.length === 3) {
      hexColor = hexColor.replace(/(.)/g, '$1$1');
    }

    // Parse hex color to RGB
    const bigint = parseInt(hexColor, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    rgb = { r, g, b };
  }

  return rgb;
};


const rgbToHex = (hue, sat, kelvin) => {
  // Convert hue to RGB
  const huePrime = hue / 182.04;
  const x = 1 - Math.abs((huePrime / 60) % 2 - 1);
  const c = (1 - Math.abs(2 * kelvin / 100 - 1)) * sat;
  // const m = kelvin / 100 - c / 2;

  let r, g, b;
  if (huePrime >= 0 && huePrime < 60) {
    [r, g, b] = [c, c * x, 0];
  } else if (huePrime >= 60 && huePrime < 120) {
    [r, g, b] = [c * x, c, 0];
  } else if (huePrime >= 120 && huePrime < 180) {
    [r, g, b] = [0, c, c * x];
  } else if (huePrime >= 180 && huePrime < 240) {
    [r, g, b] = [0, c * x, c];
  } else if (huePrime >= 240 && huePrime < 300) {
    [r, g, b] = [c * x, 0, c];
  } else {
    [r, g, b] = [c, 0, c * x];
  }

  // Convert RGB to hexadecimal
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const hueSatToHex = (hue, sat) => {
  const rgbColor = hslToRgb(hue / 65535, sat / 255, 0.5); // Saturation 0.5 for default
  const hexColor = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
  return hexColor;
};

const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const hueToRgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

  function turnOffLights() {
    // Define the list of light IDs
    const lifxIds = ['d073d5d43844', 'd073d5d461d6'];
    const philipsIds = [1, 2];
  
    // Turn off LIFX lights
    lifxIds.forEach(id => {
      fetch(`${deviceIntegrationUrl}/lifx/lights/${id}/state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          power: 'off',
          brightness: 0,
          color: '#000000'
        }),
      })
      .then(response => response.json())
      .then(data => console.log(`LIFX light ${id} turned off.`, data))
      .catch(error => console.error(`Error turning off LIFX light ${id}:`, error));
    });
  
    // Turn off Philips lights
    philipsIds.forEach(id => {
      fetch(`${deviceIntegrationUrl}/philips/lights/${id}/state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          on: false,
          bri: 0,
          sat: 0,
          hue: 0
        }),
      })
      .then(response => response.json())
      .then(data => console.log(`Philips light ${id} turned off.`, data))
      .catch(error => console.error(`Error turning off Philips light ${id}:`, error));
    });
  }

  const toggleVisibility = (widgetId) => {
    setIsVisible(prevState => ({
      ...prevState,
      [widgetId]: !prevState[widgetId],
    }));
  };

  return (
    <>
      <div className="content">
        <Row>
          {widgetsData.map(widget => (
            <Col md="4" key={widget._id}>
              <Card>
              <CardBody style={{ padding: '3em 2em 2em 2em' }}>
                  <Row>
                  <Col md="6">
                    <h3>
                      {widget.name}
                    </h3> 
                    <h6>
                      {widget.description} 
                    </h6>
                  </Col>
                    <Col md="6">
                      <span style={{ float: 'right' }}>
                        <Switch
                          checked={isVisible[widget._id]}
                          onChange={(checked) => {
                            toggleVisibility(widget._id);
                            handleSwitchChange(widget._id, checked);
                          }}
                          onColor="#86d3ff"
                          onHandleColor="#2693e6"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20}
                          width={48}
                          className="react-switch"
                          id="material-switch"
                        />
                      </span>
                    </Col>
                  </Row>
                  {isVisible[widget._id] && (
                    <>
                      <Row style={{marginTop: '1em'}}>
                        <Col md="9">
                          <Slider
                            aria-label={`Slider for widget ${widget._id}`}
                            value={sliderValues[widget._id]}
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={100}
                            onChange={(event, value) => handleSliderChange(widget._id, value)}
                          />
                        </Col>
                        
                        <Col md="3">
                        <span style={{ float: 'right' }}>
                          <ColorPicker
                            initialColor={colorValues[widget._id]}
                            onChange={(color) => handleColorChange(widget._id, color)}
                            style={{background: colorValues[widget._id]}}
                          />
                          </span>
                        </Col>
                      </Row>
                    </>
                  )}
                </CardBody>

              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {alert.show &&
        <Alert severity={alert.type} style={{ position: 'absolute', top: 0, width: '100%', zIndex: 999 }}>
          {alert.message}
        </Alert>
      }
    </>
  );
}

export default Dashboard;
