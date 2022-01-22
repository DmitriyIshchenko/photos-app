import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function SinglePhoto() {

    const photoId = +useParams().photoId;

    const photos = useSelector(state => state.photos.items);
    const content = photos.find(item => item.id === photoId);
    return <div><img src={content.url} /></div>;
}
