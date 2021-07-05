import { Formik } from "formik";
import { React, useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Button, Row, Col, Form } from 'react-bootstrap'
import { StarRating, StarRatingResult } from 'Pages/utils/starRating';
import { useHistory } from 'react-router';
import * as yup from 'yup';

const schema = yup.object().shape({
        rating: yup.number().required().min(1).max(5),
        title: yup.string().required().max(75),
        body: yup.string().required().min(5).max(2000),
});

const Tests = () => {
        const history = useHistory();
        const [petSitter, setPetSitter] = useState();
        const [review, setReview] = useState({
                title: "",
                body: "",
                rating: "",
                petSitterId: ""
        });

        const onFieldChange = (event) => {
                const target = event.target;
                const value = target.value;
                const name = target.name;
                debugger
                setReview({ ...review, [name]: value })
                debugger
        }
        return (
                <div>
                        <Formik
                                validationSchema={schema}
                                initialValues={review}

                                onSubmit={(values, { validate }) => {
                                        validate(values);
                                }}
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
                                                <div>
                                                        <h2>Leave a Review</h2>
                                                </div>
                                                <Row className="mb-0">
                                                        <Form.Group as={Col} md="12">
                                                                <Form.Control
                                                                        as={StarRating}
                                                                        // type="text"
                                                                        name="rating"
                                                                        value={values.rating}
                                                                        onChange={e => {
                                                                                handleChange(e)
                                                                                onFieldChange(e)
                                                                        }}
                                                                        isValid={touched.rating && !errors.rating}
                                                                        isInvalid={touched.rating && !!errors.rating}
                                                                />
                                                                <Form.Control.Feedback tooltip type="invalid">{errors.rating}</Form.Control.Feedback>
                                                        </Form.Group>
                                                </Row>
                                                <Row className="mb-0">
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
                                                                        isValid={touched.title && !errors.title}
                                                                        isInvalid={touched.title && !!errors.title}
                                                                />
                                                                <Form.Control.Feedback tooltip type="invalid">{errors.title}</Form.Control.Feedback>
                                                        </Form.Group>
                                                </Row>

                                                <Row className="mb-0">
                                                        <Form.Group as={Col} md="12">
                                                                <Form.Label>Review</Form.Label>
                                                                <Form.Control
                                                                        as="textarea"
                                                                        style={{ height: '100px' }}
                                                                        name="body"
                                                                        value={values.body}
                                                                        placeholder="What's your feedback..."
                                                                        onChange={e => {
                                                                                handleChange(e)
                                                                                onFieldChange(e)
                                                                        }}
                                                                        isValid={touched.body && !errors.body}
                                                                        isInvalid={touched.body && !!errors.body}
                                                                />
                                                        </Form.Group>
                                                </Row>
                                                <Button variant="success" type="submit">
                                                        Submit
                                                </Button>
                                        </Form>
                                )}
                        </Formik >
                </div>
        )
}

export default Tests;
        // <Formik

        //     validationSchema={schema}
        //     onSubmit={onSubmit}
        //     initialValues={{
        //         firstName: '',
        //         lastName: '',
        //         username: '',
        //         city: '',
        //         state: '',
        //         zip: '',
        //         terms: false,
        //     }}
        // >
        //     {({
        //         handleSubmit,
        //         handleChange,
        //         handleBlur,
        //         values,
        //         touched,
        //         isValid,
        //         errors,
        //         dirty
        //     }) => (

        //         <Form noValidate onSubmit={handleSubmit}>

        //             <Row className="mb-3">
        //                 <Form.Group as={Col} md="4" controlId="validationFormik01">
        //                     <Form.Label>First name</Form.Label>
        //                     <Form.Control
        //                         type="text"
        //                         name="firstName"
        //                         value={values.firstName}
        //                         onChange={handleChange}
        //                         isValid={touched.firstName && !errors.firstName}
        //                         isInvalid={!!errors.firstName}
        //                     />
        //                     <Form.Control.Feedback>looks good!</Form.Control.Feedback>
        //                     <Form.Control.Feedback tooltip type="invalid">{errors.firstName}</Form.Control.Feedback>

        //                 </Form.Group>
        //                 <Form.Group as={Col} md="4" controlId="validationFormik02">
        //                     <Form.Label>Last name</Form.Label>
        //                     <Form.Control
        //                         type="text"
        //                         name="lastName"
        //                         value={values.lastName}
        //                         onChange={handleChange}
        //                         isValid={touched.lastName && !errors.lastName}
        //                         isInvalid={!!errors.lastName}
        //                     />
        //                     <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        //                 </Form.Group>
        //                 <Form.Group as={Col} md="4" controlId="validationFormikUsername">
        //                     <Form.Label>Username</Form.Label>
        //                     <InputGroup hasValidation>
        //                         <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
        //                         <Form.Control
        //                             type="text"
        //                             placeholder="Username"
        //                             aria-describedby="inputGroupPrepend"
        //                             name="username"
        //                             value={values.username}
        //                             onChange={handleChange}
        //                             isInvalid={!!errors.username}
        //                         />
        //                         <Form.Control.Feedback type="invalid">
        //                             {errors.username}
        //                         </Form.Control.Feedback>
        //                     </InputGroup>
        //                 </Form.Group>
        //             </Row>
        //             <Row className="mb-3">
        //                 <Form.Group as={Col} md="6" controlId="validationFormik03">
        //                     <Form.Label>City</Form.Label>
        //                     <Form.Control
        //                         type="text"
        //                         placeholder="City"
        //                         name="city"
        //                         value={values.city}
        //                         onChange={handleChange}
        //                     />

        //                     <Form.Control.Feedback>
        //                         lol
        //                     </Form.Control.Feedback>
        //                 </Form.Group>
        //                 <Form.Group as={Col} md="3" controlId="validationFormik04">
        //                     <Form.Label>State</Form.Label>
        //                     <Form.Control
        //                         type="text"
        //                         placeholder="State"
        //                         name="state"
        //                         value={values.state}
        //                         onChange={handleChange}
        //                         isInvalid={!!errors.state}
        //                     />
        //                     <Form.Control.Feedback type="invalid">
        //                         {errors.state}
        //                     </Form.Control.Feedback>
        //                 </Form.Group>
        //                 <Form.Group as={Col} md="3" controlId="validationFormik05">
        //                     <Form.Label>Zip</Form.Label>
        //                     <Form.Control
        //                         type="text"
        //                         placeholder="Zip"
        //                         name="zip"
        //                         value={values.zip}
        //                         onChange={handleChange}
        //                         isInvalid={!!errors.zip}
        //                     />

        //                     <Form.Control.Feedback type="invalid">
        //                         {errors.zip}
        //                     </Form.Control.Feedback>
        //                 </Form.Group>
        //             </Row>
        //             <Form.Group className="mb-3">
        //                 <Form.Check
        //                     required
        //                     name="terms"
        //                     label="Agree to terms and conditions"
        //                     onChange={handleChange}
        //                     isInvalid={!!errors.terms}
        //                     feedback={errors.terms}
        //                     id="validationFormik0"
        //                 />
        //             </Form.Group>
        //             <Button disabled={!(isValid && dirty)} type="submit">Submit form</Button>
        //         </Form>
        //     )}
        // </Formik>
//     );
// }

