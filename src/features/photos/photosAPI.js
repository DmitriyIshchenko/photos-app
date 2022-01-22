export const fetchImages = () => {
    const response = fetch("https://boiling-refuge-66454.herokuapp.com/images")
        .then(response => response.json()).then(data => data)
    return response;
}

export const fetchPhotoContent = (photoId) => {
    const response = fetch(`https://boiling-refuge-66454.herokuapp.com/images/${photoId}`)
        .then(response => response.json()).then(data => data);
    return response;
}

export const postComment = (data) => {
    const { photoId, name, comment } = data;
    const response = fetch(`https://boiling-refuge-66454.herokuapp.com/images/${photoId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({ name, comment })
    })
    return response;
}