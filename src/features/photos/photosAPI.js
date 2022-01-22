export const fetchImagesAsync = async () => {
    const response = await fetch("https://boiling-refuge-66454.herokuapp.com/images")
        .then(response => response.json()).then(data => data)
    return response;
}

export const fetchPhotoContentAsync = async (id) => {
    const response = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}`)
        .then(response => response.json()).then(data => data);
    return response;
}