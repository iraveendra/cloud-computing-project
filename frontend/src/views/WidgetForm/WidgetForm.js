import { Card, CardBody, Col, Row } from "reactstrap";

export default function WidgetForm(props) {

    return (
        <div className="content">
            <Row>
                <Col lg="6">
                    <Card>
                        <CardBody>
                            <h3>Form</h3>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}