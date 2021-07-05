export function createReview(reviewBody) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/reviews`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewBody)
    };
    return fetch(apiUrl, requestOptions);
}

export function deleteReview(id) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/reviews/${id}`;
    const requestOptions = {
        method: 'DELETE',
        //headers: { 'Content-Type': 'application/json' },
    };
    return fetch(apiUrl, requestOptions)
}

export function fetchPetSitterReviews(id) {
    const apiUrl = `${process.env.REACT_APP_PETI_CORE_API_URL
        }/reviews/${id}`
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

