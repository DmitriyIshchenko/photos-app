export const fetchImagesAsync = async () => {
    const response = await fetch("https://boiling-refuge-66454.herokuapp.com/images")
        .then(response => response.json()).then(data => data)
    return response;
}
