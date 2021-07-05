import { React, useState } from 'react';
import { Form, Button, Image, Col, Row, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { createServiceRequest, saveServiceRequestPhoto } from '../../actions/serviceRequests.action';
import { useForm } from 'react-hook-form';
import { Formik } from "formik";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import defaultImage from '../../assets/Images/defaultServiceRequest.jpg';

const schema = yup.object().shape({
    petType: yup.string().required().min(3),
    breed: yup.string().required().min(2),
    service: yup.string().required(),
    location: yup.string().required(),
    note: yup.string(),
});

const ServiceRequestsNew = () => {
    const history = useHistory();
    const [serviceRequest, setServiceRequest] = useState({
        petType: "",
        breed: "",
        service: "",
        location: "",
        note: "",
        photoFileName: "defaultServiceRequest.jpg",
    });
    const [file, setFile] = useState();

    let imagesrc = process.env.REACT_APP_PETI_CORE_PHOTOS_URL + serviceRequest.photoFileName;
    const [selectedImage, setSelectedImage] = useState(defaultImage);

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

    const newServiceRequest = async () => {
        await createServiceRequest(serviceRequest);
        debugger
        console.log("myFil ", file.getAll("myFile"))
        await saveServiceRequestPhoto(file);
        debugger
    }

    const onSubmitForm = () => {
        debugger
        console.log(serviceRequest);
        newServiceRequest();
        debugger
        history.push("/serviceRequests")
    }

    return (
        <div className="mt-3 col-md-6 offset-md-3">
            <h1 className="d-flex justify-content-center">
                <Badge bg="success">New Service Request</Badge>
            </h1>
            <Formik
                validationSchema={schema}
                onSubmit={onSubmitForm}
                initialValues={serviceRequest}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    dirty
                }) => (

                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" >
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
                                    isValid={touched.petType && !errors.petType}
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
                                    isValid={touched.breed && !errors.breed}
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
                                    isValid={touched.service && !errors.service}
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
                                    isValid={touched.location && !errors.location}
                                    isInvalid={touched.location && !!errors.location}
                                />
                                <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback tooltip type="invalid">{errors.location}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="12">
                                <Form.Label>Note</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="note"
                                    value={values.note}
                                    onChange={e => {
                                        handleChange(e)
                                        onFieldChange(e)
                                    }}
                                    onBlur={handleBlur}
                                />
                            </Form.Group>
                        </Row>

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
                        <Button disabled={!(isValid && dirty)} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik >
        </div>
    );
}

export default ServiceRequestsNew;