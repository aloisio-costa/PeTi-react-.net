import { React, useEffect, useState } from 'react';
import { Form, Button, Image, Col, Row, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { fetchServiceRequest, updateServiceRequest, saveServiceRequestPhoto } from '../../actions/serviceRequests.action'
import { Formik } from "formik";
import * as yup from 'yup';
import LoadingSpinner from '../utils/loadingSpinner';

const schema = yup.object().shape({
    petType: yup.string().required().min(3),
    breed: yup.string().required().min(2),
    service: yup.string().required(),
    location: yup.string().required(),
    note: yup.string(),
});

const ServiceRequestsEdit = ({ match }) => {
    const history = useHistory();
    const [serviceRequest, setServiceRequest] = useState({
        petType: "",
        breed: "",
        service: "",
        location: "",
        note: "",
        photoFileName: ""
    });
    const [file, setFile] = useState();
    const [isPending, setIsPending] = useState(true);

    let imagesrc = process.env.REACT_APP_PETI_CORE_PHOTOS_URL;
    const [selectedImage, setSelectedImage] = useState();

    const onFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log("requests", serviceRequest);
        debugger

        setServiceRequest({ ...serviceRequest, [name]: value })
    }

    const imageHandleChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            const image = URL.createObjectURL(file)
            setServiceRequest({ ...serviceRequest, photoFileName: file.name })
            setSelectedImage(image)
            console.log("image", image)
            URL.revokeObjectURL(file)

            var formData = new FormData();
            formData.append(
                "myFile",
                file,
                file.name
            )

            setFile(formData);
            console.log("myFilesss ", formData.getAll("myFile"))

            debugger
        }
    }

    const getServiceRequest = async () => {
        const response = await fetchServiceRequest(match.params.id);
        debugger
        if (response) {
            setServiceRequest(response);
            setSelectedImage(imagesrc + response.photoFileName);
            console.log("selected", selectedImage)
            setIsPending(false);
        }
        console.log("lol", serviceRequest)
        debugger;
    }

    const editServiceRequest = async () => {
        debugger
        await updateServiceRequest(serviceRequest, match.params.id);
        await saveServiceRequestPhoto(file);
    }


    const onSubmitForm = () => {
        debugger
        editServiceRequest();
        history.push(`/serviceRequests`)
    }

    useEffect(() => {
        getServiceRequest();
        console.log("after useEffect: ", serviceRequest)
        debugger
    }, []);

    return (
        <div className="mt-3 col-md-6 offset-md-3">
            <h1 className="d-flex justify-content-center">
                <Badge bg="success">Edit Service Request</Badge>
            </h1>
            {isPending && <LoadingSpinner />}
            {!isPending &&
                <Formik
                    validationSchema={schema}
                    onSubmit={onSubmitForm}
                    initialValues={serviceRequest}
                //enableReinitialize
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (

                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Pet Type</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="petType"
                                        value={values.petType}
                                        onChange={e => {
                                            handleChange(e)
                                            onFieldChange(e)
                                            console.log("handling change", serviceRequest)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={!errors.petType}
                                        isInvalid={touched.petType && !!errors.petType}
                                    />
                                    <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback tooltip type="invalid">{errors.petType}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Breed</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="breed"
                                        value={values.breed}
                                        onChange={e => {
                                            handleChange(e)
                                            onFieldChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={!errors.breed}
                                        isInvalid={touched.breed && !!errors.breed}
                                    />
                                    <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback tooltip type="invalid">{errors.breed}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Service</Form.Label>
                                    <Form.Control as="select"
                                        name="service"
                                        value={values.service}
                                        onChange={e => {
                                            handleChange(e)
                                            onFieldChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={!errors.service}
                                        isInvalid={touched.service && !!errors.service}>

                                        <option value="">Select a Service...</option>
                                        <option value="Dog Walk">Dog Walk</option>
                                        <option value="Pet Day Care">Pet Day Care</option>
                                    </Form.Control>
                                    <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback tooltip type="invalid">{errors.service}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={values.location}
                                        onChange={e => {
                                            handleChange(e)
                                            onFieldChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={!errors.location}
                                        isInvalid={touched.location && !!errors.location}
                                    />
                                    <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback tooltip type="invalid">{errors.location}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Form.Group as={Col} md="12">
                                <Form.Label>Note</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    style={{ height: '100px' }}
                                    name="note"
                                    value={values.note}
                                    onChange={e => {
                                        handleChange(e)
                                        onFieldChange(e)
                                    }}

                                />
                            </Form.Group>

                            <div class="mb-3">
                                <Image width="200px" height="200px" id="preview" src={selectedImage} />
                                <input class="form-control"
                                    type="file"
                                    name="photoFileName"
                                    id="formFile"
                                    onChange={e => {
                                        handleChange(e)
                                        imageHandleChange(e)
                                    }} />
                            </div>
                            <Button disabled={!(isValid)} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik >
            }
        </div>
    );
}

export default ServiceRequestsEdit;