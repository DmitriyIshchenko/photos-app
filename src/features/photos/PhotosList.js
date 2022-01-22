import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchImages, selectAllPhotos } from './photosSlice';
import { Link } from 'react-router-dom';

export default function PhotosList() {

    const dispatch = useDispatch();

    const photos = useSelector(selectAllPhotos);
    const status = useSelector(state => state.photos.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchImages());
        }
    }, [status, dispatch])

    const content = photos.map(item => {
        return <article key={item.id}>
            <Link to={`/${item.id}`}>
                <img src={item.url} alt='photo' />
            </Link>
        </article>
    })
    return <section>{content}</section>;
}
