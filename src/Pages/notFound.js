import { Link } from "react-router-dom"
import { Alert } from "react-bootstrap";

const NotFound = () => {
    return (
        <Alert className="mt-3" variant="danger">
            <Alert.Heading>Page not Found Error</Alert.Heading>
            <p>
                Sorry we could not find this page
            </p>
            <hr />
            <p className="mb-0">
                <Link to="/">Back to Home Page</Link>
            </p>
        </Alert>
    )
}

export default NotFound;