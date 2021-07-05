import { handleErrors, getErrorMessage } from '../Pages/utils/errorHandlers'

export function createServiceRequest(serviceRequest) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/serviceRequests`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceRequest)
    };

    return fetch(apiUrl, requestOptions)
        .then(handleErrors)
        .then((res) => res.json())
        .catch((error) => {
            debugger
            error = getErrorMessage(error);
            return error;
        });
}

export function fetchAllServiceRequests() {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/serviceRequests`
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return fetch(apiUrl, requestOptions)
        .then((res) => res.json())
        .catch((error) => { console.log('There was an error', error) });
}

export function fetchServiceRequest(id) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/serviceRequests/${id}`
    debugger
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return fetch(apiUrl, requestOptions)
        .then((res) => res.json())
        .catch((error) => { console.log('There was an error', error) });
}

export function updateServiceRequest(serviceRequest, id) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/serviceRequests/${id}`
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceRequest)
    };

    return fetch(apiUrl, requestOptions)
        .then((res) => res.json())
        .catch((error) => { console.log('There was an error', error) });
}

export function deleteServiceRequest(id) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/serviceRequests/${id}`;
    const requestOptions = {
        method: 'DELETE',
        //headers: { 'Content-Type': 'application/json' },
    };
    return fetch(apiUrl, requestOptions);
}

export function saveServiceRequestPhoto(formData) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/serviceRequests/SaveFile`
    const requestOptions = {
        method: 'POST',
        body: formData
    }
    console.log("na api: ", formData)
    debugger
    return fetch(apiUrl, requestOptions);
}
