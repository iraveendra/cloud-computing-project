import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";

export default function WidgetForm(props) {

    return (
        <div className="content">
            <Row>
                <Col lg="6">
                    <Card>
                        <CardBody>
                            <h3>Form</h3>
                            <form>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="name"
                                        name="name"
                                        id="name"
                                        placeholder="Enter name"
                                    />
                                    <Label for="description">Description</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Enter description"
                                    />
                                    <Label for="description">Brand</Label>
                                    <Input
                                        type="brand"
                                        name="brand"
                                        id="brand"
                                        placeholder="Enter brand"
                                    />
                                    <Button color="secondary" type="submit">
                                        submit
                                    </Button>
                                </FormGroup>

                            </form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}