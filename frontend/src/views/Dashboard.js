import React, { useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Switch from "react-switch";
import ColorPicker from "components/ColorPicker";

function Dashboard() {
  const [isVisible, setIsVisible] = useState({ card1: false, card2: false, card3: false });

  const toggleVisibility = (card) => {
    setIsVisible((prevState) => ({
      ...prevState,
      [card]: !prevState[card],
    }));
  };

  const cardData = {
    card1: {
      header: "Philips Light 1",                        //Coming from Web backend APIs 
      content: "Description for Philips Light 1.",      //Coming from Web backend APIs 
      color: { r: '241', g: '112', b: '19', a: '1' },  //Coming from device APIs
    },
    card2: {
      header: "Lyfx Light 1",
      content: "Description for Lyfx Light 1.",
      color: { r: '34', g: '167', b: '240', a: '1' },
    },
    card3: {
      header: "Philips Light 2",
      content: "Description for Philips Light 2.",
      color: { r: '46', g: '204', b: '113', a: '1' },
    },
  };
  

  return (
    <>
      <div className="content">
        <Row>
          {Object.entries(cardData).map(([cardKey, { header, content, color }], idx) => (
            <Col md="4" key={cardKey}>
              <Card>
                <CardBody>
                  <h3>
                    {header}
                    <span style={{ float: 'right' }}>
                      <Switch
                        checked={isVisible[cardKey]}
                        onChange={() => toggleVisibility(cardKey)}
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
                  {isVisible[cardKey] && (
                    <>
                      <p>{content}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div>Pick a color:</div>
                        <ColorPicker initialColor={color} />
                      </div>

                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
