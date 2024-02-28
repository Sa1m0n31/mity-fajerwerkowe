import React, {useContext, useEffect, useState} from 'react';
import {ArgumentsContext} from "../App";
import checkIcon from '../static/img/check.svg';

const ArgumentItemShort = ({id, name, image}) => {
    const [isSelected, setIsSelected] = useState(false);

    const { argumentsSelected, setArgumentsSelected } = useContext(ArgumentsContext);

    useEffect(() => {
        setIsSelected(argumentsSelected.includes(id));
    }, [argumentsSelected]);

    const selectArgument = () => {
        if(argumentsSelected.includes(id)) {
            setArgumentsSelected((prevState) => (prevState.filter((item) => (item !== id))));
        }
        else {
            setArgumentsSelected((prevState) => ([...prevState, id]));
        }
    }

    return <button className={`flex chooseList__item ${isSelected ? 'chooseList__item--selected' : 'shadow'}`}
                   onClick={() => { selectArgument(); }}
                   key={id}>
        {argumentsSelected.includes(id) ? <img className={'chooseList__item__check'}
                                                  src={checkIcon}
                                                  alt={'check'} /> : ''}

        <figure className={'chooseList__item__image center'}>
            <img className={'img'} src={image} alt={name} />
        </figure>

        <h4 className={'arguments__item__title'}>
            {name}
        </h4>
    </button>
};

export default ArgumentItemShort;
