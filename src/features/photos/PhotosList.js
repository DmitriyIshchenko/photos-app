import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { fetchImagesAsync, selectAllPhotos } from './photosSlice';
import Modal from './Modal';
import SinglePhoto from './SinglePhoto';
import Spinner from './Spinner';

import "../../styles/PhotosList.css"
import "../../styles/Modal.css"

export default function PhotosList() {

    const dispatch = useDispatch();

    const photos = useSelector(selectAllPhotos);
    const status = useSelector(state => state.photos.status);

    const [showModal, setShowModal] = useState(false);
    const [targetPhoto, setTargetPhoto] = useState("");
    const handleShowModal = (e) => {
        const photoId = e.target.attributes.photoid.value;
        setTargetPhoto(photoId)
        setShowModal(true);
    }
    const handleHideModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchImagesAsync());
        }
    }, [status, dispatch])

    if (status === "loading") {
        return <Spinner />
    }

    const content = photos.map(item => {
        return <article className='img-container' key={item.id}  >
            <img src={item.url} alt="" photoid={item.id} onClick={(e) => handleShowModal(e)} />
        </article>
    })

    const modal = showModal ? (<Modal>
        <div className='modal' >
            <SinglePhoto photoId={+targetPhoto} handleHideModal={handleHideModal} /></div>
    </Modal>) : null;

    return <section className="list-container" >
        {modal}
        {content}</section>;
}
