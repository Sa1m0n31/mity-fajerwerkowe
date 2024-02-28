import React, {useEffect, useState} from 'react';
import {getAllArguments} from "../helpers/api";
import ArgumentItem from "./ArgumentItem";
import iconLong from '../static/img/long.svg';
import iconShort from '../static/img/short.svg';
import ArgumentItemShort from "./ArgumentItemShort";

const ArgumentsList = () => {
    const [allArguments, setAllArguments] = useState([]);
    const [longView, setLongView] = useState(true);

    useEffect(() => {
        getAllArguments()
            .then((res) => {
                if(res) {
                   setAllArguments(res.data);
               }
            });
    }, []);

    const getRandomVariant = (variants) => {
        return variants[Math.floor(Math.random() * variants.length)];
    }

    return <div className={'section section--arguments w'}
                id={'lista-argumentow'}>
        <h3 className={'section__header'}>
            Wybierz manualnie argumenty, na które chcesz odpowiedzieć
        </h3>

        <div className={'section__choice center'}>
            <button className={longView ? 'btn btn--view btn--view--selected' : 'btn btn--view'}
                    onClick={() => { setLongView(true); }}>
                <img className={'img'} src={iconLong} alt={'long'} />
                Widok rozbudowany
            </button>

            <button className={longView ? 'btn btn--view' : 'btn btn--view btn--view--selected'}
                    onClick={() => { setLongView(false); }}>
                <img className={'img'} src={iconShort} alt={'short'} />
                Widok skrótowy
            </button>
        </div>

        <div className={'arguments'}>
            {allArguments.map((item) => {
                const { counterargument_variants, counterargument_yt_link,
                    miniature_img, name, flag, id } = item;
                const counterargument = getRandomVariant(counterargument_variants);

                return longView ? <ArgumentItem id={id}
                                                counterargument={counterargument}
                                                flag={flag}
                                                image={miniature_img}
                                                name={name}
                                                ytLink={counterargument_yt_link} /> : <ArgumentItemShort id={id}
                                                                                                         image={miniature_img}
                                                                                                         name={name} />
            })}
        </div>
    </div>
};

export default ArgumentsList;
