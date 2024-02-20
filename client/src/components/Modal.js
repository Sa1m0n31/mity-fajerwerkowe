import React from 'react';
import useCloseModalOnOutsideClick from "../hooks/useCloseModalOnOutsideClick";
import useActionOnEscapePress from "../hooks/useActionOnEscapePress";

const Modal = ({closeModal, flag, image, title, name, full, ytLink}) => {
    useCloseModalOnOutsideClick(closeModal);
    useActionOnEscapePress(closeModal);

    return <div className={'modal'}>
        <button className={'btn--close'}
                onClick={closeModal}>
            &times;
        </button>

        <div className={'modal__inner scroll'}>
            <h2 className={'modal__inner__header'}>
                {name}
            </h2>

            <div className={'modal__inner__media flex'}>
                <figure className={'modal__inner__media__img'}>
                    <img className={'img'} src={image} alt={'image'} />
                </figure>
                <div className={'video-container'}>
                    <iframe className={'modal__inner__iframe'}
                            src={ytLink}></iframe>
                </div>
            </div>

            <h3 className={'modal__inner__contentHeader'}>
                {title}
            </h3>
            <div className={'modal__inner__content'}
                 dangerouslySetInnerHTML={{
                     __html: full
                 }}>

            </div>
        </div>
    </div>
};

export default Modal;
