import { Button, Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, Row, UncontrolledDropdown } from "reactstrap";

export default function AppsCollections(props) {

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
                                    <Label for="description">widgets</Label>
                                    <Input
                                        type="widgets"
                                        name="widgets"
                                        id="widgets"
                                        placeholder="Select Widgets"
                                    />
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret data-toggle="dropdown">
                                            Dropdown button
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Action</DropdownItem>
                                            <DropdownItem>Another Action</DropdownItem>
                                            <DropdownItem>Something else here</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                    <Button color="secondary" type="submit">
                                        Submit
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