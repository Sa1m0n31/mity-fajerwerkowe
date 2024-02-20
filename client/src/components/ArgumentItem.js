import React, {useState} from 'react';
import Modal from "./Modal";
import ArgumentBadge from "./ArgumentBadge";

const ArgumentItem = ({name, image, flag, ytLink, counterargument}) => {
    const { title, full, extract } = counterargument;

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    return <div className={'arguments__item shadow'}>
        {modalVisible ? <Modal closeModal={() => { setModalVisible(false); }}
                               name={name}
                               title={title}
                               image={image}
                               flag={flag}
                               full={full}
                               ytLink={ytLink} /> : ''}

        <ArgumentBadge type={flag} />

        <figure className={'arguments__item__img'}>
            <img className={'img'} src={image} alt={name} />
        </figure>

        <h4 className={'arguments__item__title'}>
            {name}
        </h4>

        <p className={'arguments__item__extract'}>
            {extract}
        </p>

        <button className={'btn btn--arguments'}
                onClick={openModal}>
            Czytaj więcej
        </button>
    </div>
};

export default ArgumentItem;
