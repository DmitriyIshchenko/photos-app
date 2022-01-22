import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPhotoContent, selectPhotoById } from './photosSlice';

const formatDate = timestamp => {
    const date = new Date(timestamp);
    const formated = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    return formated.map(item => item < 10 ? "0" + item : item).join(".")
}

export default function SinglePhoto() {

    const dispatch = useDispatch();

    const photoId = +useParams().photoId;
    const photo = useSelector((state) => selectPhotoById(state, photoId));
    const status = useSelector((state) => state.photos.status);

    useEffect(() => {
        if (photo && !photo.urlBig) {
            dispatch(fetchPhotoContent(photoId));
        }
    }, [])

    if (!photo) {
        return <section>error</section>
    }
    if (status === "loading") {
        return (<section><h2>loading...</h2></section>)
    } else if (status === "succeeded") {
        return (
            <section>
                <article>
                    <img src={photo.urlBig} alt="big photo" />
                </article>
                <article>
                    <input type="text" />
                    <input type="text" />
                    <button>Оставить комментарий</button>
                </article>
                <article>
                    <ul>
                        {photo.comments && photo.comments.map(item => {
                            return (<li key={item.id}>
                                <p>{formatDate(item.date)}</p>
                                <p>{item.text}</p>
                            </li>)
                        })}
                    </ul>
                </article>
            </section>
        )
    }
}
