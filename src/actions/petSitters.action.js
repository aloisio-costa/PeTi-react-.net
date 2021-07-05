import { handleErrors, getErrorMessage } from '../Pages/utils/errorHandlers'

export function fetchAllPetSitters() {
    //const apiUrl = `https://localhost:44396/api/petSitters`
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/petSitters`
    debugger
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return fetch(apiUrl, requestOptions)
        .then(handleErrors)
        .then((res) => res.json())
        .catch((error) => {
            debugger
            error = getErrorMessage(error);
            return error;
        });
    //.catch((error) => { console.log('There was an error:', error) });
}

export function fetchPetSitter(id) {
    debugger
    //const apiUrl = `https://localhost:44396/api/petSitters/${id}`
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/petSitters/${id}`
    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    debugger

    return fetch(apiUrl, requestOptions)
        .then((res) => res.json())
        .catch((error) => { console.log('There was an error', error) });
}

export function createPetSitter(petSitter) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/petSitters`
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petSitter)
    };

    return fetch(apiUrl, requestOptions);
}

export function updatePetSitter(petSitter, id) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/petSitters/${id}`
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(petSitter)
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

export function savePetSitterPhoto(formData) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/petSitters/SaveFile`
    const requestOptions = {
        method: 'POST',
        body: formData
    }

    return fetch(apiUrl, requestOptions);
}
