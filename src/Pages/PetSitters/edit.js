import { React, useEffect, useState } from 'react';
import { Form, Button, Image, Col, Row, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { fetchPetSitter, updatePetSitter, savePetSitterPhoto } from '../../actions/petSitters.action'
import { Formik } from "formik";
import * as yup from 'yup';
import LoadingSpinner from '../utils/loadingSpinner';

const schema = yup.object().shape({
    title: yup.string().required().max(75),
    description: yup.string().required().min(5),
    location: yup.string().required(),
    price: yup.number().required().min(1),
});

const PetSitterEdit = ({ match }) => {

    const [petSitter, setPetSitter] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        photoFileName: "defaultPetSitter.png",
    });
    const [file, setFile] = useState();
    const [isPending, setIsPending] = useState(true);
    const history = useHistory();

    let imagesrc = process.env.REACT_APP_PETI_CORE_PHOTOS_URL;
    const [selectedImage, setSelectedImage] = useState();

    const onFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log("requests", petSitter);
        debugger

        setPetSitter({ ...petSitter, [name]: value })
    }

    const imageHandleChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            const image = URL.createObjectURL(file)
            setPetSitter({ ...petSitter, photoFileName: file.name })
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

    // const getServiceRequest = async () => {
    //     const response = await fetchServiceRequest(match.params.id);
    //     debugger
    //     if (response) {
    //         setPetSitter(response);
    //         setSelectedImage(response.photoFileName);
    //         console.log("selected", selectedImage)
    //         setIsPending(false);
    //     }
    //     console.log("lol", petSitter)
    //     debugger;
    // }
    const getPettSitter = async () => {
        debugger
        await fetchPetSitter(match.params.id)
            .then(data => {
                debugger
                if (data) {
                    setPetSitter(data);
                    setSelectedImage(imagesrc + data.photoFileName);
                    setIsPending(false);
                }
            })
        debugger;
    }

    useEffect(() => {
        getPettSitter();
        console.log("after useEffect: ", petSitter)
        debugger
    }, []);

    const editPetSitter = async () => {
        await updatePetSitter(petSitter, match.params.id);
        await savePetSitterPhoto(file);
        debugger
    }

    const onSubmitForm = () => {
        editPetSitter();
        history.push(`/petSitters/${petSitter.id}`)
        debugger
    }


    return (
        <div className="mt-3 col-md-6 offset-md-3">
            <h1 className="d-flex justify-content-center">
                <Badge bg="success">Edit Pet Sitter</Badge>
            </h1>
            {isPending && <LoadingSpinner />}
            {!isPending &&
                <Formik
                    validationSchema={schema}
                    onSubmit={onSubmitForm}
                    initialValues={petSitter}
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
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={e => {
                                            handleChange(e)
                                            onFieldChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={!errors.title}
                                        isInvalid={touched.title && !!errors.title}
                                    />
                                    <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback tooltip type="invalid">{errors.title}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: '100px' }}
                                        name="description"
                                        value={values.description}
                                        onChange={e => {
                                            handleChange(e)
                                            onFieldChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={!errors.description}
                                        isInvalid={touched.description && !!errors.description}
                                    />
                                    <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback tooltip type="invalid">{errors.description}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={values.price}
                                        onChange={e => {
                                            handleChange(e)
                                            onFieldChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={!errors.price}
                                        isInvalid={touched.price && !!errors.price}
                                    />
                                    <Form.Control.Feedback tooltip>looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback tooltip type="invalid">{errors.price}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>

                            <Row className="mb-4">
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

                            <Row class="mb-3">
                                <div>
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

                            </Row>
                            <Button className="mt-2" disabled={!(isValid)} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik >
            }
        </div>
    );
}

export default PetSitterEdit;