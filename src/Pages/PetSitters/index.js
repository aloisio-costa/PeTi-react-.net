import { React, useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { fetchAllPetSitters } from '../../actions/petSitters.action'
import LoadingSpinner from '../utils/loadingSpinner';
import { StarRatingResult } from 'Pages/utils/starRating';
import '../../assets/css/stars.css';
import '../../assets/css/cardEffect.css';

const PetSitters = () => {
    const history = useHistory();
    const [petSitters, setPetSitters] = useState([]);

    const reviewAverage = (petSitter) => {
        let reviewsSum = 0;
        for (let i = 0; i < petSitter.reviews.length; i++) {
            reviewsSum += petSitter.reviews[i].rating;
        }

        return Math.ceil(reviewsSum / petSitter.reviews.length);
    }

    const fetchPetSitters = async () => {
        debugger
        const response = await fetchAllPetSitters();
        debugger
        setPetSitters(response);
    }

    useEffect(() => {
        fetchPetSitters();
    }, []);

    if (petSitters) {
        const petSitterList = petSitters.map((petSitter) => {
            return (
                <Card key={petSitter.id} className="cardEffect mb-4 rounded" style={{ width: '100%' }}>
                    <Row>
                        <Col md={5} lg={5}  >
                            <Card.Img style={{ width: '100%' }, { height: '355px' }} className="rounded" fluid variant="top"
                                src={process.env.REACT_APP_PETI_CORE_PHOTOS_URL + petSitter.photoFileName} />
                        </Col>
                        <Col md={7} lg={7}>
                            <Card.Body>
                                <Card.Title>{petSitter.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">by: {petSitter.user}</Card.Subtitle>
                                <Card.Text>{petSitter.description}</Card.Text>
                                <Card.Text>{petSitter.location}</Card.Text>
                                <Card.Text>From ${petSitter.price}/Walk</Card.Text>
                                {petSitter.reviews.length > 0 &&
                                    <Row>
                                        <Col md={4} lg={4}>
                                            <StarRatingResult ratingResult={reviewAverage(petSitter)} />
                                        </Col>
                                        <Col>
                                            <p class="justify-content-start text-muted">{petSitter.reviews.length} Reviews </p>
                                        </Col>
                                    </Row>
                                }
                            </Card.Body>
                            <Card.Body>
                                <Button onClick={() => history.push(`/petSitters/${petSitter.id}`)} variant="info">View Profile</Button>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            );
        })

        return (
            <div className="mt-4">
                <Col md={9} lg={9}>
                    {petSitterList}
                </Col>
            </div>
        )

    } else {
        return (
            <div>
                <LoadingSpinner />
            </div>
        )
    }
};

export default PetSitters;