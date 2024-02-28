import React, {useContext, useEffect, useState} from 'react';
import Modal from "./Modal";
import ArgumentBadge from "./ArgumentBadge";
import checkIcon from '../static/img/check.svg';
import cancelIcon from '../static/img/cancel.svg';
import {ArgumentsContext} from "../App";

const ArgumentItem = ({id, name, image, flag, ytLink, counterargument}) => {
    const { title, full, extract } = counterargument;

    const [modalVisible, setModalVisible] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const { argumentsSelected, setArgumentsSelected } = useContext(ArgumentsContext);

    useEffect(() => {
        setIsSelected(argumentsSelected.includes(id));
    }, [argumentsSelected]);

    useEffect(() => {
        const counter = document.querySelector('.counter');

        if(counter) {
            if(modalVisible) {
                counter.style.visibility = 'hidden';
            }
            else {
                counter.style.visibility = 'visible';
            }
        }
    }, [modalVisible]);

    const openModal = () => {
        setModalVisible(true);
    }

    const selectArgument = () => {
        if(argumentsSelected.includes(id)) {
            setArgumentsSelected((prevState) => (prevState.filter((item) => (item !== id))));
        }
        else {
            setArgumentsSelected((prevState) => ([...prevState, id]));
        }
    }

    return <>
        {modalVisible ? <Modal closeModal={() => { setModalVisible(false); }}
                               name={name}
                               title={title}
                               image={image}
                               flag={flag}
                               full={full}
                               ytLink={ytLink} /> : ''}

        <button className={`arguments__item ${isSelected ? 'chooseList__item--selected' : 'shadow'}`}
                onClick={selectArgument}>
            {isSelected ? <img className={'chooseList__item__check'}
                               src={checkIcon}
                               alt={'check'} /> : ''}

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

            <div className={'flex'}>
                <button className={'btn btn--arguments'}
                        onClick={(e) => { e.stopPropagation(); openModal(); }}>
                    Czytaj więcej
                </button>

                <div className={'btn btn--selectArgument center'}>
                    <img className={isSelected ? 'icon icon--cancel' : 'icon'}
                         src={isSelected ? cancelIcon : checkIcon}
                         alt={'zaznacz'} />

                    {isSelected ? 'Usuń argument' : 'Użyj argumentu'}
                </div>
            </div>
        </button>
    </>
};

export default ArgumentItem;
