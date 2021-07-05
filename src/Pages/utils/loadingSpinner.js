import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => {
    return (
        <Spinner style={{
            position: 'absolute', left: '45%', top: '50%', width: '100px', height: '100px', zIndex: '2'
        }} animation="border" variant="info" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}

export default LoadingSpinner
