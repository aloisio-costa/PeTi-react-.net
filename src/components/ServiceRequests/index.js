import { React, useState, useEffect } from "react";
import "../../assets/css/dropdownDots.css";
import LoadingSpinner from "../utils/loadingSpinner";
import "../../assets/css/indexCard.css";
import ErrorAlert from "../utils/errorAlert";
import { Card, Row, Col, Button, Dropdown } from "react-bootstrap";
import {
  fetchServiceRequests,
  deleteServiceRequest,
} from "../../actions/serviceRequests.action";
import { connect } from "react-redux";
import DisplayData from "../../assets/Display/serviceRequests";
import defaultServiceRequestImage from "../../assets/Images/defaultServiceRequest.jpg";

const ServiceRequests = ({ currentUserId }) => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserServiceRequests = async () => {
    if (process.env.REACT_APP_DISPLAY_MODE) {
      console.log("inside");
      setServiceRequests(DisplayData.ServiceRequests);
      setLoading(false);
      setError(null);
    } else {
      const response = await fetchServiceRequests(currentUserId).catch((e) => {
        setError(e.error);
        setLoading(false);
      });

      if (response.data && !response.error) {
        debugger;
        setServiceRequests([...DisplayData.ServiceRequests, ...response.data]);
        setLoading(false);
        setError(null);
      }
    }
  };

  const handleDeleteServiceRequest = async (id) => {
    deleteServiceRequest(id);
    fetchUserServiceRequests();
  };

  useEffect(() => {
    fetchUserServiceRequests();
  }, []);

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between">
        <h5>MY REQUESTS</h5>
        <Button href="/serviceRequests/new" variant="info">
          MAKE REQUEST
        </Button>
      </div>
      {error && !loading && (
        <div>
          <ErrorAlert error={error} />
        </div>
      )}
      {!error && loading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!error && !loading && serviceRequests && (
        <div>
          {serviceRequests.map((serviceRequest) => {
            return (
              <div key={serviceRequest.id}>
                <Card className="cardEffect shadow p-3 mb-4 rounded">
                  <Card.Header
                    as="h5"
                    className="d-flex justify-content-between"
                  >
                    {serviceRequest.service}
                    <Dropdown>
                      <Dropdown.Toggle variant="Info" />
                      <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item
                          href={`serviceRequests/${serviceRequest.id}/edit`}
                        >
                          Edit
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-center">
                      {serviceRequest.petType} - {serviceRequest.breed}
                    </Card.Title>

                    <Row className="no-gutters">
                      <Col lg={{ span: 1, offset: 2 }}>
                        <Card.Img
                          style={({ width: "10%" }, { height: "5rem" })}
                          className="rounded"
                          className="rounded-circle"
                          variant="top"
                          src={
                            process.env.REACT_APP_DISPLAY_MODE
                              ? defaultServiceRequestImage
                              : process.env.REACT_APP_PETI_CORE_PHOTOS_URL +
                                serviceRequest.photoFileName
                          }
                        />
                      </Col>
                      <Col md={6}>
                        <Card.Text className="d-flex justify-content-center">
                          {serviceRequest.note}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Col md={{ span: 6, offset: 2 }}>
                      <Card.Text className="mb-2 text-muted">
                        {serviceRequest.location}
                      </Card.Text>
                    </Col>

                    <Card.Footer className="mb-2 d-flex justify-content-between">
                      <Card.Link href="petSitters" className="link-info">
                        Find Pet Lovers
                      </Card.Link>
                      <Button
                        onClick={() =>
                          handleDeleteServiceRequest(serviceRequest.id)
                        }
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { currentUserId: state.auth.userId };
};

export default connect(mapStateToProps)(ServiceRequests);
