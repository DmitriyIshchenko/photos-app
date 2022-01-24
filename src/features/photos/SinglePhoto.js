import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotoContentAsync, postCommentAsync, selectPhotoById } from './photosSlice';

import Spinner from "./Spinner.js"

const formatDate = timestamp => {
    const date = new Date(timestamp);
    const formated = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    return formated.map(item => item < 10 ? "0" + item : item).join(".")
}

export default function SinglePhoto({ photoId, handleHideModal }) {

    const dispatch = useDispatch();

    const photo = useSelector((state) => selectPhotoById(state, photoId));
    const status = useSelector((state) => state.photos.singlePhotoStatus);

    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const onSubmitCommentClicked = () => {
        if (name && comment) {
            dispatch(postCommentAsync({ photoId, name, comment }))
        }
        setName("");
        setComment("");
    }

    useEffect(() => {
        if (photo && !photo.urlBig) {
            dispatch(fetchPhotoContentAsync(photoId));
        }
        document.body.style.overflow = 'hidden';
        return function cleanup() {
            document.body.style.overflow = '';
        }
    }, [dispatch, photo, photoId])

    if (!photo) {
        return <section>error</section>
    }
    return (
        <section className='single-photo-container'>

            <div className="close" onClick={handleHideModal}>
            </div>

            <article className='big-img-container'>
                {status === "loading" ? <Spinner /> : <img src={photo.urlBig} alt="" />}
            </article>

            <article className='comments-list'>
                <ul>
                    {photo.comments && photo.comments.map(item => {
                        return (<li key={item.id} className='comment-container'>
                            <p className='comment-date'>{formatDate(item.date)}</p>
                            <p className='comment-text'>{item.text}</p>
                        </li>)
                    })}
                </ul>
            </article>

            <article className='leave-comment-container'>
                <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Ваш комментарий" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className="btn-leave-comment" onClick={onSubmitCommentClicked}>Оставить комментарий</button>
            </article>

        </section >
    )
}

