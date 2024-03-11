import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap";
import Alert from '@mui/material/Alert';
import { dashboardBackendUrl } from "config";

export default function AppsCollections(props) {
    const [widgets, setWidgets] = useState([]); // State for storing widgets
    const [selectedWidgets, setSelectedWidgets] = useState([]); // State for storing selected widgets

        const [formData, setFormData] = useState({
            id: '',
            name: '',
            description: '',
            brand: ''
        });
        const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    
        
        useEffect(() => {
            fetch(`${dashboardBackendUrl}/widgets`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        setWidgets(data.data); // Store the fetched widgets
                    }
                })
                .catch(error => console.error('Error fetching widgets:', error));
        }, []);
    
        const handleCheckboxChange = (widgetId) => {
            const updatedSelection = selectedWidgets.includes(widgetId)
                ? selectedWidgets.filter(id => id !== widgetId) // Remove the id if it was already selected
                : [...selectedWidgets, widgetId]; // Add the id if it wasn't selected
            setSelectedWidgets(updatedSelection);
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
        
            // Check if no widgets are selected
            if (selectedWidgets.length === 0) {
                setAlert({ show: true, type: 'error', message: 'Please select at least one widget.' });
                return; // Stop the handleSubmit function here
            }

            // Prepare the request body including the selectedWidgets
            const payload = {
                ...formData,
                widgets: selectedWidgets, // Include the selected widget IDs
            };
        
            fetch(`${dashboardBackendUrl}/apps`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Convert the JavaScript object to a JSON string
            })
            .then(response => response.json())
            .then(data => {
                if(data.status === 'success') {
                    setAlert({ show: true, type: 'success', message: 'App successfully added!' });
                    // Optionally reset form and selection
                    setFormData({ name: '', description: '', brand: '' });
                    setSelectedWidgets([]);
                    setTimeout(() => {
                        setAlert({ show: false, type: '', message: '' });
                    }, 1500); // Hide the alert after 1.5 seconds
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
                                <h3>Add App</h3>
    
                                {alert.show &&
                                    <Alert severity={alert.type} style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {alert.message}
                                    </Alert>
                                }
    
                                <form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input
                                            required
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="Enter Name for App"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        <Label for="description">Description</Label>
                                        <Input
                                            required
                                            type="textarea"
                                            name="description"
                                            id="description"
                                            placeholder="Enter App Description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                        <Label for="widgets">Widgets</Label>
                                            {widgets.map((widget) => (
                                                <div key={widget._id} style={{ display: 'flex',margin: '8px',  marginLeft: '10px', flex: '1 0 50%', padding: '5px' }}>
                                                    <Input
                                                        type="checkbox"
                                                        name="widgets"
                                                        value={widget._id}
                                                        checked={selectedWidgets.includes(widget._id)}
                                                        onChange={() => handleCheckboxChange(widget._id)}
                                                    />{' '}
                                                    {widget.name}
                                                </div>
                                            ))}
            
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
    