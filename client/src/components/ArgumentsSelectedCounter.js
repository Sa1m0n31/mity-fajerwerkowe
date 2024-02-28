import React, {useContext, useEffect, useRef, useState} from 'react';
import {ArgumentsContext} from "../App";

const ArgumentsSelectedCounter = () => {
    const [numberOfArguments, setNumberOfArguments] = useState(0);

    const counter = useRef(null);

    const { argumentsSelected } = useContext(ArgumentsContext);

    useEffect(() => {
        setNumberOfArguments(argumentsSelected?.length);
    }, [argumentsSelected]);

    useEffect(() => {
        if(counter) {
            if(numberOfArguments) {
                counter.current.style.zIndex = '100';
                counter.current.style.opacity = '1';
            }
            else {
                counter.current.style.opacity = '0';

                setTimeout(() => {
                    counter.current.style.zIndex = '-1000';
                }, 1000);
            }
        }
    }, [counter, numberOfArguments]);

    const generate = () => {
        localStorage.setItem('argumentsSelectedAndReady', JSON.stringify(argumentsSelected));
        window.location.href = '/wybierz-argumenty';
    }

    return <div className={'counter'} ref={counter}>
        <p className={'counter__text center'}>
            Liczba argumentów:
            <span>
                {numberOfArguments}
            </span>
        </p>

        <button className={'btn btn--counter'}
                onClick={generate}>
            Generuj
        </button>
    </div>
}

export default ArgumentsSelectedCounter;
