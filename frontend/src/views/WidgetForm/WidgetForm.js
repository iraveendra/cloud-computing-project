import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Alert from '@mui/material/Alert';

export default function WidgetForm(props) {
    const [brands, setBrands] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        brand: ''
    });
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    useEffect(() => {
        fetch('http://localhost:3010/brands')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    setBrands(data.data);
                }
            })
            .catch(error => console.error('Error fetching brands:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:3010/widgets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 'success') {
                setAlert({ show: true, type: 'success', message: 'Widget successfully added!' });
            } else {
                setAlert({ show: true, type: 'error', message: data.message });
            }
        })
        .catch((error) => {
            setAlert({ show: true, type: 'error', message: 'An error occurred. Please try again.' });
        });
    };

    return (
        <div className="content">
            <Row>
                <Col lg="6">
                    <Card>
                        <CardBody>
                            <h3>Add Widget</h3>

                            {alert.show &&
                                <Alert severity={alert.type} style={{ marginTop: '20px', marginBottom: '20px' }}>
                                    {alert.message}
                                </Alert>
                            }

                            <form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="id">ID</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="id"
                                        id="id"
                                        placeholder="Enter Widget ID"
                                        value={formData.id}
                                        onChange={handleChange}
                                    />
                                    <Label for="name">Name</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Enter Widget Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    <Label for="description">Description</Label>
                                    <Input
                                        required
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Enter Widget Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                    <Label for="brand">Brand</Label>
                                    <Input required type="select" name="brand" id="brand" value={formData.brand} onChange={handleChange}>
                                        <option value="" disabled>Select Brand Name</option>
                                        {brands.map((brand) => (
                                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                                        ))}
                                    </Input>
        
                                </FormGroup>
                                <Button color="secondary" type="submit">Submit</Button>
                            </form>
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
