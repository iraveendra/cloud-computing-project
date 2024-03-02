import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";
import DashboardCard from "components/DashboardCard/DashboardCard";

function Dashboard(props) {

  const value ={
    "Name": "Widget-1",
    "status": true,
    "Brand": "Philips",
    "Brightness": 10
  }
  const widgetData = [
    {
      "Name": "Widget-1",
      "status": true,
      "Brand": "Philips",
      "Brightness": 10
    },
    {
      "Name": "Widget-2",
      "status": true,
      "Brand": "Philips",
      "Brightness": 90
    },
    {
      "Name": "Widget-3",
      "status": false,
      "Brand": "Philips",
      "Brightness": 30
    },
    {
      "Name": "Widget-4",
      "status": false,
      "Brand": "Philips",
      "Brightness": 50
    }
  ]

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4" key={1}>
            <DashboardCard
              key={1}
              name={value["Name"]}
              status={value["status"]}
              brightness={value["Brightness"]}
            />
          </Col>
          {/* {
            widgetData.map((value, index) => {
              return (
                <Col lg="4" key={index}>
                  <DashboardCard
                    key={index}
                    name={value["Name"]}
                    status={value["status"]}
                    brightness={value["Brightness"]}
                  />
                </Col>
              )
            })
          } */}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
