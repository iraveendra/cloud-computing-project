import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Switch from "react-switch";
import ColorPicker from "components/ColorPicker"; // Import ColorPicker component
import Slider from "@mui/material/Slider"; // Import Slider component from Material-UI
import Alert from '@mui/material/Alert'; // Import Alert component

function Dashboard() {
    const [widgetsData, setWidgetsData] = useState([]);
    const [isVisible, setIsVisible] = useState({});
    const [sliderValues, setSliderValues] = useState({});
    const [colorValues, setColorValues] = useState({});
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  
    useEffect(() => {
        fetch('http://localhost:3010/apps/latest')
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              setWidgetsData(data.data.widgets);
            //   setIsVisible(Object.fromEntries(data.data.widgets.map(widget => [widget._id, true]))); // Set all switches to 'on'
            //   setSliderValues(Object.fromEntries(data.data.widgets.map((widget, index) => [widget._id, (index + 1) * 10]))); // Set slider values to 10, 20, 30, 40 based on the number of cards
            //   setColorValues(Object.fromEntries(data.data.widgets.map(widget => [widget._id, '#FFC0CB']))); // Set color picker values to pink
      
              // Fetch LIFX and Philips widget state data
              setTimeout(() => {
                console.log('here');
                fetchLIFXWidgetState(data.data.widgets);
                fetchPhilipsWidgetState(data.data.widgets);
                console.log('here');
              }, 5000);
            } else {
              setAlert({ show: true, type: 'error', message: data.message });
            }
          })
          .catch(error => console.error('Error fetching widgets:', error));
      }, []);
      
      const fetchLIFXWidgetState = (widgets) => {
        widgets.forEach(widget => {
          fetch(`http://localhost:3000/lifx/lights/${widget._id}`)
            .then(response => response.json())
            .then(data => {
              // Update switch state
              setIsVisible(prevState => ({
                ...prevState,
                [widget._id]: data.state.on,
              }));
      
              // Convert brightness value
              const brightness = Math.round((data.state.bri / 254) * 100);
              // Update slider value
              setSliderValues(prevState => ({
                ...prevState,
                [widget._id]: brightness,
              }));
      
              // Convert color to hex
              const hexColor = rgbToHex(data.state.color.hue, data.state.color.sat, data.state.color.kelvin);
              // Update color picker value
              setColorValues(prevState => ({
                ...prevState,
                [widget._id]: hexColor,
              }));
            })
            .catch(error => console.error('Error fetching LIFX widget state:', error));
        });
      };
      
      const fetchPhilipsWidgetState = (widgets) => {
        widgets.forEach(widget => {
          fetch(`http://localhost:3000/philips/lights/${widget._id}`)
            .then(response => response.json())
            .then(data => {
              // Update switch state
              setIsVisible(prevState => ({
                ...prevState,
                [widget._id]: data.power === 'on',
              }));
      
              // Convert brightness value
              const brightness = Math.round((data.brightness / 255) * 100);
              // Update slider value
              setSliderValues(prevState => ({
                ...prevState,
                [widget._id]: brightness,
              }));
      
              // Convert hue and sat to hex
              const hexColor = hueSatToHex(data.color.hue, data.color.saturation);
              // Update color picker value
              setColorValues(prevState => ({
                ...prevState,
                [widget._id]: hexColor,
              }));
            })
            .catch(error => console.error('Error fetching Philips widget state:', error));
        });
      };
      
      const rgbToHex = (hue, sat, kelvin) => {
        // Convert hue to RGB
        const huePrime = hue / 182.04;
        const x = 1 - Math.abs((huePrime / 60) % 2 - 1);
        const c = (1 - Math.abs(2 * kelvin / 100 - 1)) * sat;
        const m = kelvin / 100 - c / 2;
      
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
      

  const toggleVisibility = (widgetId) => {
    setIsVisible(prevState => ({
      ...prevState,
      [widgetId]: !prevState[widgetId],
    }));
  };

  const getBrand = (widgetId) => {
    const widget = widgetsData.find(widget => widget._id === widgetId);
    return widget ? widget.brand : '';
  };

  const controlLIFX = (widgetId, power, brightness, color) => {
    const requestBody = {
      power: power ? 'on' : 'off',
      brightness: brightness,
      color: color
    };
    console.log('LIFX request body:', requestBody);

    // Make API call to LIFX endpoint
    fetch(`http://localhost:3000/lifx/lights/${widgetId}/state`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => console.log('LIFX response:', data))
    .catch(error => console.error('Error controlling LIFX light:', error));
  };

  const controlPhilips = (widgetId, power, brightness, hue, sat) => {
    const requestBody = {
      on: power,
      bri: brightness,
      hue: hue,
      sat: sat
    };

    console.log('Philips request body:', requestBody);
    // Make API call to Philips endpoint
    fetch(`http://localhost:3000/philips/lights/${widgetId}/state`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => console.log('Philips response:', data))
    .catch(error => console.error('Error controlling Philips light:', error));
  };

  const handleSwitchChange = (widgetId, checked) => {
    const brand = getBrand(widgetId);
    const power = checked;
    const brightness = 0; // Default brightness value
    const color = '#FFFFFF'; // Default color value
    if (brand === 'LIFX') {
      controlLIFX(widgetId, power, brightness, color);
    } else if (brand === 'Philips') {
      controlPhilips(widgetId, power, brightness, 0, 0); // Default hue and saturation values
    }
    console.log('Widget ID:', widgetId);
    console.log('Brand:', brand);
    console.log('Power:', power);
  };

  const handleSliderChange = (widgetId, value) => {
    const brand = getBrand(widgetId);
    const power = true; // Assume power is always on when slider changes
    let brightness = 0;
    const widgetColor = getWidgetColor(widgetId); // Get the current color of the widget
    if (brand === 'LIFX') {
      brightness = value / 100; // Convert slider value to 0-1 range
      controlLIFX(widgetId, power, brightness, widgetColor); // Use the current color
    } else if (brand === 'Philips') {
      brightness = Math.round((value / 100) * 255); // Convert slider value to 0-255 range
      controlPhilips(widgetId, power, brightness, 0, 0); // Default hue and saturation values
    }
    console.log('Widget ID:', widgetId);
    console.log('Brand:', brand);
    console.log('Brightness:', brightness);
  };

  const handleColorChange = (widgetId, color) => {
    const brand = getBrand(widgetId);
    const power = true; // Assume power is always on when color changes
    const brightness = getWidgetBrightness(widgetId); // Get the current brightness of the widget
    let hue = 0;
    let sat = 0;
    if (brand === 'LIFX') {
      controlLIFX(widgetId, power, brightness, color);
    } else if (brand === 'Philips') {
      const { hueValue, saturationValue } = hexToHueSat(color);
      hue = hueValue;
      sat = saturationValue;
      controlPhilips(widgetId, power, brightness, hue, sat);
    }
    console.log('Widget ID:', widgetId);
    console.log('Brand:', brand);
    console.log('Color:', color);
  };

  const getWidgetColor = (widgetId) => {
    const widget = widgetsData.find(widget => widget._id === widgetId);
    return widget ? widget.color : '#FFFFFF'; // Assuming default color is white if not found
  };
  
  const getWidgetBrightness = (widgetId) => {
    const widget = widgetsData.find(widget => widget._id === widgetId);
    return widget ? widget.brightness : 1; // Assuming default brightness is 1 if not found
  };
  

  const hexToHueSat = (hexColor) => {
    const { r, g, b } = hexToRgb(hexColor);
    const rPrime = r / 255;
    const gPrime = g / 255;
    const bPrime = b / 255;
    const cMax = Math.max(rPrime, gPrime, bPrime);
    const cMin = Math.min(rPrime, gPrime, bPrime);
    const delta = cMax - cMin;

    let hueValue;
    if (delta === 0) {
      hueValue = 0;
    } else if (cMax === rPrime) {
      hueValue = 60 * (((gPrime - bPrime) / delta) % 6);
    } else if (cMax === gPrime) {
      hueValue = 60 * (((bPrime - rPrime) / delta) + 2);
    } else {
      hueValue = 60 * (((rPrime - gPrime) / delta) + 4);
    }

    let saturationValue;
    if (cMax === 0) {
      saturationValue = 0;
    } else {
      saturationValue = delta / cMax;
    }

    return {
      hueValue: Math.round(hueValue * 182.04), // Convert hue value to Philips range (0-65535)
      saturationValue: Math.round(saturationValue * 255) // Convert saturation value to Philips range (0-255)
    };
  };

  const hexToRgb = (hexColor) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hexColor = hexColor.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return (
    <>
      <div className="content">
        <Row>
          {widgetsData.map(widget => (
            <Col md="4" key={widget._id}>
              <Card>
                <CardBody>
                  <h3>
                    {widget.name}
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
                  </h3>
                  {isVisible[widget._id] && (
                    <>
                      <div style={{ marginTop: '20px' }}>
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
                      </div>
                      <div style={{ marginTop: '20px' }}>
                        <div>Pick a color:</div>
                        <ColorPicker
                            initialColor={colorValues[widget._id]}
                            onChange={(color) => handleColorChange(widget._id, color)}
                            />
                      </div>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {alert.show &&
        <Alert severity={alert.type} style={{ marginTop: '20px', marginBottom: '20px' }}>
          {alert.message}
        </Alert>
      }
    </>
  );
}

export default Dashboard;
