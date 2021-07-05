import { React, useState, useEffect } from 'react';
//import './dropdownDots.css';
import '../../assets/css/dropdownDots.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingSpinner from '../utils/loadingSpinner';
import '../../assets/css/cardEffect.css';

import { Card, Row, Col, Button, Dropdown } from 'react-bootstrap';
import { fetchAllServiceRequests, deleteServiceRequest } from '../../actions/serviceRequests.action'


const ServiceRequests = () => {
    const [serviceRequests, setServiceRequests] = useState([]);


    const fetchServiceRequests = async () => {
        const response = await fetchAllServiceRequests();
        debugger
        setServiceRequests(response);
    }

    const DeleteServiceRequest = async (id) => {
        await deleteServiceRequest(id)
        fetchServiceRequests();
    }
    const handleDeleteServiceRequest = (event, id) => {
        DeleteServiceRequest(id);
    }

    useEffect(() => {
        debugger
        fetchServiceRequests();
    }, []);

    // const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    //     <a
    //         href=""
    //         ref={ref}
    //         onClick={e => {
    //             e.preventDefault();
    //             onClick(e);
    //         }}
    //     >
    //         {children}
    //         <span className="threedots" />
    //     </a>
    // ));

    if (serviceRequests) {
        const serviceRequestsList = serviceRequests.map((serviceRequest) => {
            return (
                <Card className="cardEffect shadow p-3 mb-4 rounded">
                    <Card.Header as="h5" className="d-flex justify-content-between">{serviceRequest.service}
                        <Dropdown>
                            <Dropdown.Toggle variant="" />
                            <Dropdown.Menu size="sm" title="">
                                <Dropdown.Item href={`serviceRequests/${serviceRequest.id}/edit`} >Edit</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Header>

                    <Card.Body>
                        <Card.Title >{serviceRequest.petType} - {serviceRequest.breed}</Card.Title>

                        {/* <Dropdown >
                            <Dropdown.Toggle as={CustomToggle}>
                            </Dropdown.Toggle>
                            <Dropdown.Menu size="sm" title="">
                                <Dropdown.Header>Options</Dropdown.Header>
                                <Dropdown.Item href={`petSitters/${serviceRequest.id}/edit`} >testing</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        <Row className='no-gutters'>
                            <Col md={5} lg={1}  >
                                <Card.Img style={{ width: '10%' }, { height: '5rem' }} className="rounded" className="rounded-circle" variant="top" src={process.env.REACT_APP_PETI_CORE_PHOTOS_URL + serviceRequest.photoFileName} />
                            </Col>
                            <Col>
                                <Card.Text>
                                    {serviceRequest.note}
                                </Card.Text>
                            </Col>
                        </Row>
                        <Card.Text className="mb-2 text-muted">
                            {serviceRequest.location}
                        </Card.Text>
                        <Card.Footer className="mb-2 d-flex justify-content-between">
                            <Card.Link href="petSitters" class="link-info">Find Pet Lovers</Card.Link>
                            <Button onClick={(event) => handleDeleteServiceRequest(event, serviceRequest.id)} type="submit" variant="danger">Delete</Button>
                        </Card.Footer>
                    </Card.Body>
                </Card >
            )
        })

        return (
            <div className="mt-5">
                <div className="mb-2 d-flex justify-content-between">
                    <h5>MY REQUESTS</h5>
                    <Button href="/serviceRequests/new" variant="info">MAKE REQUEST</Button>
                </div>
                {serviceRequestsList}


            </div>
        )

    } else {
        return (
            <div>
                <LoadingSpinner />
            </div>
        )
    }

}

export default ServiceRequests;